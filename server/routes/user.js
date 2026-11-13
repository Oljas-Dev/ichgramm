import express from "express";
import User from "./../models/User.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/current", authenticateJWT, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findOne({
      _id: userId,
    });

    const currentUser = {
      fullname: user.fullname,
      username: user.username,
      avatar: "",
      createdAt: user.createdAt,
      id: user._id,
    };

    return res.status(200).json(currentUser);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({
      message: "Failed to fetch user",
    });
  }
});

export default router;
