import { z } from "zod";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const createSlotValidationSchema = z.object({
  body: z.object({
    service: z
      .string({
        invalid_type_error: "Service ID must be a string",
      })
      .refine((value) => objectIdPattern.test(value), {
        message: "Invalid Service ID format",
      }),
    date: z
      .string({
        invalid_type_error: "Date must be a string",
      })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Invalid date format",
      }),
    startTime: z
      .string({
        invalid_type_error: "Start time must be a string",
      })
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Invalid start time format"),
    endTime: z
      .string({
        invalid_type_error: "End time must be a string",
      })
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Invalid end time format"),
    isBooked: z
      .enum(["booked", "available", "canceled"], {
        invalid_type_error:
          'isBooked must be one of "booked", "available", "canceled"',
      })
      .optional(),
  }),
});

export const SlotValidations = {
  createSlotValidationSchema,
};
