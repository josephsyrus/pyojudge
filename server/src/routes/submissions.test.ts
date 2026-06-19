import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// Must be set before any token is signed (tokenService reads it at call time).
process.env.JWT_ACCESS_SECRET = "test-access-secret";

import submissionRoutes from "./submissions";
import Problem from "../models/Problem";
import { signAccessToken } from "../services/tokenService";

// Minimal app that mounts only the route under test with the JSON parser.
const app = express();
app.use(express.json());
app.use("/api/submissions", submissionRoutes);

const SLUG = "test-sum";
let mongo: MongoMemoryServer;
let token: string;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());

  // 1 visible + 2 hidden test cases. The hidden expected outputs (10, 5) are the secret the client never receives
  await Problem.create({
    slug: SLUG,
    title: "Test Sum",
    difficulty: "Easy",
    description: "add two numbers",
    examples: [{ input: "1 2", output: "3" }],
    constraints: ["small"],
    starterCode: "def solution():\n    pass",
    functionName: "solution",
    tags: [],
    testCases: [
      { input: "1 2", expectedOutput: "3", isHidden: false }, // visible
      { input: "5 5", expectedOutput: "10", isHidden: true }, // hidden
      { input: "2 3", expectedOutput: "5", isHidden: true }, // hidden
    ],
  });

  token = signAccessToken({
    userId: new mongoose.Types.ObjectId().toString(),
    username: "tester",
    email: "tester@example.com",
    role: "user",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

function submit(body: unknown) {
  return request(app)
    .post("/api/submissions")
    .set("Authorization", `Bearer ${token}`)
    .send(body as object);
}

describe("POST /api/submissions — verdict integrity", () => {
  it("rejects a forged all-pass payload (relabeled hidden + wrong outputs)", async () => {
    // Attacker marks everything passed, relabels hidden tests as visible, and sends fabricated outputs for the hidden inputs
    const res = await submit({
      problemSlug: SLUG,
      code: "print('hacked')",
      timedOut: false,
      testResults: [
        { input: "1 2", actualOutput: "3", passed: true, isHidden: false },
        { input: "5 5", actualOutput: "999", passed: true, isHidden: false },
        { input: "2 3", actualOutput: "999", passed: true, isHidden: false },
      ],
    });

    expect(res.status).toBe(201);
    expect(res.body.verdict).toBe("Wrong Answer");
    expect(res.body.passedTests).toBe(1);
    expect(res.body.totalTests).toBe(3);
  });

  it("cannot shrink the denominator by omitting hidden tests", async () => {
    // Send ONLY the visible test, all passing.
    const res = await submit({
      problemSlug: SLUG,
      code: "x",
      timedOut: false,
      testResults: [{ input: "1 2", actualOutput: "3", passed: true }],
    });

    expect(res.body.verdict).toBe("Wrong Answer");
    expect(res.body.totalTests).toBe(3);
    expect(res.body.passedTests).toBe(1);
  });

  it("accepts a genuinely correct submission and never leaks hidden answers", async () => {
    const res = await submit({
      problemSlug: SLUG,
      code: "real solution",
      timedOut: false,
      testResults: [
        { input: "1 2", actualOutput: "3" },
        { input: "5 5", actualOutput: "10" },
        { input: "2 3", actualOutput: "5" },
      ],
    });

    expect(res.body.verdict).toBe("Accepted");
    expect(res.body.passedTests).toBe(3);
    expect(res.body.totalTests).toBe(3);

    // Stored/returned hidden results must not expose the expected output.
    const hidden = res.body.testResults.filter((r: { isHidden: boolean }) => r.isHidden);
    expect(hidden).toHaveLength(2);
    for (const r of hidden) expect(r.expectedOutput).toBe("");
  });

  it("rejects unauthenticated requests", async () => {
    const res = await request(app)
      .post("/api/submissions")
      .send({ problemSlug: SLUG, code: "x", testResults: [] });
    expect(res.status).toBe(401);
  });
});
