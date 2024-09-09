import mongoose from "mongoose";

// Custom setter to handle date formatting
const dateSetter = (value) => {
  if (value) {
    const date = new Date(value);
    // Create a date string in YYYY-MM-DD format
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
      .toISOString()
      .split("T")[0];
  }
  return value;
};

const bookingSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
    index: true,
  },
  date: {
    type: String, // Change to String to store date in YYYY-MM-DD format
    required: true,
    set: dateSetter, // Apply custom setter
  },
  seats: [
    {
      seatNumber: {
        type: String,
        required: true,
        match: /^[A-Z]\d{1,2}$/,
        message: "Seat number must follow the pattern like 'A1', 'B12'",
      },
    },
  ],
  slot: {
    label: {
      type: String,
      required: true,
      enum: ["morning", "noon", "evening", "night"],
    },
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
