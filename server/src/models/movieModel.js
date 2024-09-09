import mongoose from "mongoose";

// Function to validate that arrays are not empty
function arrayLimit(val) {
  return val.length > 0;
}

// Function to validate that dates are in the past
function dateLimit(val) {
  return val < new Date();
}

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: [String],
    required: true,
    validate: [arrayLimit, "Genres must be an array with at least one genre"],
  },
  releaseDate: {
    type: Date,
    required: true,
    validate: [dateLimit, "Release date must be in the past"],
  },
  duration: {
    type: Number,
    required: true,
    min: [1, "Duration must be a positive integer"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  cast: {
    type: [String],
    required: true,
    validate: [arrayLimit, "Cast must be an array with at least one actor"],
  },
  posterUrl: {
    type: String,
    required: true,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: true,
  },
  bookings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
    },
  ],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
