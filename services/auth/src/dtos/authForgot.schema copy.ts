import { z } from "zod";

export const forgotSchema = z
  .object({
    email: z.any(),
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
  });

//Interface
 export interface jwtPayload{
  userId: string,
 } 
// DTO
export type forgotDTO = z.infer<typeof forgotSchema>;
