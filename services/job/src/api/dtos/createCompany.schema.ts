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
})
.strict();

export type createCompanyDTO = z.infer<typeof createCompanySchema>;
