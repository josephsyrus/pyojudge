import { InferSchemaType, Schema, model } from "mongoose";

export type Verdict = "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error";

export interface ITestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTime: number;
  errorMessage?: string;
  isHidden?: boolean;
}

const TestResultSchema = new Schema<ITestResult>(
  {
    passed: {
      type: Boolean,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    expectedOutput: {
      type: String,
      required: true,
    },
    actualOutput: {
      type: String,
      required: true,
    },
    executionTime: {
      type: Number,
      required: true,
    },
    errorMessage: {
      type: String,
    },
    isHidden: {
      type: Boolean,
    },
  },
  {
    _id: false, //this would be subdocuments
  },
);

const SubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ["python"],
    default: "python",
  },
  verdict: {
    type: String,
    required: true,
    enum: ["Accepted", "Wrong Answer", "Time Limit Exceeded", "Runtime Error"],
  },
  testResults: {
    type: [TestResultSchema], //multiple test case results
    required: true,
  },
  totalTests: {
    type: Number,
    required: true,
  },
  passedTests: {
    type: Number,
    required: true,
  },
  maxExecutionTime: {
    type: Number,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});
SubmissionSchema.index({ userId: 1, problemId: 1, submittedAt: -1 }); //for quick lookup : 1=asc, -1=desc (latest submissions per user per problem)

type ISubmission = InferSchemaType<typeof SubmissionSchema>;
export default model<ISubmission>("Submission", SubmissionSchema);
