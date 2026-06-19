import { Router, Response } from "express";
import { AuthRequest, requireAuth } from "../middleware/auth";
import { Verdict, ITestResult } from "../models/Submission";
import Problem from "../models/Problem";
import { outputsMatch } from "../utils/normalize";
import mongoose from "mongoose";
import Submission from "../models/Submission";

const router = Router();

//on clicking submit
router.post("/", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const { problemSlug, code, testResults, timedOut } = req.body;

  if (!problemSlug || !code || !Array.isArray(testResults)) {
    res.status(400).json({ message: "Missing required submission fields" });
    return;
  }

  try {
    const problem = await Problem.findOne({ slug: problemSlug });
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }

    const clientByInput = new Map<
      string,
      { actualOutput: string; executionTime: number; errorMessage?: string }
    >();
    for (const tr of testResults) {
      if (tr && typeof tr.input === "string") {
        clientByInput.set(tr.input, {
          actualOutput: typeof tr.actualOutput === "string" ? tr.actualOutput : "",
          executionTime: typeof tr.executionTime === "number" ? tr.executionTime : 0,
          errorMessage: typeof tr.errorMessage === "string" ? tr.errorMessage : undefined,
        });
      }
    }

    const isTLE = timedOut === true;

    const verifiedResults: ITestResult[] = problem.testCases.map((tc) => {
      const client = clientByInput.get(tc.input);
      const actualOutput = client?.actualOutput ?? "";
      const passed =
        !isTLE && client !== undefined && outputsMatch(tc.expectedOutput, actualOutput);
      return {
        passed,
        input: tc.input,
        expectedOutput: tc.isHidden ? "" : tc.expectedOutput,
        actualOutput,
        executionTime: client?.executionTime ?? 0,
        errorMessage: client?.errorMessage,
        isHidden: tc.isHidden,
      };
    });

    const totalTests = verifiedResults.length;
    const passedTests = verifiedResults.filter((r) => r.passed).length;
    const hasRuntimeError = verifiedResults.some((r) => r.errorMessage && !r.passed);

    const verdict: Verdict = isTLE
      ? "Time Limit Exceeded"
      : totalTests > 0 && passedTests === totalTests
        ? "Accepted"
        : hasRuntimeError
          ? "Runtime Error"
          : "Wrong Answer";

    const maxExecutionTime = Math.max(0, ...verifiedResults.map((r) => r.executionTime));

    const submission = await Submission.create({
      userId: new mongoose.Types.ObjectId(req.user!.userId),
      problemId: problem._id,
      code,
      language: "python",
      verdict,
      testResults: verifiedResults,
      totalTests,
      passedTests,
      maxExecutionTime,
    });

    res.status(201).json(submission);
  } catch (err) {
    console.error("Failed to save submission:", err);
    res.status(500).json({ message: "Failed to save submission" });
  }
});

//getting submission history for a problem
router.get(
  "/problem/:slug",
  requireAuth,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const problem = await Problem.findOne({ slug: req.params.slug });
      if (!problem) {
        res.status(404).json({ message: "Problem not found" });
        return;
      }

      //pagination
      const limit = Math.min(parseInt(req.query.limit as string) || 15, 50);
      const page = Math.max(parseInt(req.query.page as string) || 1, 1);

      //filter by userid and problemid
      const filter = {
        userId: new mongoose.Types.ObjectId(req.user!.userId),
        problemId: problem._id,
      };

      const [submissions, total] = await Promise.all([
        Submission.find(filter)
          .sort({ submittedAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .select("-testResults"), //exclude testResults (degrades performance)
        Submission.countDocuments(filter),
      ]);

      res.json({ submissions, total, page, totalPages: Math.ceil(total / limit) });
    } catch {
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  },
);

//get user streak
router.get("/me/streak", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.userId);

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 366); //1 year window
    const subs = await Submission.find({ userId, submittedAt: { $gte: cutoff } })
      .select("submittedAt")
      .sort({ submittedAt: -1 });
    const dates = new Set(subs.map((s) => s.submittedAt.toISOString().split("T")[0])); //unique days

    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 366; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i); //counting backwards from today
      const key = d.toISOString().split("T")[0];
      if (dates.has(key)) {
        //check in set
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    res.json({ streak });
  } catch {
    res.status(500).json({ message: "Failed to compute streak" });
  }
});

//get user dashboard stats
router.get("/me/stats", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.userId);

    type PopulatedProblem = {
      _id: mongoose.Types.ObjectId;
      title: string;
      slug: string;
      difficulty: "Easy" | "Medium" | "Hard";
    };

    const allAccepted = await Submission.find({ userId, verdict: "Accepted" })
      .populate<{ problemId: PopulatedProblem }>("problemId", "title slug difficulty")
      .sort({ submittedAt: -1 });

    // Unique solved problems - in sorted order
    const uniqueSolved = new Map<
      string,
      { title: string; slug: string; difficulty: string; solvedAt: Date } //k-v: problemid - object
    >();
    for (const sub of allAccepted) {
      const problem = sub.problemId as PopulatedProblem | null;
      if (!problem) continue;
      const id = problem._id.toString();
      if (!uniqueSolved.has(id)) {
        uniqueSolved.set(id, {
          title: problem.title,
          slug: problem.slug,
          difficulty: problem.difficulty,
          solvedAt: sub.submittedAt,
        });
      }
    }

    const bySolvedDifficulty: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
    //iterate over map values, append count by 1
    for (const p of uniqueSolved.values()) {
      bySolvedDifficulty[p.difficulty] = (bySolvedDifficulty[p.difficulty] ?? 0) + 1;
    }

    //total questions difficulty from db
    const [easyTotal, mediumTotal, hardTotal] = await Promise.all([
      Problem.countDocuments({ difficulty: "Easy" }),
      Problem.countDocuments({ difficulty: "Medium" }),
      Problem.countDocuments({ difficulty: "Hard" }),
    ]);

    // 5 most recently solved unique problems
    const recentlySolved = Array.from(uniqueSolved.values()).slice(0, 5);

    // Activity heatmap
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 112);
    const recentSubs = await Submission.find({ userId, submittedAt: { $gte: cutoff } }).select(
      "submittedAt",
    );
    const activityByDate: Record<string, number> = {};
    for (const sub of recentSubs) {
      const date = sub.submittedAt.toISOString().split("T")[0];
      activityByDate[date] = (activityByDate[date] ?? 0) + 1;
    }

    res.json({
      totalSolved: uniqueSolved.size,
      bySolvedDifficulty,
      totalByDifficulty: { Easy: easyTotal, Medium: mediumTotal, Hard: hardTotal },
      recentlySolved,
      activityByDate,
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

//get submission by its id
router.get("/:id", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params as { id: string };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid submission ID" });
    return;
  }

  try {
    const submission = await Submission.findOne({
      _id: id,
      userId: new mongoose.Types.ObjectId(req.user!.userId),
    });

    if (!submission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }

    res.json(submission);
  } catch {
    res.status(500).json({ message: "Failed to fetch submission" });
  }
});

export default router;
