import { z } from "zod";

export const createCompanySchema = z
.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description is too long"),

  website: z
    .string()
    .url("Invalid website URL")
    .max(500, "Website is too long"),

    file: z.object({
        buffer: z.instanceof(Buffer),
      mimetype: z.string().refine(
        (type) => ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(type),
        "Invalid file type"
      ),
      size: z.number().max(5 * 1024 * 1024, "File too large (2MB max)"),
      originalname: z.string().min(1),
    })
})
.strict();

export type createCompanyDTO = z.infer<typeof createCompanySchema>;
