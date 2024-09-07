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
    if (process.env.NODE_ENV === "development") {
      process.exit(1);
    }
  }
};

export default connectDB;
