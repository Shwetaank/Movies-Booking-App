import { validationResult } from "express-validator";
import Booking from "../models/Booking.js";

// Create a new booking
export const createBooking = [
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { movie, seats, slot } = req.body;

      // Ensure that there are no duplicate seats (this will be handled by the schema validation)
      const newBooking = new Booking({ movie, seats, slot });

      // Save the booking to the database
      await newBooking.save();

      // Respond with success message and the saved booking including the virtual field
      res.status(201).json({
        message: "Booking saved successfully",
        booking: newBooking, // This will include virtual fields like `bookedSeatsCount`
      });
    } catch (error) {
      // Handle server error
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },
];

// Get the last booking
export const getLastBooking = async (req, res) => {
  try {
    // Find the most recent booking based on the createdAt field
    const lastBooking = await Booking.findOne()
      .sort({ createdAt: -1 })
      .limit(1);

    if (!lastBooking) {
      return res.status(404).json({ message: "No booking found" });
    }

    // Respond with the last booking details including the virtual field
    res.status(200).json(lastBooking);
  } catch (error) {
    // Handle server error
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
