import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createEvent, fetchEvents } from '../controllers/eventController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
    },
    limits: { fileSize: 5 * 1024 * 1024 },
});

// Routes
router.post('/create', authMiddleware, upload.single('picture'), createEvent); // Use controller
router.get('/', fetchEvents); // Use controller

// Serve static files
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export default router;
