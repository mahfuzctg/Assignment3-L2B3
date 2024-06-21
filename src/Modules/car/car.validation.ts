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
    color: z
      .string({
        invalid_type_error: "Color must be a string",
      })
      .min(1, "Color is required"),
    pricePerHour: z
      .number({
        invalid_type_error: "Price per hour must be a number",
      })
      .min(0, "Price per hour must be at least 0"),

    isElectric: z
      .boolean({
        invalid_type_error: "isElectric must be a boolean",
      })
      .default(false),
    status: z
      .string({
        invalid_type_error: "Status must be a string",
      })
      .min(1, "Status is required")
      .default("available"),
    features: z
      .array(z.string())
      .min(1, { message: "At least one feature is required" }),
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
    color: z
      .string({
        invalid_type_error: "Color must be a string",
      })
      .min(1, "Color is required")
      .optional(),
    pricePerHour: z
      .number({
        invalid_type_error: "Price per hour must be a number",
      })
      .min(0, "Price per hour must be at least 0")
      .optional(),
    isElectric: z
      .boolean({
        invalid_type_error: "isElectric must be a boolean",
      })
      .optional(),
    status: z
      .string({
        invalid_type_error: "Status must be a string",
      })
      .min(1, "Status is required")
      .optional(),
    features: z
      .array(z.string())
      .min(1, { message: "At least one feature is required" })
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
