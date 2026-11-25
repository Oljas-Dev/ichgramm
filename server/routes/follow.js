import express from "express";
import Follow from "./../models/Follow.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:userId", authenticateJWT, async (req, res) => {
  try {
    const followerId = req.user.id; // Authenticated user
    const followingId = req.params.userId; // User to follow

    if (!followerId || !followingId) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const follow = await Follow.find({
      follower: followerId,
    });

    return res.status(201).json({
      message: "Successfully found followers",
      follow,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not find followers",
    });
  }
});

router.post("/:userId", authenticateJWT, async (req, res) => {
  try {
    const followerId = req.user.id; // Authenticated user
    const followingId = req.params.userId; // User to follow

    if (!followerId || !followingId) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const follow = await Follow.create({
      follower: followerId,
      following: followingId,
    });

    return res.status(201).json({
      message: "Successfully followed user",
      follow,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not follow user",
    });
  }
});

router.delete("/:userId", authenticateJWT, async (req, res) => {
  try {
    const followerId = req.user.id; // Authenticated user
    const followingId = req.params.userId; // User to unfollow

    if (!followerId || !followingId) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot unfollow/follow yourself",
      });
    }

    const unfollow = await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    return res.status(201).json({
      message: "Successfully unfollowed user",
      unfollow,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to unfollow user",
    });
  }
});

export default router;
