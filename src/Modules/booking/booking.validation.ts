import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z
      .string({
        required_error: 'Date is required',
        invalid_type_error: 'Date must be a string',
      })
      .refine(
        (dateString) => {
          // Check if the date string is a valid date
          const date = new Date(dateString);
          return !isNaN(date.getTime());
        },
        {
          message: 'Invalid date format',
        },
      ),

    car: z.string({
      required_error: 'Car ID is required',
      invalid_type_error: 'Car ID must be a string',
    }),

    startTime: z
      .string({
        required_error: 'Start time is required',
        invalid_type_error: 'Start time must be a string',
      })
      .regex(/^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/, {
        message: 'Start time must be in HH:mm format',
      }),

    endTime: z
      .string({
        required_error: 'End time is required',
        invalid_type_error: 'End time must be a string',
      })
      .regex(/^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/, {
        message: 'End time must be in HH:mm format',
      })
      .refine(
        (endTime, ctx) => {
          const startTime = ctx?.parent?.startTime;
          if (startTime) {
            const startDateTime = new Date(
              `${ctx?.parent?.date}T${startTime}:00`,
            );
            const endDateTime = new Date(`${ctx?.parent?.date}T${endTime}:00`);
            return endDateTime > startDateTime;
          }
          return true;
        },
        {
          message: 'End time must be after start time',
        },
      ),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
