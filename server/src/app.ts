import express from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { securityHeaders } from "./middleware/security";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db";
import problemRoutes from "./routes/problems";
import authRoutes from "./routes/auth";
import submissionRoutes from "./routes/submissions";
import userRoutes from "./routes/users";
import leaderboardRoutes from "./routes/leaderboard";
import adminRoutes from "./routes/admin";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" })); //payloads limited to 1mb
app.use(cookieParser());
app.use(securityHeaders);

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
app.use(["/api/auth/login", "/api/auth/register"], authLimiter);

const submissionLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 30 });
app.use("/api/submissions", submissionLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/admin", adminRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use((_req, res) => res.status(404).json({ message: "Not found" })); //all other routes

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("failed to connect to mongodb: ", err);
    process.exit(1);
  });
