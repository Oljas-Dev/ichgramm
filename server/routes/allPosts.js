import express from "express";
import authenticateJWT from "./../middleware/authMiddleware.js";
import Post from "./../models/Post.js";
import Follow from "../models/Follow.js";

const router = express.Router();

router.get("/all", authenticateJWT, async (req, res) => {
  const currentUserId = req.user.id.toString();

  try {
    const allPosts = await Post.aggregate([{ $sample: { size: 1000 } }]);

    await Post.populate(allPosts, [
      {
        path: "user",
        select: "username fullname createdAt avatar",
      },
      {
        path: "likes",
        select: "postId likedBy",
      },
    ]);

    // Get all post authors
    const authorIds = allPosts.map((post) => post.user?._id).filter(Boolean);

    // Find wich authors the current user fllows
    const follows = await Follow.find({
      follower: currentUserId,
      following: { $in: authorIds },
    });

    // A Set for faster search
    const followedUserIds = new Set(
      follows.map((follow) => follow.following.toString()),
    );

    const postWithOwnership = allPosts.map((post) => ({
      ...post,
      isOwner: post.user?._id.toString() === currentUserId,
      isFollowing: followedUserIds.has(post.user?._id.toString()),
    }));

    return res.status(200).json(postWithOwnership);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
});

export default router;
