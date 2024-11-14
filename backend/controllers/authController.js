import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { config } from "../config/config.js";

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  try {
    console.log("Login Attempt: ", { username, password });

    const user = await User.findOne({ username: { $regex: new RegExp("^" + username + "$", "i") } });
    console.log("User Found: ", user); // Log found user

    if (!user) return res.status(400).json({ message: "Invalid username" });

    console.log("Stored Hashed Password: ", user.password); // Log stored hashed password

    const isPasswordValid = await user.comparePassword(password);
    console.log("Is Password Valid: ", isPasswordValid); // Log result of the password comparison

    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Protected Content
export const getProtectedContent = (req, res) => {
  res.json({ message: "Protected content", user: req.user });
};
