import express from "express";
import authenticateJWT from "./../middleware/authMiddleware.js";
import Post from "./../models/Post.js";

const router = express.Router();

router.get("/all", authenticateJWT, async (req, res) => {
  const currentUserId = req.user.id;

  try {
    const allPosts = await Post.aggregate([{ $sample: { size: 1000 } }]);

    await Post.populate(allPosts, {
      path: "user",
      select: "username fullname",
    });

    const postWithOwnership = allPosts.map((post) => ({
      ...post,
      isOwner: post.user?._id.toString() === currentUserId,
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
