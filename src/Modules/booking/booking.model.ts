import mongoose, { Schema } from "mongoose";

// Define Booking Schema
const BookingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the User model
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car", // Refers to the Car model
    required: true,
  },
  date: String,
  startTime: String,
  endTime: String,
  totalCost: Number,
});

// Create Booking model
const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
