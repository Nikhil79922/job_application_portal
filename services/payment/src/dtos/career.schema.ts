import { z } from "zod";

export const updateSkillsSchema = z
  .object({
    skills: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Skill cannot be empty")
          .max(50, "Skill too long")
      )
      .min(1, "At least one skill is required")
      .max(50, "Too many skills"),
  })
  .strict();

export type UpdateSkillsDTO = z.infer<typeof updateSkillsSchema>;