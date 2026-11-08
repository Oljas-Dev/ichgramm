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
      email: email.trim().toLowerCase(),
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

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  const userIdentifier = await User.findOne({
    $or: [
      { username: identifier.trim() },
      { email: identifier.trim().toLowerCase() },
    ],
  });

  try {
    // Validate input
    if (!userIdentifier || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      $or: [
        { username: identifier.trim() },
        { email: identifier.trim().toLowerCase() },
      ],
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Successfull login, generate jwt
    const token = jwt.sign(
      {
        user: { id: user._id, username: user.username },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ message: "Successfull login", token });
  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
