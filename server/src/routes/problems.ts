import { Router, Request, Response } from "express";
import Problem from "../models/Problem";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, difficulty, tags, slugs } = req.query;
    const pageNum = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limitNum = Math.min(parseInt(req.query.limit as string) || 20, 100);

    const filter: Record<string, unknown> = {};

    if (search) filter.title = { $regex: search, $options: "i" }; //match substring, case insensitive
    if (difficulty) filter.difficulty = difficulty;
    if (tags)
      filter.tags = { $in: (tags as string).split(",").filter(Boolean) };
    if (slugs)
      filter.slug = { $in: (slugs as string).split(",").filter(Boolean) };

    const [problems, total] = await Promise.all([
      Problem.find(filter, "slug title difficulty tags") // only pull required fields from db
        .sort({ _id: 1 }) //sorting and pagination calculation
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Problem.countDocuments(filter),
    ]);

    res.json({
      problems,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch problems" });
  }
});

router.get("/tags", async (_req: Request, res: Response): Promise<void> => {
  try {
    const tags: string[] = await Problem.distinct("tags");
    res.json(tags.sort());
  } catch {
    res.status(500).json({ message: "Failed to fetch problem" });
  }
});

router.get("/:slug", async (req: Request, res: Response): Promise<void> => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug });
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }

    //filter out hidden testcases from response
    const obj = problem.toObject(); //convert from mongodb document to js object
    obj.testCases = obj.testCases.map((tc) =>
      tc.isHidden === true ? { input: tc.input, isHidden: true } : tc,
    ) as typeof obj.testCases;
    res.json(obj);
  } catch {
    res.status(500).json({ message: "Failed to fetch problems" });
  }
});

export default router;
