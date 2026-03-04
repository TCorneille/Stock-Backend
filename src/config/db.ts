import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
  if (!env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  await mongoose.connect(env.MONGO_URI);
  console.log("MongoDB connected successfully");
};