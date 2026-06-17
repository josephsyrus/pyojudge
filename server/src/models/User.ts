import { Schema, model } from "mongoose";

const RefreshTokenSchema = new Schema(
  {
    hash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { _id: false },
);

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
      type: [RefreshTokenSchema],
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

interface IUser {
  username: string;
  email: string;
  password?: string;
  githubId?: string;
  googleId?: string;
  refreshTokens: { hash: string; expiresAt: Date }[];
  role: "user" | "admin";
  starredProblems: string[];
  friends: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default model<IUser>("User", UserSchema);
