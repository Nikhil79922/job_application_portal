import { z } from "zod";

/* reuse your helpers */
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

/* enum aligned with DB */
const applicationStatusEnum = z.enum([
  "Submitted",
  "Rejected",
  "Hired",
]);

export const updateApplicationSchema = z
  .object({
    application_id: idField("Application ID"),
    status: applicationStatusEnum,
  })
  .strict()
  .superRefine((data, ctx) => {
    // ensure only status is being updated (like your requirement)
    const allowedKeys = ["application_id", "status"];

    const extraKeys = Object.keys(data).filter(
      (key) => !allowedKeys.includes(key)
    );

    if (extraKeys.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only 'status' field is allowed for update",
      });
    }
  });

export type UpdateApplicationDTO = z.infer<typeof updateApplicationSchema>;