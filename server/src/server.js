import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./swagger/swaggerOptions.js";
import errorHandler from "./utils/errorHandler.js";

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

// Generate Swagger Spec using swaggerOptions
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger API Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example Route
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Movie-Mania API!</h1>`);
});

// Error handling middleware
app.use(errorHandler);

// Initialize Environment Variables
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";

// Start the Server
app.listen(PORT, () =>
  console.log(
    `Server is running in ${NODE_ENV} mode at http://localhost:${PORT}`
  )
);
