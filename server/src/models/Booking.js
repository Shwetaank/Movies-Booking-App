import mongoose from "mongoose";

// Define the Seat schema
const SeatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: [true, "Seat number is required"],
    match: [
      /^[A-Z]\d{1,2}$/,
      "Seat number must follow the pattern like 'A1', 'B12'",
    ],
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
      type: String,
      required: [true, "Movie name is required"],
      index: true, // Add index for faster query performance on movie field
    },
    seats: {
      type: [SeatSchema], // Embedded Seat schema
      validate: {
        validator: function (seats) {
          const seatNumbers = seats.map((seat) => seat.seatNumber);
          return seatNumbers.length === new Set(seatNumbers).size; // Check for duplicate seat numbers
        },
        message: "Duplicate seat numbers found in booking",
      },
    },
    slot: {
      type: String,
      required: [true, "Slot is required"],
      enum: {
        values: ["Morning", "Afternoon", "Evening", "Night"],
        message:
          "Slot must be either 'Morning', 'Afternoon', 'Evening', or 'Night'",
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to objects
  }
);

// Virtual field to count the number of booked seats
BookingSchema.virtual("bookedSeatsCount").get(function () {
  return this.seats.filter((seat) => seat.isBooked).length;
});

// Index on movie and slot for faster lookups when querying by movie and slot
BookingSchema.index({ movie: 1, slot: 1 });

export default mongoose.model("Booking", BookingSchema);
