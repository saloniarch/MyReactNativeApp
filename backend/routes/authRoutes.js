import express from "express";
import { registerUser, loginUser, getProtectedContent } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", authMiddleware, getProtectedContent);

export default router;
