import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.any(),
    password: z.any(),
  })
  .strict() // THIS IS THE UPDATE
  .superRefine((data, ctx) => {
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
  });

//Interface
 export interface jwtPayload{
  userId?: string,
  email?:string,
  type?:string
 } 
// DTO
export type LoginDTO = z.infer<typeof loginSchema>;
