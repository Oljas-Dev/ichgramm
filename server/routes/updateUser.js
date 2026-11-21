import express from "express";
import mongoose from "mongoose";
import authenticateJWT from "../middleware/authMiddleware.js";
import checkUser from "../middleware/checkUser.js";
import User from "../models/User.js";
import { addData } from "../helpers/functions.js";

const router = express.Router();

router.put("/:userId", authenticateJWT, checkUser, async (req, res) => {
  const { userId } = req.params;
  const allowedValues = ["avatar", "username", "website", "about"];

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    let updatedUser = {};

    Object.entries(req.body).forEach(([key, value]) => {
      if (allowedValues.includes(key)) addData(key, value, updatedUser);
    });

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

    return res.status(200).json({
      message: "User was successfully updated",
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to update user",
    });
  }
});

export default router;
