import express from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMoviesById,
  updateMovie,
} from "../controllers/movie-controller.js";

const movieRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints for managing movie records including creation, retrieval, and specific movie details.
 */

/**
 * @swagger
 * /movie:
 *   post:
 *     summary: Add a new movie record
 *     description: Allows admins to add new movie records to the database. This operation requires authentication.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Movie details required for creating a new record.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the movie.
 *                 example: "Inception"
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The genre(s) of the movie.
 *                 example: ["Action", "Sci-Fi"]
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: The movie's release date in YYYY-MM-DD format.
 *                 example: "2010-07-16"
 *               duration:
 *                 type: integer
 *                 description: Duration of the movie in minutes.
 *                 example: 148
 *               description:
 *                 type: string
 *                 description: A brief synopsis or description of the movie.
 *                 example: "A mind-bending thriller about dreams within dreams."
 *               director:
 *                 type: string
 *                 description: The director of the movie.
 *                 example: "Christopher Nolan"
 *               cast:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The main cast members of the movie.
 *                 example: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
 *               posterUrl:
 *                 type: string
 *                 description: URL of the movie poster image.
 *                 example: "https://example.com/inception.jpg"
 *               featured:
 *                 type: boolean
 *                 description: Indicates whether the movie is featured.
 *                 example: true
 *     responses:
 *       201:
 *         description: Movie successfully added to the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie added successfully"
 *                 movie:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier of the movie.
 *                     title:
 *                       type: string
 *                     genre:
 *                       type: array
 *                       items:
 *                         type: string
 *                     releaseDate:
 *                       type: string
 *                       format: date
 *                     duration:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     director:
 *                       type: string
 *                     cast:
 *                       type: array
 *                       items:
 *                         type: string
 *                     posterUrl:
 *                       type: string
 *                     featured:
 *                       type: boolean
 *                     admin:
 *                       type: string
 *                       description: The ID of the admin who added the movie.
 *       400:
 *         description: Invalid input or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token provided"
 *       500:
 *         description: Server error while adding movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to add movie"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /movie:
 *   get:
 *     summary: Retrieve all movies
 *     description: Fetches a list of all movies in the database.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       genre:
 *                         type: array
 *                         items:
 *                           type: string
 *                       releaseDate:
 *                         type: string
 *                         format: date
 *                       duration:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       director:
 *                         type: string
 *                       cast:
 *                         type: array
 *                         items:
 *                           type: string
 *                       posterUrl:
 *                         type: string
 *                       featured:
 *                         type: boolean
 *       404:
 *         description: No movies found in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No movies found"
 *       500:
 *         description: Server error while fetching movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch movies"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Get a specific movie by ID
 *     description: Fetches detailed information about a movie by its unique ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the movie to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     genre:
 *                       type: array
 *                       items:
 *                         type: string
 *                     releaseDate:
 *                       type: string
 *                       format: date
 *                     duration:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     director:
 *                       type: string
 *                     cast:
 *                       type: array
 *                       items:
 *                         type: string
 *                     posterUrl:
 *                       type: string
 *                     featured:
 *                       type: boolean
 *       404:
 *         description: Movie not found by the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 *       500:
 *         description: Server error while fetching the movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to find movie"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     description: Allows admins to delete a movie from the database by its unique ID. This operation requires authentication via bearer token.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the movie to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie deleted successfully"
 *       404:
 *         description: Movie not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token provided"
 *       500:
 *         description: Server error while deleting the movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete movie"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /movie/{id}:
 *   patch:
 *     summary: Update a movie by ID
 *     description: Allows admins to update movie details by its unique ID. This operation requires authentication via bearer token.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the movie to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated movie details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the movie.
 *                 example: "Inception"
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The genre(s) of the movie.
 *                 example: ["Action", "Sci-Fi"]
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: The movie's release date in YYYY-MM-DD format.
 *                 example: "2010-07-16"
 *               duration:
 *                 type: integer
 *                 description: Duration of the movie in minutes.
 *                 example: 148
 *               description:
 *                 type: string
 *                 description: A brief synopsis or description of the movie.
 *                 example: "A mind-bending thriller about dreams within dreams."
 *               director:
 *                 type: string
 *                 description: The director of the movie.
 *                 example: "Christopher Nolan"
 *               cast:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The main cast members of the movie.
 *                 example: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
 *               posterUrl:
 *                 type: string
 *                 description: URL of the movie poster image.
 *                 example: "https://example.com/inception.jpg"
 *               featured:
 *                 type: boolean
 *                 description: Indicates whether the movie is featured.
 *                 example: true
 *     responses:
 *       200:
 *         description: Movie successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie updated successfully"
 *                 movie:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier of the movie.
 *                     title:
 *                       type: string
 *                     genre:
 *                       type: array
 *                       items:
 *                         type: string
 *                     releaseDate:
 *                       type: string
 *                       format: date
 *                     duration:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     director:
 *                       type: string
 *                     cast:
 *                       type: array
 *                       items:
 *                         type: string
 *                     posterUrl:
 *                       type: string
 *                     featured:
 *                       type: boolean
 *       400:
 *         description: Invalid input or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *       404:
 *         description: Movie not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token provided"
 *       500:
 *         description: Server error while updating the movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update movie"
 *                 error:
 *                   type: string
 */

movieRouter.post("/", addMovie);
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMoviesById);
movieRouter.delete("/:id", deleteMovie);
movieRouter.patch("/:id", updateMovie);

export default movieRouter;
