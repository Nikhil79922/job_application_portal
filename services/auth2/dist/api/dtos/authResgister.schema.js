import { z } from "zod";
export const registerSchema = z
    .object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),
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
    phoneNumber: z
        .string()
        .trim()
        .min(1, "Phone number is required")
        .regex(/^[0-9]{10,15}$/, "Invalid phone number"),
    role: z.enum(["jobseeker", "recruiter"]),
    bio: z
        .string()
        .trim()
        .max(500, "Bio must be less than 500 characters")
        .optional(),
    file: z.any().optional(),
    resumePublicId: z.string().optional(),
})
    .strict()
    .superRefine((data, ctx) => {
    if (data.role === "jobseeker") {
        if (!data.bio) {
            ctx.addIssue({
                path: ["bio"],
                code: z.ZodIssueCode.custom,
                message: "Bio is required for jobseekers",
            });
        }
        if (!data.file) {
            ctx.addIssue({
                path: ["file"],
                code: z.ZodIssueCode.custom,
                message: "Resume file is required for jobseekers",
            });
        }
    }
});
