import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDatabase } from "./db/config.js";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import allPostsRouter from "./routes/allPosts.js";
import postById from "./routes/postById.js";
import deletePost from "./routes/deletePost.js";
import profilePage from "./routes/profilePage.js";
import comment from "./routes/comment.js";
import updateUser from "./routes/updateUser.js";
import likePost from "./routes/likePost.js";
import searchUsers from "./routes/search.js";
import followUser from "./routes/follow.js";
import mediaRouter from "./routes/media.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ichgramm.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.use("/uploads", express.static("uploads"));
app.use("/avatars", express.static("public/avatars"));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/users", searchUsers);
app.use("/posts", postRouter);
app.use("/posts", allPostsRouter);
app.use("/posts", postById);
app.use("/posts", deletePost);
app.use("/profilePage", profilePage);
app.use("/comment", comment);
app.use("/update-user", updateUser);
app.use("/like", likePost);
app.use("/dislike", likePost);
app.use("/follow", followUser);
app.use("/unfollow", followUser);
app.use("/followers", followUser);
app.use("/media", mediaRouter);

connectToDatabase()
  .then(() => {
    console.log("Database connection established");

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((error) => {
    console.error("Application startup failed:", error);
    process.exit(1);
  });
