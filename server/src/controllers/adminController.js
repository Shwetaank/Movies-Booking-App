import { validationResult } from "express-validator";
import Movie from "../models/Movie.js";

// Create a new movie
export const addMovie = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, genre, releaseDate, duration, director, cast, posterUrl } = req.body;

    // Create a new movie instance
    const newMovie = new Movie({ title, genre, releaseDate, duration, director, cast, posterUrl });

    // Save the movie to the database
    await newMovie.save();

    // Respond with success message
    res.status(201).json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    // Handle server error
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    // Fetch all movies from the database
    const movies = await Movie.find();

    // Respond with all movie details
    res.status(200).json(movies);
  } catch (error) {
    // Handle server error
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a movie
export const updateMovie = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { title, genre, releaseDate, duration, director, cast, posterUrl } = req.body;

    // Find and update the movie
    const updatedMovie = await Movie.findByIdAndUpdate(id, { title, genre, releaseDate, duration, director, cast, posterUrl }, { new: true });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    // Handle server error
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a movie
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the movie
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    // Handle server error
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
