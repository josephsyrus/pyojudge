import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Submission from "../models/Submission";
import Problem from "../models/Problem";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// Search users by username
router.get("/search", async (req: Request, res: Response): Promise<void> => {
  const q = String(req.query.q ?? "").trim();
  if (!q || q.length < 2) {
    res.json([]);
    return;
  }
  try {
    const users = await User.find(
      { username: { $regex: q, $options: "i" } },
      "username createdAt",
    ).limit(10);
    res.json(users.map((u) => ({ username: u.username, joinedAt: u.createdAt })));
  } catch {
    res.status(500).json({ message: "Search failed" });
  }
});

// Get current user's starred problem slugs
router.get("/me/starred", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!.userId, "starredProblems");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ starredProblems: user.starredProblems });
  } catch {
    res.status(500).json({ message: "Failed to fetch starred" });
  }
});

// Get current user's friends list
router.get("/me/friends", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!.userId, "friends");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const friends = await User.find({ username: { $in: user.friends } }, "username createdAt");
    res.json(friends.map((f) => ({ username: f.username, joinedAt: f.createdAt })));
  } catch {
    res.status(500).json({ message: "Failed to fetch friends" });
  }
});

// Toggle star on a problem
router.post("/star/:slug", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const { slug } = req.params as { slug: string };
    const idx = user.starredProblems.indexOf(slug);
    if (idx === -1) {
      user.starredProblems.push(slug);
    } else {
      user.starredProblems.splice(idx, 1);
    }
    await user.save();
    res.json({ starred: idx === -1, starredProblems: user.starredProblems });
  } catch {
    res.status(500).json({ message: "Failed to toggle star" });
  }
});

// Toggle friend
router.post(
  "/friends/:username",
  requireAuth,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const me = await User.findById(req.user!.userId);
      if (!me) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const { username } = req.params as { username: string };
      if (username === me.username) {
        res.status(400).json({ message: "Cannot friend yourself" });
        return;
      }
      const target = await User.findOne({ username }, "_id username");
      if (!target) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const idx = me.friends.indexOf(username);
      if (idx === -1) {
        me.friends.push(username);
      } else {
        me.friends.splice(idx, 1);
      }
      await me.save();
      res.json({ isFriend: idx === -1, friends: me.friends });
    } catch {
      res.status(500).json({ message: "Failed to toggle friend" });
    }
  },
);

// Public profile by username — must be last
router.get("/:username", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params as { username: string };
    const user = await User.findOne({ username }, "username createdAt");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userId = user._id as mongoose.Types.ObjectId;
    type Pop = {
      _id: mongoose.Types.ObjectId;
      title: string;
      slug: string;
      difficulty: "Easy" | "Medium" | "Hard";
    };

    const allAccepted = await Submission.find({ userId, verdict: "Accepted" })
      .populate<{ problemId: Pop }>("problemId", "title slug difficulty")
      .sort({ submittedAt: -1 });

    const uniqueSolved = new Map<
      string,
      { title: string; slug: string; difficulty: string; solvedAt: Date }
    >();
    for (const sub of allAccepted) {
      const p = sub.problemId as Pop | null;
      if (!p) continue;
      const id = p._id.toString();
      if (!uniqueSolved.has(id))
        uniqueSolved.set(id, {
          title: p.title,
          slug: p.slug,
          difficulty: p.difficulty,
          solvedAt: sub.submittedAt,
        });
    }

    const bySolvedDifficulty: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
    for (const p of uniqueSolved.values())
      bySolvedDifficulty[p.difficulty] = (bySolvedDifficulty[p.difficulty] ?? 0) + 1;

    const [easyTotal, mediumTotal, hardTotal] = await Promise.all([
      Problem.countDocuments({ difficulty: "Easy" }),
      Problem.countDocuments({ difficulty: "Medium" }),
      Problem.countDocuments({ difficulty: "Hard" }),
    ]);

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 365);
    const recentSubs = await Submission.find({ userId, submittedAt: { $gte: cutoff } }).select(
      "submittedAt",
    );
    const activityByDate: Record<string, number> = {};
    for (const sub of recentSubs) {
      const date = sub.submittedAt.toISOString().split("T")[0];
      activityByDate[date] = (activityByDate[date] ?? 0) + 1;
    }

    res.json({
      username: user.username,
      joinedAt: user.createdAt,
      totalSolved: uniqueSolved.size,
      bySolvedDifficulty,
      totalByDifficulty: { Easy: easyTotal, Medium: mediumTotal, Hard: hardTotal },
      recentlySolved: Array.from(uniqueSolved.values()).slice(0, 5),
      activityByDate,
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

export default router;
