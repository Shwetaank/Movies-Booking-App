import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import Movie from "../models/movieModel.js";
import mongoose from "mongoose";
import Admin from "../models/adminModel.js";

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const adminUser = await Admin.findById(adminId).session(session);
    if (!adminUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Admin user not found" });
    }

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
      admin: adminId,
    });

    await movie.save({ session });
    adminUser.addedMovies.push(movie._id);
    await adminUser.save({ session });

    await session.commitTransaction();

    // Format the releaseDate before sending response
    const formattedMovie = {
      ...movie._doc,
      releaseDate: formatDate(movie.releaseDate),
    };

    return res.status(201).json({
      message: "Movie added successfully",
      movie: formattedMovie,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error during movie addition:", error); // Log the error
    return res
      .status(500)
      .json({ message: "Failed to add movie", error: error.message });
  } finally {
    session.endSession();
  }
};

// Function to get all movies
export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    if (!movies.length) {
      return res.status(404).json({ message: "No movies found" });
    }
    // Format releaseDates before sending response
    const formattedMovies = movies.map((movie) => ({
      ...movie._doc,
      releaseDate: formatDate(movie.releaseDate),
    }));
    return res.status(200).json({ movies: formattedMovies });
  } catch (error) {
    console.error("Error fetching movies:", error); // Log the error
    return res
      .status(500)
      .json({ message: "Failed to fetch movies", error: error.message });
  }
};

// Function to get movie by id
export const getMoviesById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    // Format releaseDate before sending response
    const formattedMovie = {
      ...movie._doc,
      releaseDate: formatDate(movie.releaseDate),
    };
    return res.status(200).json({ movie: formattedMovie });
  } catch (error) {
    console.error("Error finding movie:", error); // Log the error
    return res
      .status(500)
      .json({ message: "Failed to find movie", error: error.message });
  }
};
