import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import { connectToDatabase } from "./db/config.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3333;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.use("/auth", authRouter);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
