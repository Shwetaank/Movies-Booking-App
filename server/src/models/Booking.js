import mongoose from "mongoose";

// Define the Seat schema
const SeatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

// Define the Booking schema
const BookingSchema = new mongoose.Schema(
  {
    movie: {
      type: String, // Correct type
      required: true,
    },
    seats: [SeatSchema], // Embedded Seat schema
    slot: {
      type: String, // Fix: String with uppercase 'S'
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.model("Booking", BookingSchema);
