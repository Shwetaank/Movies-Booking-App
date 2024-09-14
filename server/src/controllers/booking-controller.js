import { body, validationResult } from "express-validator";
import Booking from "../models/bookingModel.js";
import Movie from "../models/movieModel.js";
import mongoose from "mongoose";

// Define validation rules
export const validateBooking = [
  body("movie")
    .notEmpty()
    .withMessage("Movie ID is required")
    .isMongoId()
    .withMessage("Invalid Movie ID"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be in YYYY-MM-DD format"),

  body("seats")
    .isArray()
    .withMessage("Seats must be an array")
    .notEmpty()
    .withMessage("Seats cannot be empty")
    .custom((seats) => {
      return seats.every((seat) => /^[A-Z]\d{1,2}$/.test(seat.seatNumber));
    })
    .withMessage("Each seat number must follow the pattern like 'A1', 'B12'"),

  body("slot.label")
    .notEmpty()
    .withMessage("Slot label is required")
    .isIn(["morning", "noon", "evening", "night"])
    .withMessage(
      "Slot label must be one of 'morning', 'noon', 'evening', 'night'"
    ),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("totalPrice")
    .notEmpty()
    .withMessage("Total price is required")
    .isNumeric()
    .withMessage("Total price must be a number"),

  body("status")
    .optional()
    .isIn(["pending", "confirmed", "cancelled"])
    .withMessage("Status must be one of 'pending', 'confirmed', 'cancelled'"),
];

// Controller create new booking
export const newBooking = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { movie, date, seats, slot, name, email, totalPrice, status } =
    req.body;
  let existingMovie;
  let booking;

  try {
    existingMovie = await Movie.findById(movie);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found given ID" });
    }

    // Ensure date is properly formatted
    const formattedDate = new Date(date).toISOString().split("T")[0];

    booking = new Booking({
      movie,
      date: formattedDate,
      seats,
      slot,
      name,
      email,
      totalPrice,
      status,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      existingMovie.bookings.push(booking);
      await existingMovie.save({ session });
      await booking.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        message: "Booking created successfully",
        booking,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Transaction error: ", error);
      return res.status(500).json({ message: "Error processing transaction" });
    }
  } catch (error) {
    console.error("Error creating booking: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller get the last booking
export const getLastBooking = async (req, res, next) => {
  try {
    const lastBooking = await Booking.findOne().sort({ createdAt: -1 }); // Sort by creation date in descending order

    if (!lastBooking) {
      return res.status(404).json({ message: "No previous booking found" });
    }

    res.status(200).json(lastBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller get bookings by id
export const getBookingsById = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error retrieving booking by ID: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to delete bookings by ID
export const deleteBookingById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findByIdAndDelete(id).populate("movie");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking by ID: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
