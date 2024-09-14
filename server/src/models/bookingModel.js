import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seats: [
    {
      seatNumber: {
        type: String,
        required: true,
      },
    },
  ],
  slot: {
    label: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    // No `required` field here, making it optional
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
