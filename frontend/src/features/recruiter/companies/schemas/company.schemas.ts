import { z } from "zod"

const MAX_FILE_BYTES = 5 * 1024 * 1024 // 5 MB

const ACCEPTED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
] as const

export const createCompanySchema = z.object({
  name: z
    .string({ message: "Company name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  description: z
    .string({ message: "Description is required" })
    .min(1, "Description is required")
    .max(1000, "Description is too long"),

  website: z
    .string({ message: "Website is required" })
    .url("Invalid website URL")
    .max(500, "Website is too long"),

  file: z
    .instanceof(File)
    .refine(f => f.size <= MAX_FILE_BYTES, "File too large (5MB max)")
    .refine(
      f => (ACCEPTED_MIME as readonly string[]).includes(f.type),
      "Only PNG, JPEG, JPG, or WEBP files allowed",
    ),
})

export type CreateCompanyFormValues = z.infer<typeof createCompanySchema>


export const deleteCompanySchema = z.object({
    companyId: z
      .number({
        message: "Company ID is required",
      })
      .int("Company ID must be an integer")
      .positive("Company ID must be positive")
      .max(
        1_000_000_000,
        "Company ID too large"
      ),
  })

export type DeleteCompanyFormValues = z.infer<typeof deleteCompanySchema>
