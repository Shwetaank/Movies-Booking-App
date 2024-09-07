import express from "express";
import {
  createBooking,
  getLastBooking,
} from "../controllers/bookingController.js";
import { body } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Seat:
 *       type: object
 *       properties:
 *         seatNumber:
 *           type: string
 *           description: The seat number (e.g., A1)
 *           example: "A1"
 *         isBooked:
 *           type: boolean
 *           description: Booking status of the seat
 *           example: false
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the booking
 *           example: "609c1f4e3f5d6a3b1c7f65d4"
 *         movie:
 *           type: string
 *           description: The movie being booked
 *           example: "Inception"
 *         seats:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Seat'
 *         slot:
 *           type: string
 *           description: Time slot of the booking
 *           example: "Evening"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the booking was created
 *           example: "2024-09-08T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the booking was last updated
 *           example: "2024-09-08T12:34:56Z"
 *         bookedSeatsCount:
 *           type: integer
 *           description: Number of booked seats in the booking
 *           example: 5
 *   responses:
 *     BadRequest:
 *       description: Bad request - missing required fields or invalid data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     msg:
 *                       type: string
 *                       example: "Movie is required"
 *     InternalServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Server Error"
 */

/**
 * @swagger
 * /api/booking:
 *   post:
 *     summary: Create a new booking
 *     description: Create a booking for a movie, specifying seats and a time slot. The booking includes movie details, an array of seats, and the time slot.
 *     tags: [Booking]
 *     requestBody:
 *       description: Booking details for the new booking
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie:
 *                 type: string
 *                 description: The movie to book
 *                 example: "Inception"
 *               seats:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Seat'
 *               slot:
 *                 type: string
 *                 description: Time slot of the booking (e.g., Morning, Afternoon, Evening, Night)
 *                 example: "Evening"
 *             required:
 *               - movie
 *               - seats
 *               - slot
 *     responses:
 *       201:
 *         description: Booking successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  "/booking",
  body("movie").notEmpty().withMessage("Movie is required"),
  body("seats")
    .isArray({ min: 1 })
    .withMessage("Seats must be an array with at least one seat")
    .custom((seats) => {
      const seatNumbers = seats.map((seat) => seat.seatNumber);
      const uniqueSeats = new Set(seatNumbers);
      if (seatNumbers.length !== uniqueSeats.size) {
        throw new Error("Duplicate seat numbers found");
      }
      return true;
    }),
  body("slot")
    .notEmpty()
    .withMessage("Slot is required")
    .isIn(["Morning", "Afternoon", "Evening", "Night"])
    .withMessage(
      "Slot must be one of 'Morning', 'Afternoon', 'Evening', or 'Night'"
    ),
  createBooking
);

/**
 * @swagger
 * /api/booking:
 *   get:
 *     summary: Retrieve the latest booking
 *     description: Fetch the most recent booking made, including details such as movie title, seats, time slot, and timestamps.
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Successfully retrieved the latest booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: No bookings found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/booking", getLastBooking);

export default router;
