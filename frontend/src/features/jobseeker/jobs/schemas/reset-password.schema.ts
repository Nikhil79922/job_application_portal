import { z } from "zod"

export const resetPasswordSchema =
  z.object({

    password: z
      .string()
      .trim()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .regex(
        /[A-Z]/,
        "One uppercase letter required"
      )
      .regex(
        /[a-z]/,
        "One lowercase letter required"
      )
      .regex(
        /[0-9]/,
        "One number required"
      )
      .regex(
        /[^A-Za-z0-9]/,
        "One special character required"
      ),

    confirmPassword:
      z.string(),
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

export type ResetPasswordSchema =
  z.infer<
    typeof resetPasswordSchema
  >