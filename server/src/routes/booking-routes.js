import express from "express";
import {
  getLastBooking,
  newBooking,
  validateBooking,
} from "../controllers/booking-controller.js";

const bookingsRouter = express.Router();

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     description: Create a new booking for a movie with the specified details.
 *     tags:
 *       - Bookings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie:
 *                 type: string
 *                 description: The title of the movie to book.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the booking in YYYY-MM-DD format.
 *               seats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     seatNumber:
 *                       type: string
 *                       description: The seat number in the format 'A1', 'B12'.
 *                 description: List of seats to be booked.
 *               slot:
 *                 type: object
 *                 properties:
 *                   label:
 *                     type: string
 *                     description: The time slot for the booking (e.g., morning, noon, evening, night).
 *                 description: The time slot for the booking.
 *             required:
 *               - movie
 *               - date
 *               - seats
 *               - slot
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking created successfully
 *                 booking:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     movie:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *                     seats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           seatNumber:
 *                             type: string
 *                     slot:
 *                       type: object
 *                       properties:
 *                         label:
 *                           type: string
 *                     isBooked:
 *                       type: boolean
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get the last booking
 *     description: Retrieve the most recent booking made. If no bookings exist, return a message indicating so.
 *     tags:
 *       - Bookings
 *     responses:
 *       200:
 *         description: The most recent booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 movie:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 seats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       seatNumber:
 *                         type: string
 *                 slot:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                 isBooked:
 *                   type: boolean
 *       404:
 *         description: No previous booking found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No previous booking found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

bookingsRouter.post("/", validateBooking, newBooking);
bookingsRouter.get("/", getLastBooking);

export default bookingsRouter;
