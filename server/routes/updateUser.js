import express from "express";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import authenticateJWT from "../middleware/authMiddleware.js";
import checkUser from "../middleware/checkUser.js";
import User from "../models/User.js";
import { addData } from "../helpers/functions.js";
import uploadAvatar from "../config/avatar.js";

const router = express.Router();

const avatarDir = path.join(process.cwd(), "public", "avatars");

router.put(
  "/:userId",
  authenticateJWT,
  checkUser,
  uploadAvatar.single("image"),
  async (req, res) => {
    const { userId } = req.params;
    const allowedValues = ["username", "website", "about"];

    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          message: "Invalid user ID",
        });
      }

      // Retrieving of the current user and avatar
      const existingUser = await User.findById(userId);

      if (!existingUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const oldAvatar = existingUser.avatar;

      let updatedUser = {};

      Object.entries(req.body).forEach(([key, value]) => {
        if (allowedValues.includes(key)) addData(key, value, updatedUser);
      });

      if (req.file) {
        updatedUser.avatar = `/avatars/${req.file.filename}`;
      }

      if (Object.keys(updatedUser).length === 0) {
        return res.status(400).json({
          message: "No valid fields provided",
        });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updatedUser },
        { new: true, runValidators: true },
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Delete previous avatar after successful DB update
      if (req.file && oldAvatar?.startsWith("/avatars/")) {
        const oldFilename = path.basename(oldAvatar);
        const oldAvatarPath = path.join(avatarDir, oldFilename);

        try {
          await fs.unlink(oldAvatarPath);
        } catch (error) {
          if (error.code !== "ENOENT") {
            console.error("Could not delete previous avatar:", error);
          }
        }
      }

      return res.status(200).json({
        message: "User was successfully updated",
        user,
      });
    } catch (err) {
      console.error(err);

      // Removing newly uploaded file if the update failed
      if (req.file) {
        await fs.unlink(req.file.path).catch(() => {});
      }

      return res.status(500).json({
        message: "Failed to update user",
      });
    }
  },
);

export default router;
