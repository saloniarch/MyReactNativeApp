import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    // Debugging: Log the decoded user data
    console.log('Decoded JWT User:', user);  // <-- Add this line for debugging
    
    req.user = user; // Attach user information to the request object
    next();
  });
};

export default authenticateToken;
