import { z } from "zod";

export const ResetSchema = z
  .object({
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

    token: z
      .string()
      .trim()
      .min(1, "Reset token is required"),
  })
  .strict();

export type ResetDTO = z.infer<typeof ResetSchema>;