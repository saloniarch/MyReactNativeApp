import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/config.js';

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    const newUser = new User({ username: username.toLowerCase(), email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('Entered password:', password);

    try {
    // Find the user by username
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      console.log('No user found with username:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);
    console.log('Stored hashed password:', user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    console.log('Stored hashed password:', user.password);

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      config.jwtSecret, 
      { expiresIn: '1h' });
    
    console.log("Generated Token:", token); // Log token here

    res.json({ token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
  // Protected Content
  export const getProtectedContent = (req, res) => {
  res.json({ message: "Protected content", user: req.user });
};