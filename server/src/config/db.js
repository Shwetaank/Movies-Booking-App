import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connecting to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    if (process.env.NODE_ENV === "development") {
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    // log the error in all environments
    if (process.env.NODE_ENV !== "development") {
      console.error("Detailed error:", error);
    }
    // Exit the process only in development mode
    if (process.env.NODE_ENV === "development") {
      process.exit(1);
    }
  }
};

export default connectDB;
