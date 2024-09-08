import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    movie: [String],
    seats: {
      A1: Number,
      A2: Number,
      B1: Number,
      B2: Number,
      C1: Number,
      C2: Number,
      D1: Number,
      D2: Number,
    },
    slot: String,
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
