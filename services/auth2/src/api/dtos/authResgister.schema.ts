import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.any(),
    email: z.any(),
    password: z.any(),
    phoneNumber: z.any(),
    role: z.any(),

    bio: z.any().optional(),
    file: z.any().optional(),
    resumePublicId: z.any().optional(),
  })
  .strict() // THIS IS THE UPDATE
  .superRefine((data, ctx) => {
    if (data.name === undefined) {
      ctx.addIssue({
        path: ["name"],
        message: "Missing field: name is required",
        code: z.ZodIssueCode.custom,
      });
    } else if (typeof data.name !== "string") {
      ctx.addIssue({
        path: ["name"],
        message: "Invalid data type: name must be a string",
        code: z.ZodIssueCode.custom,
      });
    }

    // 🔴 EMAIL
    if (data.email === undefined) {
      ctx.addIssue({
        path: ["email"],
        message: "Missing field: email is required",
        code: z.ZodIssueCode.custom,
      });
    } else if (typeof data.email !== "string") {
      ctx.addIssue({
        path: ["email"],
        message: "Invalid data type: email must be a string",
        code: z.ZodIssueCode.custom,
      });
    }

    // 🔴 PASSWORD
    if (data.password === undefined) {
      ctx.addIssue({
        path: ["password"],
        message: "Missing field: password is required",
        code: z.ZodIssueCode.custom,
      });
    } else if (typeof data.password !== "string") {
      ctx.addIssue({
        path: ["password"],
        message: "Invalid data type: password must be a string",
        code: z.ZodIssueCode.custom,
      });
    } else if (data.password.length < 8) {
      ctx.addIssue({
        path: ["password"],
        message: "Invalid value: password must be at least 8 characters",
        code: z.ZodIssueCode.custom,
      });
    }

    // 🔴 PHONE NUMBER
    if (data.phoneNumber === undefined) {
      ctx.addIssue({
        path: ["phoneNumber"],
        message: "Missing field: phoneNumber is required",
        code: z.ZodIssueCode.custom,
      });
    } else if (typeof data.phoneNumber !== "string") {
      ctx.addIssue({
        path: ["phoneNumber"],
        message: "Invalid data type: phoneNumber must be a string",
        code: z.ZodIssueCode.custom,
      });
    }

    // 🔴 ROLE
    if (data.role === undefined) {
      ctx.addIssue({
        path: ["role"],
        message: "Missing field: role is required",
        code: z.ZodIssueCode.custom,
      });
    } else if (typeof data.role !== "string") {
      ctx.addIssue({
        path: ["role"],
        message: "Invalid data type: role must be a string",
        code: z.ZodIssueCode.custom,
      });
    } else if (!["jobseeker", "recruiter"].includes(data.role)) {
      ctx.addIssue({
        path: ["role"],
        message: "Invalid value: role must be jobseeker or recruiter",
        code: z.ZodIssueCode.custom,
      });
    }

    // 🔥 JOBSEEKER-SPECIFIC RULES
    if (data.role === "jobseeker") {
      if (!data.bio) {
        ctx.addIssue({
          path: ["bio"],
          message: "Missing field: bio is required for jobseeker",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.file) {
        ctx.addIssue({
          path: ["file"],
          message: "Missing field: file is required for jobseeker",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

// DTO
export type RegisterDTO = z.infer<typeof registerSchema>;
