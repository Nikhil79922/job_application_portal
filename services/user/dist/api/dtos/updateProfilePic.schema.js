import { z } from "zod";
export const updateProfilePicSchema = z
    .object({
    file: z.any().optional(),
});
export const updateProfilePicResponseDTO = z.object({
    user_id: z.number(),
    name: z.string(),
    profile_pic: z.string(),
});
