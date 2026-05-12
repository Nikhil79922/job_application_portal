import { z } from "zod"

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters"),

        email: z
            .string()
            .trim()
            .email("Invalid email address"),

        phoneNumber: z
            .string()
            .trim()
            .regex(/^[0-9]{10,15}$/, "Invalid phone number"),

        password: z
            .string()
            .trim()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "One uppercase letter required")
            .regex(/[a-z]/, "One lowercase letter required")
            .regex(/[0-9]/, "One number required")
            .regex(/[^A-Za-z0-9]/, "One special character required"),

        confirmPassword:
            z.string(),

        role: z.enum([
            "jobseeker",
            "recruiter",
        ]),

        bio: z.string().optional(),

        file: z.any().optional(),
    })

    .refine(
        (data) =>
            data.password ===
            data.confirmPassword,
        {
            path: [
                "confirmPassword",
            ],

            message:
                "Passwords do not match",
        }
    )

    export type RegisterSchema =
    z.infer<
        typeof registerSchema
    >