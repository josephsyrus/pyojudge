import { model, Schema, InferSchemaType } from "mongoose";

const ExampleSchema = new Schema(
  {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
    },
  },
  { _id: false }, //dont need id for subdocuments
);

const TestCaseSchema = new Schema(
  {
    input: {
      type: String,
      required: true,
    },
    expectedOutput: {
      type: String,
      required: true,
    },
    isHidden: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const ProblemSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  examples: {
    type: [ExampleSchema],
    required: true,
  },
  constraints: {
    type: [String],
    required: true,
  },
  testCases: {
    type: [TestCaseSchema],
    required: true,
  },
  starterCode: {
    type: String,
    required: true,
  },
  functionName: {
    type: String,
    required: true,
    default: "solution",
  },
  tags: {
    type: [String],
    default: [],
  },
});

type IProblem = InferSchemaType<typeof ProblemSchema>;

export default model<IProblem>("Problem", ProblemSchema);
