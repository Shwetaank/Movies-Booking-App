import express from "express";
import {
  deleteBookingById,
  getBookingsById,
  getLastBooking,
  newBooking,
  validateBooking,
} from "../controllers/booking-controller.js";

const bookingsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Endpoints for managing movie bookings, including creating, retrieving, and deleting booking records.
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     description: Create a new booking for a movie with the specified details. This endpoint allows users to book a movie by providing movie ID, date, seats, and slot details, as well as optional fields like name, email, totalPrice, and status.
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
 *                 description: The ID of the movie to book.
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
 *               name:
 *                 type: string
 *                 description: The name of the person making the booking.
 *               email:
 *                 type: string
 *                 description: The email address of the person making the booking.
 *               totalPrice:
 *                 type: number
 *                 description: The total price for the booking.
 *               status:
 *                 type: string
 *                 description: The status of the booking (e.g., pending, confirmed, cancelled).
 *             required:
 *               - movie
 *               - date
 *               - seats
 *               - slot
 *               - totalPrice
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
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     totalPrice:
 *                       type: number
 *                     status:
 *                       type: string
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
 *     description: Retrieve the most recent booking made. If no bookings exist, return a message indicating so. This endpoint provides information about the latest booking record.
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
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 totalPrice:
 *                   type: number
 *                 status:
 *                   type: string
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

/**
 * @swagger
 * /booking/{id}:
 *   get:
 *     summary: Get booking by ID
 *     description: Retrieve a specific booking by its ID. This endpoint returns details of a booking based on the provided booking ID.
 *     tags:
 *       - Bookings
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the booking to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully
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
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 totalPrice:
 *                   type: number
 *                 status:
 *                   type: string
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
 * /booking/{id}:
 *   delete:
 *     summary: Delete booking by ID
 *     description: Delete a specific booking by its ID. This endpoint removes a booking record based on the provided booking ID.
 *     tags:
 *       - Bookings
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the booking to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking not found
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
bookingsRouter.get("/:id", getBookingsById);
bookingsRouter.delete("/:id", deleteBookingById);

export default bookingsRouter;
