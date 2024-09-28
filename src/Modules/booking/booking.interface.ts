/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TBooking = {
  date: Date; // The date of the booking
  user: Types.ObjectId; // Identifier for the user (reference to user model)
  car: Types.ObjectId; // Identifier for the booked car (reference to car model)
  startTime: string; // The start time of the booking in 24-hour format
  endTime: string; // The end time of the booking in 24-hour format
  totalCost: number; // The total cost calculated based on startTime, endTime, and pricePerHour
  pricePerHour: number; // The price per hour for the car
  status?: string; // The status of the booking (optional)
  transactionId?: string; // Transaction ID (optional)
};

export interface BookingModel extends Model<TBooking> {
  isBookingExistById(id: string): Promise<TBooking | null>; // Method to check if booking exists by ID
  calculateTotalCost(
    startTime: string,
    endTime: string,
    pricePerHour: number,
  ): number; // New method for cost calculation
}