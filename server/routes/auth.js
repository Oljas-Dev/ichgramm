import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUsersCollection } from "./../db/config.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/register", async (req, res) => {
  const { username, email, fullName, password } = req.body;

  try {
    // Required data check
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string" ||
      typeof fullName !== "string" ||
      !username.trim() ||
      !password.trim() ||
      !email.trim() ||
      !fullName.trim()
    ) {
      return res.status(400).json({
        message: "Valid user data is required",
      });
    }

    // Existing user check
    const usersCollection = getUsersCollection();

    const existingUser = await usersCollection.findOne({
      username: username.trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // Email check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(password)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    // Password check
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
      fullName,
    };

    // const testUser = {
    //   username: "Oljas",
    //   email: "test@gamil.com",
    //   password: "45636568",
    //   fullname: "oljas medetbaev",
    // };

    try {
      await User.create(testUser);

      res.status(201).json({
        message: "User successfully registered!",
      });
    } catch (err) {
      console.error("Validation error: ", err);
    }
  } catch (err) {
    console.error("Registration error:", err);

    res.status(500).json({
      message: "Registration failed!",
    });
  }
});

export default router;
