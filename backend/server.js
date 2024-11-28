import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: "http://192.168.0.36:8081",
})); //  Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON data

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});