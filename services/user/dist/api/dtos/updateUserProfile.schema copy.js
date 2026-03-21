import { z } from "zod";
export const updateUserProfileSchema = z
    .object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long")
        .optional(),
    phoneNumber: z
        .string()
        .trim()
        .min(1, "Phone number is required")
        .regex(/^[0-9]{10,15}$/, "Invalid phone number")
        .optional(),
    bio: z
        .string()
        .trim()
        .max(500, "Bio must be less than 500 characters")
        .optional(),
});
export const updateUserResponseDTO = z.object({
    user_id: z.number(),
    name: z.string(),
    email: z.string(),
    phone_number: z.string(),
    bio: z.string().nullable().optional(),
});
