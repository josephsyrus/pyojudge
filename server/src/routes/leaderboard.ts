import { Router, Request, Response } from "express";
import Submission from "../models/Submission";

const router = Router();

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const entries = await (Submission as any).aggregate([
      { $match: { verdict: "Accepted" } },
      // Deduplicate: one entry per unique (user, problem) pair
      { $group: { _id: { userId: "$userId", problemId: "$problemId" } } },
      // Promote nested fields so $lookup can reference them directly
      { $addFields: { userId: "$_id.userId", problemId: "$_id.problemId" } },
      // Join problem to get difficulty
      {
        $lookup: { from: "problems", localField: "problemId", foreignField: "_id", as: "problem" },
      },
      { $unwind: "$problem" },
      // Aggregate per user
      {
        $group: {
          _id: "$userId",
          totalSolved: { $sum: 1 },
          easy: { $sum: { $cond: [{ $eq: ["$problem.difficulty", "Easy"] }, 1, 0] } },
          medium: { $sum: { $cond: [{ $eq: ["$problem.difficulty", "Medium"] }, 1, 0] } },
          hard: { $sum: { $cond: [{ $eq: ["$problem.difficulty", "Hard"] }, 1, 0] } },
        },
      },
      { $sort: { totalSolved: -1, hard: -1, medium: -1 } },
      { $limit: 100 },
      // Join username
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          username: "$user.username",
          totalSolved: 1,
          easy: 1,
          medium: 1,
          hard: 1,
        },
      },
    ]);

    res.json(entries);
  } catch (err) {
    console.error("Leaderboard aggregation error:", err);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
});

export default router;
