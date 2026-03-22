import { z } from "zod";
export const updateResumeSchema = z
    .object({
    file: z.any().optional(),
});
export const updateResumeResponseDTO = z.object({
    user_id: z.number(),
    name: z.string(),
    resume: z.string(),
});
