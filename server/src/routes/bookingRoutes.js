// routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
  getLastBooking,
} from "../controllers/bookingController.js";
import { body } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Operations related to movie bookings
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     description: Create a booking for a movie, specifying seats and a time slot. The booking information includes movie details, an array of seats with their status, and the time slot for the movie.
 *     tags: [Booking]
 *     requestBody:
 *       description: Booking information that needs to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movie
 *               - seats
 *               - slot
 *             properties:
 *               movie:
 *                 type: string
 *                 description: The title of the movie for which the booking is made
 *                 example: "Inception"
 *               seats:
 *                 type: array
 *                 description: An array of seat objects indicating seat numbers and their booking status
 *                 items:
 *                   type: object
 *                   properties:
 *                     seatNumber:
 *                       type: string
 *                       description: The seat number in the cinema
 *                       example: "A1"
 *                     isBooked:
 *                       type: boolean
 *                       description: Indicates whether the seat is booked or not
 *                       example: false
 *               slot:
 *                 type: string
 *                 description: The time slot for the movie showing
 *                 example: "7:00 PM"
 *     responses:
 *       201:
 *         description: Booking successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Booking created successfully"
 *       400:
 *         description: Bad request - missing required fields or invalid data
 *       500:
 *         description: Internal server error
 */
router.post(
  "/booking",
  body("movie").notEmpty().withMessage("Movie is required"),
  body("seats")
    .isArray()
    .withMessage("Seats must be an array")
    .notEmpty()
    .withMessage("Seats are required"),
  body("slot").notEmpty().withMessage("Slot is required"),
  createBooking
);

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Retrieve the latest booking
 *     description: Fetch the most recent booking made by any user, including details such as movie title, seats, time slot, and timestamps.
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Successfully retrieved the latest booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the booking
 *                 movie:
 *                   type: string
 *                   description: The title of the booked movie
 *                 seats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       seatNumber:
 *                         type: string
 *                         description: Seat number in the cinema
 *                       isBooked:
 *                         type: boolean
 *                         description: Status of the seat booking
 *                 slot:
 *                   type: string
 *                   description: The time slot of the movie showing
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp when the booking was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp when the booking was last updated
 *       404:
 *         description: No bookings found
 *       500:
 *         description: Internal server error
 */
router.get("/booking", getLastBooking);

export default router;
