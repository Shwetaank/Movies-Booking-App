import express from "express";
import {
  addMovie,
  deleteMovie,
  updateMovie,
  getAllMovies,  // updated function name
} from "../controllers/adminController.js";
import { body, param } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Operations for managing movies
 */

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Add a new movie
 *     description: Adds a movie to the database with details such as title, genre, release date, and more.
 *     tags: [Movies]
 *     requestBody:
 *       description: Movie details to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - genre
 *               - releaseDate
 *               - duration
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the movie
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of genres
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: Release date of the movie
 *               duration:
 *                 type: number
 *                 description: Duration in minutes
 *               director:
 *                 type: string
 *                 description: Director of the movie
 *               cast:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of cast members
 *               posterUrl:
 *                 type: string
 *                 description: URL of the movie poster
 *     responses:
 *       201:
 *         description: Movie added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie added successfully"
 *                 movie:
 *                   $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve all movies
 *     description: Retrieves a list of all movies from the database.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     description: Updates the details of a specific movie by its ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie to update
 *     requestBody:
 *       description: Updated movie details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: number
 *               director:
 *                 type: string
 *               cast:
 *                 type: array
 *                 items:
 *                   type: string
 *               posterUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie updated successfully"
 *                 movie:
 *                   $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     description: Removes a specific movie from the database by its ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie to delete
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.post(
  "/movies",
  body("title").notEmpty().withMessage("Title is required"),
  body("genre").isArray().notEmpty().withMessage("Genre is required"),
  body("releaseDate").isDate().withMessage("Release date must be a valid date"),
  body("duration").isNumeric().withMessage("Duration must be a number"),
  addMovie
);

router.get("/movies", getAllMovies);

router.put(
  "/movies/:id",
  param("id").isMongoId().withMessage("Invalid movie ID"),
  body("title").optional().notEmpty().withMessage("Title must not be empty"),
  body("genre").optional().isArray().notEmpty().withMessage("Genre must be an array"),
  body("releaseDate").optional().isDate().withMessage("Release date must be a valid date"),
  body("duration").optional().isNumeric().withMessage("Duration must be a number"),
  updateMovie
);

router.delete(
  "/movies/:id",
  param("id").isMongoId().withMessage("Invalid movie ID"),
  deleteMovie
);

export default router;
