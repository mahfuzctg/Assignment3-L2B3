import { z } from 'zod';

// Creation Schema: All fields are optional
const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    model: z.string().optional(),
    year: z.string().optional(),
    date: z.string().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    ownerEmail: z.string().optional(),
    ownerName: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    carType: z.string().optional(),
    seatCapacity: z.number().optional(),
    isElectric: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().optional(),
  }),
});

// Update Schema: Fields can be optional or required as needed
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    model: z.string().optional(),
    year: z.string().optional(),
    date: z.string().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    ownerEmail: z.string().optional(),
    ownerName: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().optional(),
  }),
});

// Return Car Schema
const returnCarValidationSchema = z.object({
  body: z.object({
    bookingId: z.string({
      required_error: 'Booking Id is required',
      invalid_type_error: 'Booking Id must be a string',
    }),
    endTime: z.string({
      required_error: 'End Time is required',
      invalid_type_error: 'End Time must be a string',
    }),
  }),
});

export const CarValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema,
};
