import express from "express";
import Follow from "./../models/Follow.js";

const router = express.Router();

router.post("/userId", async (req, res) => {
  try {
    const followerId = req.user.id; // Authenticated user
    const followingId = req.params.userId; // User to follow

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
