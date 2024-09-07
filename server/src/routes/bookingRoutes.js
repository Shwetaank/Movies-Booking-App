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
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     description: Create a booking for a movie, specifying seats and time slot.
 *     tags: [Booking]
 *     requestBody:
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
 *                 description: The name of the movie
 *                 example: Inception
 *               seats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     seatNumber:
 *                       type: string
 *                       description: The seat number
 *                       example: A1
 *                     isBooked:
 *                       type: boolean
 *                       description: Whether the seat is booked or not
 *                       example: false
 *               slot:
 *                 type: string
 *                 description: The time slot for the movie
 *                 example: 7:00 PM
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request - missing required fields
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
 *     summary: Get the latest booking
 *     description: Retrieve the most recent booking made by any user.
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Successful response with the latest booking details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The booking ID
 *                 movie:
 *                   type: string
 *                   description: The name of the movie
 *                 seats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       seatNumber:
 *                         type: string
 *                       isBooked:
 *                         type: boolean
 *                 slot:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: No previous booking found
 *       500:
 *         description: Internal server error
 */
router.get("/booking", getLastBooking);

export default router;
