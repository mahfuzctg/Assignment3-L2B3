import { Schema, model } from 'mongoose';
import { TCar } from './car.interface';

const carModelSchema = new Schema<TCar>(
  {
    name: {
      type: String,
      required: false, // Optional
    },
    model: {
      type: String,
      required: false, // Optional
    },
    year: {
      type: String,
      required: false, // Optional
    },
    date: {
      type: Date,
      required: false, // Optional (can change to true if necessary)
    },
    image: {
      type: String,
      required: false, // Optional
    },
    location: {
      type: String,
      required: false, // Optional
    },
    ownerEmail: {
      type: String,
      required: false, // Optional
    },
    ownerName: {
      type: String,
      required: false, // Optional
    },
    description: {
      type: String,
      required: false, // Optional
    },
    color: {
      type: String,
      required: false, // Optional
    },
    carType: {
      type: String,
      required: false, // Optional
    },
    seatCapacity: {
      type: Number,
      required: false, // Optional
    },
    isElectric: {
      type: Boolean,
      required: false, // Optional
    },
    status: {
      type: String,
      default: 'available',
    },
    features: {
      type: [String],
      required: false, // Optional
    },
    pricePerHour: {
      type: Number,
      required: false, // Optional
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Car = model<TCar>('Car', carModelSchema);
