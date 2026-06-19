export type Difficulty = "Easy" | "Medium" | "Hard";
export type Verdict = "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error";
export type RuntimeStatus = "idle" | "loading" | "ready" | "error" | "reinitializing";

export interface ProblemSummary {
  _id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  isStarred?: boolean;
}

export interface PublicUserProfile {
  username: string;
  joinedAt: string;
  totalSolved: number;
  bySolvedDifficulty: Record<Difficulty, number>;
  totalByDifficulty: Record<Difficulty, number>;
  recentlySolved: RecentlySolvedProblem[];
  activityByDate: Record<string, number>;
}

export interface UserSearchResult {
  username: string;
  joinedAt: string;
}

export interface FriendInfo {
  username: string;
  joinedAt: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expectedOutput?: string; // hidden for hidden test cases
  isHidden: boolean;
}

export interface Problem {
  _id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  examples: Example[];
  constraints: string[];
  testCases: TestCase[];
  starterCode: string;
  functionName: string;
  tags: string[];
}

export interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput?: string; // absent for hidden test cases
  actualOutput: string;
  executionTime: number;
  errorMessage?: string;
  isHidden?: boolean;
}

export interface SubmissionSummary {
  _id: string;
  verdict: Verdict;
  passedTests: number;
  totalTests: number;
  maxExecutionTime: number;
  submittedAt: string;
}

export interface Submission extends SubmissionSummary {
  code: string;
  testResults: TestResult[];
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export interface LeaderboardEntry {
  username: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
}

export interface RecentlySolvedProblem {
  title: string;
  slug: string;
  difficulty: Difficulty;
  solvedAt: string;
}

export interface UserStats {
  totalSolved: number;
  bySolvedDifficulty: Record<Difficulty, number>;
  totalByDifficulty: Record<Difficulty, number>;
  recentlySolved: RecentlySolvedProblem[];
  activityByDate: Record<string, number>;
}

//worker messages
export interface WorkerRunMessage {
  type: "RUN";
  code: string;
  testCases: TestCase[];
}

export interface WorkerResultMessage {
  type: "RESULT";
  results: TestResult[];
}

export interface WorkerStatusMessage {
  type: "STATUS";
  status: "ready" | "error";
  error?: string;
}

export type WorkerInMessage = WorkerRunMessage;
export type WorkerOutMessage = WorkerResultMessage | WorkerStatusMessage;
