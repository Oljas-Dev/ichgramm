import express from "express";
import authenticateJWT from "../middleware/authMiddleware.js";
import Like from "../models/Like.js";

const router = express.Router();

router.post("/:postId", authenticateJWT, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    if (!postId) {
      return res.status(400).json({
        message: "Post id is required",
      });
    }

    const response = await Like.create({
      postId,
      likedBy: userId,
    });

    if (!response) {
      return res.status(404).json({
        message: "No reaction was left",
      });
    }

    return res.status(200).json({
      message: "Success",
      response,
    });
  } catch (err) {
    console.error("No reaction was left: ", err);
    res.status(500).json({
      message: "No reaction was left",
      err,
    });
  }
});

router.delete("/:postId", authenticateJWT, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    if (!postId) {
      return res.status(400).json({
        message: "Post id is required",
      });
    }

    const response = await Like.findOneAndDelete({
      postId,
      likedBy: userId,
    });

    if (!response) {
      return res.status(404).json({
        message: "No reaction was left",
      });
    }

    return res.status(200).json({
      message: "Like successfully removed",
      response,
    });
  } catch (err) {
    console.error("No reaction was left: ", err);
    res.status(500).json({
      message: "No reaction was left",
    });
  }
});

export default router;
