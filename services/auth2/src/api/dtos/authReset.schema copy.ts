import { z } from "zod";

export const ResetSchema = z
  .object({
    password: z.any(),
    token: z.string(),
  })
  .strict() // THIS IS THE UPDATE
  .superRefine((data, ctx) => {

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
  });

// DTO
export type ResetDTO = z.infer<typeof ResetSchema>;
