import express from "express";
import connectDB from "./config/db";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

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
