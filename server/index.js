import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDatabase } from "./db/config.js";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import allPostsRouter from "./routes/allPosts.js";
import postById from "./routes/postById.js";
import profilePage from "./routes/profilePage.js";
import comment from "./routes/comment.js";
import updateUser from "./routes/updateUser.js";

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

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/posts", postRouter);
app.use("/posts", allPostsRouter);
app.use("/posts", postById);
app.use("/profilePage", profilePage);
app.use("/comment", comment);
app.use("/update-user", updateUser);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
