import mongoose from "mongoose";

// Define the schema for the Booking model
const BookingSchema = new mongoose.Schema(
  {
    // Reference to the User model for the user who made the booking
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: true,
    },
    // Reference to the Car model for the car that was booked
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car", // Refers to the Car model
      required: true,
    },
    // Date of the booking
    date: {
      type: String,
      required: true,
    },
    // Start time of the booking
    startTime: {
      type: String,
      required: true,
    },
    // End time of the booking, defaults to null
    endTime: {
      type: String,
      default: null,
    },
    // Total cost of the booking, defaults to 0
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create the Booking model using the defined schema
const Booking = mongoose.model("Booking", BookingSchema);

// Export the Booking model
export default Booking;
