import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

router.post("/:userId", async (req, res) => {
  const { comment, postId } = req.body;

  try {
    const commentBy = req.params.userId;

    if (!commentBy) {
      return res.status(400).json({
        message: "To leave a comment user id is required",
      });
    }

    if (!comment || !postId) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    // Create comment
    const createComment = await Comment.create({
      comment,
      postId,
      commentBy,
    });

    return res.status(200).json({
      message: "Comment is saved",
      createComment,
    });
  } catch (err) {
    console.error("Error craeting comment:", err);
    return res.status(500).json({
      message: "Failed to create post",
    });
  }
});

export default router;
