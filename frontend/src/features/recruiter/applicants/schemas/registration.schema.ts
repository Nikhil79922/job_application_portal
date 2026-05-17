import {
    z,
  } from "zod"
  
  export const registerSchema =
    z
  
      .object({
  
        /* NAME */
  
        name:
          z
            .string()
  
            .trim()
  
            .min(
              2,
              "Full name must be at least 2 characters long"
            )
  
            .max(
              50,
              "Full name cannot exceed 50 characters"
            )
  
            .regex(
              /^[a-zA-Z\s]+$/,
              "Full name can only contain letters and spaces"
            ),
  
        /* EMAIL */
  
        email:
          z
            .string()
  
            .trim()
  
            .min(
              1,
              "Email address is required"
            )
  
            .email(
              "Please enter a valid email address"
            )
  
            .max(
              100,
              "Email address is too long"
            ),
  
        /* PHONE */
  
        phoneNumber:
          z
            .string()
  
            .trim()
  
            .min(
              1,
              "Phone number is required"
            )
            .regex(
              /^[0-9]{10}$/,
              "Phone number must contain 10 digits"
            ),
  
        /* PASSWORD */
  
        password:
          z
            .string()
  
            .trim()
  
            .min(
              8,
              "Password must be at least 8 characters long"
            )
  
            .max(
              100,
              "Password is too long"
            )
  
            .regex(
              /[A-Z]/,
              "Password must include at least one uppercase letter"
            )
  
            .regex(
              /[a-z]/,
              "Password must include at least one lowercase letter"
            )
  
            .regex(
              /[0-9]/,
              "Password must include at least one number"
            )
  
            .regex(
              /[^A-Za-z0-9]/,
              "Password must include at least one special character"
            ),
  
        /* CONFIRM PASSWORD */
  
        confirmPassword:
          z
            .string()
  
            .trim()
  
            .min(
              1,
              "Please confirm your password"
            ),
  
        /* ROLE */
  
        role:
          z.enum(
            [
              "jobseeker",
              "recruiter",
            ],
            {
              message:
                "Please select an account type",
            }
          ),
  
        /* BIO */
  
        bio:
          z
            .string()
  
            .trim()
  
            .max(
              300,
              "Bio cannot exceed 300 characters"
            )
  
            .optional(),
  
        /* FILE */
  
        file:
          z
            .any()
  
            .optional(),
      })
  
      /* PASSWORD MATCH */
  
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