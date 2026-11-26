import mongoose from "mongoose";

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  console.log("Attempting MongoDB connection...");

  if (!uri) {
    throw new Error("MONGODB_URI is missing!");
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:");
    console.error(error);
    console.error(error.stack);

    throw error;
  }
}

// import mongoose from "mongoose";
// import "dotenv/config";

// export async function connectToDatabase() {
//   const uri = process.env.MONGODB_URI;
//   try {
//     if (!uri) {
//       throw new Error("MONGODB_URI is missing!");
//     }
//     await mongoose.connect(uri);

//     console.log("Successfully connected to MongoDB");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//     throw error;
//   }
// }
