import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name is required"),
    description: z
      .string({
        invalid_type_error: "Description must be a string",
      })
      .min(1, "Description is required"),
    pricePerHour: z
      .number({
        invalid_type_error: "pricePerHour must be a number",
      })
      .min(0, "pricePerHour must be at least 0"),

    isDeleted: z
      .boolean({
        invalid_type_error: "isDeleted must be a boolean",
      })
      .default(false),
  }),
});

const updateCarValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name is required")
      .optional(),
    description: z
      .string({
        invalid_type_error: "Description must be a string",
      })
      .min(1, "Description is required")
      .optional(),
    pricePerHour: z
      .number({
        invalid_type_error: "PricePerHour must be a number",
      })
      .min(0, "pricePerHour must be at least 0")
      .optional(),

    isDeleted: z
      .boolean({
        invalid_type_error: "isDeleted must be a boolean",
      })
      .optional(),
  }),
});

export const CarValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
