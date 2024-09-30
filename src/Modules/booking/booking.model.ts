/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { BookingModel, TBooking } from './booking.interface';

// Define the schema based on the updated TBooking type
const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: false,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true, // Make this required as per your specifications
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    pricePerHour: {
      type: Number,
      required: false, // This is now required to calculate total cost
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'completed', 'cancelled'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  },
);

// Static method to check if a booking exists by its ID
bookingSchema.statics.isBookingExistById = async function (
  id: string,
): Promise<TBooking | null> {
  return await this.findById(id).populate('user car');
};

// Static method to calculate total cost based on startTime, endTime, and pricePerHour
bookingSchema.statics.calculateTotalCost = function (
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number {
  const start = new Date(`1970-01-01T${startTime}:00Z`); // Create a Date object for start time
  const end = new Date(`1970-01-01T${endTime}:00Z`); // Create a Date object for end time
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Calculate duration in hours
  return durationInHours > 0 ? Math.max(durationInHours * pricePerHour, 0) : 0; // Calculate total cost
};

// Create the Booking model using the schema and the BookingModel interface
export const Booking = model<TBooking, BookingModel>('Booking', bookingSchema);
