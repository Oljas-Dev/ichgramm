import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  try {
    if (!uri) {
      throw new Error("MONGODB_URI is missing!");
    }
    await mongoose.connect(uri);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
