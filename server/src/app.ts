import express from "express";
import connectDB from "./config/db";
import "dotenv/config";

import problemRoutes from "./routes/problems";

const app = express();
const PORT = process.env.PORT || 3000;

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
