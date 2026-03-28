import { z } from "zod";

// Allowed file types
const allowedImageMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const updateProfilePicSchema = z
  .object({
    file: z
      .object({
        mimetype: z.string(),
        size: z.number(),
        originalname: z.string(),
      })
      .refine((file) => allowedImageMimeTypes.includes(file.mimetype), {
        message: "Invalid file type. Only JPEG, PNG, WEBP allowed",
      })
      .refine((file) => file.size <= MAX_IMAGE_SIZE, {
        message: "File size must be less than 5MB",
      })
      .optional(),

    checkUpload: z.coerce.boolean(),
  })
  .strict()
  .superRefine((data, ctx) => {
    //  If checkUpload = true → file NOT allowed
    if (data.checkUpload && data.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "File should NOT be provided when checkUpload is true",
        path: ["file"],
      });
    }

    // ✅ If checkUpload = false → file required
    if (!data.checkUpload && !data.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "File is required when checkUpload is false",
        path: ["file"],
      });
    }
  });

export type updateProfilePicDTO = z.infer<typeof updateProfilePicSchema>;

export const updateProfilePicResponseDTO = z.object({
  user_id: z.number(),
  name: z.string(),
  profile_pic: z.string(),
});