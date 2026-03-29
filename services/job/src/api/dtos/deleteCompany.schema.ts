import { z } from "zod";

export const deleteCompanySchema = z
  .object({
    companyId: z
      .coerce.number()
      .int()
      .min(1, "companyId must be greater than 0"),
  })
  .strict();

export type deleteCompanyDTO = z.infer<typeof deleteCompanySchema>;