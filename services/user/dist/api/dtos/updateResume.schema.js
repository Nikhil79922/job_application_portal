import { z } from "zod";
const allowedDocMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_DOC_SIZE = 10 * 1024 * 1024;
export const updateResumeSchema = z
    .object({
    file: z
        .object({
        mimetype: z.string(),
        size: z.number(),
        originalname: z.string(),
    })
        .refine((file) => allowedDocMimeTypes.includes(file.mimetype), {
        message: "Invalid file type. Only PDF/DOC/DOCX allowed",
    })
        .refine((file) => file.size <= MAX_DOC_SIZE, {
        message: "File size must be less than 10MB",
    })
        .optional(),
    checkUpload: z.coerce.boolean(),
})
    .strict()
    .superRefine((data, ctx) => {
    if (data.checkUpload && data.file) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File should NOT be provided when checkUpload is true",
            path: ["file"],
        });
    }
    if (!data.checkUpload && !data.file) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File is required when checkUpload is false",
            path: ["file"],
        });
    }
});
export const updateResumeResponseDTO = z.object({
    user_id: z.number(),
    name: z.string(),
    resume: z.string(),
});
