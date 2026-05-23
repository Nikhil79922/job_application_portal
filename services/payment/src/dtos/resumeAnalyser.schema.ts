import { z } from "zod";

export const resumeAnalyserSchema = z
  .object({
    pdfBase64: z
      .string()
      .min(10, "PDF data is required")
      .refine(
        (val) =>
          val.startsWith("data:application/pdf;base64,") ||
          /^[A-Za-z0-9+/=]+$/.test(val),
        {
          message: "Invalid PDF base64 format",
        }
      )
      .max(10 * 1024 * 1024, "PDF too large (max 10MB)"),
  })
  .strict();

export type ResumeAnalyserDTO = z.infer<typeof resumeAnalyserSchema>;