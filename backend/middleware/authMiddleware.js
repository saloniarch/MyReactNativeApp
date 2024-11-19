import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No authorization header provided." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. Bearer token missing." });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
