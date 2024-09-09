import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import Movie from "../models/movieModel.js";

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Middleware for verifying JWT token
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        reject(new Error("Invalid token"));
      } else {
        resolve(decodedToken.id);
      }
    });
  });
};

export const addMovie = async (req, res, next) => {
  // Check validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract and verify token
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  let adminId;
  try {
    adminId = await verifyToken(token);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }

  // Movie data from request body
  const {
    title,
    genre,
    releaseDate,
    duration,
    description,
    director,
    cast,
    posterUrl,
    featured,
  } = req.body;

  // Create and save movie
  try {
    const movie = new Movie({
      title,
      genre,
      releaseDate: new Date(releaseDate),
      duration,
      description,
      director,
      cast,
      posterUrl,
      featured,
      admin: adminId, // Link admin to movie
    });

    const savedMovie = await movie.save();

    // Format the releaseDate before sending response
    const formattedMovie = {
      ...savedMovie._doc,
      releaseDate: formatDate(savedMovie.releaseDate),
    };

    return res.status(201).json({
      message: "Movie added successfully",
      movie: formattedMovie,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add movie", error });
  }
};

// Function to get all movies
export const getAllMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch movies", error });
  }
  if (!movies) {
    return res.status(404).json({ message: "No movies found" });
  }
  return res.status(200).json({ movies });
};

//  function to get Movies By id
export const getMoviesById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (error) {
    return res.status(500).json({ message: "Failed to find movie", error });
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ movie });
};
