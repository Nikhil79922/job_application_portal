import { z } from "zod";
export const forgotSchema = z
    .object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, "Email is required")
        .email("Invalid email format")
        .max(254, "Email is too long"),
})
    .strict();
