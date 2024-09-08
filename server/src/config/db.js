import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Connecting to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoURI);

    if (process.env.NODE_ENV === "development") {
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    if (process.env.NODE_ENV !== "development") {
      console.error("Detailed error:", error);
    }

    if (process.env.NODE_ENV === "development") {
      process.exit(1);
    }
  }
};

export default connectDB;
