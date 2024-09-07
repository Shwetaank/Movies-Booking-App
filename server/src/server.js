import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';


// Load environment variables
dotenv.config();

// Initialize the application
const app = express();

// Database Connection
connectDB();

// Middleware Setup
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the API</h1>
    <p>This API provides endpoints for managing movies, users, and bookings.</p>
  `);
});


// Swagger API Documentation
// Add Swagger setup and route for documentation here

// Start the Server
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";
app.listen(PORT, () =>
  console.log(`Server is running in ${NODE_ENV} mode at http://localhost:${PORT}`)
);
