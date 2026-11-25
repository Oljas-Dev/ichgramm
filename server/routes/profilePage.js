import express from "express";
import Post from "./../models/Post.js";
import User from "../models/User.js";
import Follow from "../models/Follow.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({
        message: "Did not find user",
      });
    }
    const myPosts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    const profileData = await User.find({ _id: userId }).select(
      "-password -email",
    );
    const followers = await Follow.find({ following: userId }).select(
      "following",
    );
    const followed = await Follow.find({ follower: userId }).select("follower");

    const accumulatedData = {
      profilePosts: myPosts,
      profileData: profileData[0],
      followers,
      followed,
    };

    return res.status(200).json({
      message: "All post are there",
      accumulatedData,
    });
  } catch (err) {
    console.error("Could not find user's posts: ", err);
  }
});

export default router;
