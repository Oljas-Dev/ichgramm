import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Like from "../models/Like.js";
import Follow from "../models/Follow.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:postId", authenticateJWT, async (req, res) => {
  const { postId } = req.params;
  const currentUserId = req.user.id;

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

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comments = await Comment.find({ postId }).populate({
      path: "commentBy",
      select: "username fullname avatar",
    });

    const likes = await Like.find({ postId });

    const isFollowing = await Follow.exists({
      follower: currentUserId,
      following: post.user._id,
    });

    const postWithComments = {
      ...post.toObject(),
      comments,
      likes,
      isFollowing: Boolean(isFollowing),
      isOwner: post.user._id.toString() === currentUserId.toString(),
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
