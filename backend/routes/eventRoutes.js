import express from 'express';
import path from 'path'; // To handle file paths
import { fileURLToPath } from 'url'; // To get the file path of the current module
import multer from 'multer'; // For handling file uploads
import Event from '../models/Events.js'; // Import the Event model
import authMiddleware from '../middleware/authMiddleware.js'; // Import the authentication middleware

// Get the current directory of the file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for handling file uploads (image uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Use the correct directory path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname); // Unique file name
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

// Route for creating a new event (Protected with Authentication)
router.post('/create', authMiddleware, upload.single('picture'), async (req, res) => {
    try {
        // Get the event details from the request body
        const { name, category, description, date, address, country, city } = req.body;

        // Check if any required fields are missing
        if (!name || !category || !description || !date || !address || !country || !city) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create the new event
        const newEvent = new Event({
            name,
            category,
            description,
            date,
            address,
            country,
            city,
            picture: req.file ? req.file.path : null, // Store the image path if an image is uploaded
            user: req.user._id, // Store the user ID of the creator (from the JWT)
        });

        // Save to the database
        await newEvent.save();

        // Respond with the created event
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Failed to create event', error: error.message });
    }
});

export default router;
