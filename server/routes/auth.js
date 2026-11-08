import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, fullname, password } = req.body;

  try {
    // Required data check
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string" ||
      typeof fullname !== "string" ||
      !username.trim() ||
      !password.trim() ||
      !email.trim() ||
      !fullname.trim()
    ) {
      return res.status(400).json({
        message: "Valid user data is required",
      });
    }

    // Existing user check
    const existingUser = await User.findOne({
      username: username.trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // Email check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }
    const existingEmail = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Password check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
      fullname,
    };

    // const testUser = {
    //   username: "Oljas",
    //   email: "test@gamil.com",
    //   password: "45636568",
    //   fullname: "oljas medetbaev",
    // };
    await User.create(user);

    res.status(201).json({
      message: "User successfully registered!",
    });
  } catch (err) {
    console.error("Registration error:", err);

    res.status(500).json({
      message: "Registration failed!",
    });
  }
});

export default router;
