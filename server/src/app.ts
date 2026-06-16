import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

import connectDB from "./config/db";
import problemRoutes from "./routes/problems";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);

app.get("/health", async (req, res) => {
  res.json({ status: "OK" });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("failed to connect to mongodb: ", err);
  });
