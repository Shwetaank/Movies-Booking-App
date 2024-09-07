import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerOptions.js";

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
app.use ("/api",bookingRoutes);


// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the Server
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";
app.listen(PORT, () =>
  console.log(
    `Server is running in ${NODE_ENV} mode at http://localhost:${PORT}`
  )
);
