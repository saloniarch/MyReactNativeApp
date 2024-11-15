import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/config.js';

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email is already registered
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
    // Find the user with the username (case-insensitive)
    const user = await User.findOne({ username: { $regex: new RegExp("^" + username + "$", "i") } });

    if (!user) return res.status(400).json({ message: "Invalid username" });

    // Validate password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Protected Content
export const getProtectedContent = (req, res) => {
  res.json({ message: "Protected content", user: req.user });
};
