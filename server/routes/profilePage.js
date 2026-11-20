import express from "express";
import Post from "./../models/Post.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({
        message: "Did not find user",
      });
    }
    const myPosts = await Post.find({ user: userId });

    return res.status(200).json({
      message: "All post are there",
      myPosts,
    });
  } catch (err) {
    console.error("Could not find user's posts: ", err);
  }
});

export default router;
