import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  console.log(postId);

  try {
    if (!postId) {
      return res.status(404).json({
        message: "Wrong post id",
      });
    }

    const post = await Post.findById(postId);

    await Post.populate(post, {
      path: "user",
      select: "username avatar fullname",
    });

    return res.status(200).json({
      message: "Post successfully found",
      post,
    });
  } catch (err) {
    console.error("Did not find your post:", err);

    return res.status(500).json({
      message: "Failed to fetch post",
    });
  }
});

export default router;
