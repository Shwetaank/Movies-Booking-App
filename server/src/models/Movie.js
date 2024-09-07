import mongoose from "mongoose";

// Define the Movie schema
const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Remove leading and trailing whitespace
    },
    genre: {
      type: [String], // Array of genres
      required: true,
      validate: [arrayLimit, "Genres must be an array with at least one genre"], // Custom validation function
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
      min: [0, "Duration must be a positive number"], // Ensure duration is positive
    },
    director: {
      type: String,
      trim: true, // Remove leading and trailing whitespace
    },
    cast: {
      type: [String], // Array of actor names
      validate: [arrayLimit, "Cast must be an array with at least one actor"], 
    },
    posterUrl: {
      type: String, // URL to the movie poster image
      match: [/^https?:\/\/.+/, "Please enter a valid URL"], // Ensure URL format
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Custom validation function for arrays
function arrayLimit(val) {
  return val.length > 0;
}

export default mongoose.model("Movie", MovieSchema);
