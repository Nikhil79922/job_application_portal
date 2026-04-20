import { z } from "zod";

const numberField = (field: string) =>
  z.coerce
    .number()
    .refine((val) => !Number.isNaN(val) && Number.isFinite(val), {
      message: `${field} must be a valid number`,
    });

const idField = (field: string) =>
  numberField(field)
    .int(`${field} must be an integer`)
    .positive(`${field} must be positive`)
    .max(1_000_000_000, `${field} is too large`);

const safeTextRegex = /^[\w\s.,\-()&/#+:'@]+$/;
const locationRegex = /^[a-zA-Z0-9\s,.-]+$/;

const jobTypeEnum = z.enum([
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
]);

const workLocationEnum = z.enum([
  "On-site",
  "Remote",
  "Hybrid",
]);

const baseJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title too long")
    .regex(safeTextRegex, "Invalid characters in title")
    .refine((val) => !/^\d+$/.test(val), {
      message: "Title cannot be only numbers",
    }),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(5000, "Description too long")
    .regex(safeTextRegex, "Invalid characters in description"),

  salary: numberField("Salary")
    .positive("Salary must be greater than 0")
    .max(1_000_000_000, "Salary too large"),

  location: z
    .string()
    .trim()
    .min(2, "Location is required")
    .max(500, "Location too long")
    .regex(locationRegex, "Invalid characters in location"),

  job_type: jobTypeEnum,
  work_location: workLocationEnum,

  openings: numberField("Openings")
    .int("Openings must be an integer")
    .min(1, "At least 1 opening required")
    .max(10000, "Too many openings"),

  role: z
    .string()
    .trim()
    .min(2, "Role is required")
    .max(255, "Role too long")
    .regex(safeTextRegex, "Invalid characters in role"),

  company_id: idField("Company ID"),

  is_active: z.boolean(),
});


export const updateJobSchema = baseJobSchema
  .partial() 
  .extend({
    job_id: idField("Job ID"), 
  })
  .strict()
  .superRefine((data, ctx) => {
    const { job_id, ...rest } = data;
    if (Object.keys(rest).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one field must be provided for update",
      });
    }

    if (data.salary !== undefined && data.salary < 1000) {
      ctx.addIssue({
        path: ["salary"],
        code: z.ZodIssueCode.custom,
        message: "Salary seems unrealistically low",
      });
    }

    if (
      data.salary !== undefined &&
      data.openings !== undefined &&
      data.salary / data.openings < 500
    ) {
      ctx.addIssue({
        path: ["salary"],
        code: z.ZodIssueCode.custom,
        message: "Salary per opening is too low",
      });
    }

    if (
      data.work_location === "Remote" &&
      data.location !== undefined &&
      data.location.length > 100
    ) {
      ctx.addIssue({
        path: ["location"],
        code: z.ZodIssueCode.custom,
        message: "Remote jobs should not have overly specific location",
      });
    }

    if (data.title && /^(.)\1+$/.test(data.title)) {
      ctx.addIssue({
        path: ["title"],
        code: z.ZodIssueCode.custom,
        message: "Invalid repetitive title",
      });
    }
  });

export type UpdateJobDTO = z.infer<typeof updateJobSchema>;