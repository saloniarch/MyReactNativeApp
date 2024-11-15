import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
