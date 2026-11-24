import express from "express";
import mongoose from "mongoose";
import authenticateJWT from "../middleware/authMiddleware.js";
import Post from "../models/Post.js";
import Like from "../models/Like.js";
import Comment from "../models/Comment.js";
import { deleteUploadedFile } from "../helpers/deleteUploadedFile.js";

const router = express.Router();

router.delete("/:postId", authenticateJWT, async (req, res) => {
  const { postId } = req.params;
  const session = await mongoose.startSession();

  let deletedPost;

  try {
    await session.withTransaction(async () => {
      // 1. Delete the post (only if owned by current user)
      deletedPost = await Post.findOneAndDelete({
        _id: postId,
        user: req.user.id,
      }).session(session);

      if (!deletedPost) {
        throw new Error("POST_NOT_FOUND");
      }

      // 2. Delete comments
      await Comment.deleteMany({ postId }).session(session);

      // 3. Delete likes
      await Like.deleteMany({ postId }).session(session);
    });

    // 4. Delete uploaded image AFTER transaction commits
    try {
      await deleteUploadedFile(deletedPost.image);
    } catch (fileError) {
      console.error("Could not delete uploaded image:", fileError);
    }

    return res.status(200).json({
      message:
        "Post, comments, likes and uploaded image processed successfully",
      response: deletedPost,
    });
  } catch (err) {
    if (err.message === "POST_NOT_FOUND") {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    console.error("Cascade delete failed:", err);

    return res.status(500).json({
      message: "Could not delete post",
    });
  } finally {
    await session.endSession();
  }
});

export default router;
