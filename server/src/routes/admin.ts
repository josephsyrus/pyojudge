import { Router, Response } from "express";
import Problem from "../models/Problem";
import { requireAdmin, AuthRequest } from "../middleware/auth";

const router = Router();

// All admin routes require admin role
router.use(requireAdmin);

// List all problems (full detail)
router.get("/problems", async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const problems = await Problem.find().sort({ difficulty: 1, title: 1 });
    res.json(problems);
  } catch {
    res.status(500).json({ message: "Failed to fetch problems" });
  }
});

// Create problem
router.post("/problems", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(409).json({ message: "A problem with that slug already exists" });
    } else {
      res.status(400).json({ message: err.message ?? "Failed to create problem" });
    }
  }
});

// Update problem
router.put("/problems/:slug", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const problem = await Problem.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }
    res.json(problem);
  } catch (err: any) {
    res.status(400).json({ message: err.message ?? "Failed to update problem" });
  }
});

// Delete problem
router.delete("/problems/:slug", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const problem = await Problem.findOneAndDelete({ slug: req.params.slug });
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }
    res.json({ message: "Problem deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete problem" });
  }
});

export default router;
