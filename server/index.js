import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3333;
const dbURI = process.env.MONGO_URI || "uri";

// Connection to mongoDB
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// connectToDatabase()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error(
//       "Failed to start the server due to mongoDB connection issue",
//       err,
//     );
//   });
