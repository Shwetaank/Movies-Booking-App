import { body, validationResult } from "express-validator";
import Booking from "../models/bookingModel.js";

// Define validation rules
export const validateBooking = [
  body("movie")
    .notEmpty().withMessage("Movie title is required")
    .isString().withMessage("Movie title must be a string"),
  
  body("date")
    .notEmpty().withMessage("Date is required")
    .isISO8601().withMessage("Date must be in YYYY-MM-DD format"),
  
  body("seats")
    .isArray().withMessage("Seats must be an array")
    .notEmpty().withMessage("Seats cannot be empty")
    .custom((seats) => {
      return seats.every(seat => /^[A-Z]\d{1,2}$/.test(seat.seatNumber));
    }).withMessage("Each seat number must follow the pattern like 'A1', 'B12'"),
  
  body("slot.label")
    .notEmpty().withMessage("Slot label is required")
    .isIn(["morning", "noon", "evening", "night"]).withMessage("Slot label must be one of 'morning', 'noon', 'evening', 'night'")
];

// Controller function with validation
export const newBooking = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { movie, date, seats, slot } = req.body;
  let booking;
  try {
    // Ensure date is properly formatted
    const formattedDate = new Date(date).toISOString().split("T")[0];

    booking = new Booking({ movie, date: formattedDate, seats, slot });
    booking = await booking.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
  if (!booking) {
    return res.status(400).json({ message: "Booking failed" });
  }

  res.status(201).json({
    message: "Booking created successfully",
    booking,
  });
};
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