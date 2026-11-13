import express from "express";
import upload from "../config/multer.js";
import Post from "../models/Post.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  authenticateJWT,
  upload.single("image"),
  async (req, res) => {
    try {
      const { description } = req.body;

      console.log("Authenticated user:", req.user);

      // Check that an image was uploaded
      if (!req.file) {
        return res.status(400).json({
          message: "Image is required",
        });
      }

      // Create post
      const post = await Post.create({
        description,
        image: `/uploads/${req.file.filename}`,
        user: req.user.id,
      });

      return res.status(201).json({
        message: "Post created successfully",
        post,
      });
    } catch (error) {
      console.error("Post creation error:", error);

      return res.status(500).json({
        message: "Failed to create post",
      });
    }
  },
);

export default router;
