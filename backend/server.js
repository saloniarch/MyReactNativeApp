import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Use the authRoutes
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
