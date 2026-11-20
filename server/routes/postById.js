import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const router = express.Router();

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    if (!postId) {
      return res.status(404).json({
        message: "Wrong post id",
      });
    }

    const post = await Post.findById(postId).populate(
      "user",
      "username avatar fullname",
    );

    const comments = await Comment.find({ postId })
      .populate({
        path: "commentBy",
        select: "username fullname avatar",
      })
      .sort({ createdAt: -1 });

    const postWithComments = {
      ...post.toObject(),
      comments,
    };

    return res.status(200).json({
      message: "Post successfully found",
      post: postWithComments,
    });
  } catch (err) {
    console.error("Did not find your post:", err);

    return res.status(500).json({
      message: "Failed to fetch post",
    });
  }
});

export default router;
