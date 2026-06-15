import { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
      match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    refreshTokens: {
      type: [String], //multiple devices
      default: [],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    starredProblems: {
      type: [String],
      default: [],
    },
    friends: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

type IUser = InferSchemaType<typeof UserSchema>;

export default model<IUser>("User", UserSchema);
