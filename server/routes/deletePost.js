import express from "express";
import authenticateJWT from "../middleware/authMiddleware.js";
import Post from "../models/Post.js";

const router = express.Router();

router.delete("/:postId", authenticateJWT, async (req, res) => {
  const { postId } = req.params;

  try {
    const response = await Post.findOneAndDelete({
      _id: postId,
      user: req.user.id,
    });

    if (!response) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post successfully deleted",
      response,
    });
  } catch (err) {
    res.status(400).json({
      message: "Could not delete this post",
    });
  }
});

export default router;
