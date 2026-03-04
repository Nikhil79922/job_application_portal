import { z } from "zod";
export const loginSchema = z
    .object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, "Email is required")
        .email("Invalid email format")
        .max(254, "Email is too long"),
    password: z
        .string()
        .trim()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password must not exceed 72 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})
    .strict();
