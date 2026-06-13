import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", async (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
