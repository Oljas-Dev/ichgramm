import express from "express";
import authenticateJWT from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/search", authenticateJWT, async (req, res) => {
  const searchQuery = req.query.q?.trim();
  try {
    if (!searchQuery) {
      return res.status(400).json({
        message: "No search query provided",
      });
    }

    const response = await User.find({
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { fullname: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .select("fullname username avatar")
      .limit(10)
      .lean();

    return res.status(200).json({
      message: "Successfull search",
      response,
    });
  } catch (err) {
    console.error("Could find anything", err);
    return res.status(500).json({
      message: "Something went wrong during user search",
    });
  }
});

export default router;
