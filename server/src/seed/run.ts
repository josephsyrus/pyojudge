import "dotenv/config";
import mongoose from "mongoose";
import Problem from "../models/Problem";
import { seedProblems } from "./problems";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set");

  await mongoose.connect(uri);
  console.log("connected to mongodb");

  await Problem.deleteMany({});
  console.log("cleared all existing problems");

  await Problem.insertMany(seedProblems);
  console.log(`Seeded ${seedProblems.length} problems`);

  await mongoose.disconnect();
  console.log("done..disconnected from mongodb");
}

seed().catch((err) => {
  console.error("Seed failed", err);
  process.exit(1);
});
