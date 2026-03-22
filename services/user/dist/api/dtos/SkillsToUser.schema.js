import { z } from "zod";
export const SkillsToUserSchema = z
    .object({
    skillName: z
        .string()
        .trim()
        .min(1, "Skill Name is required")
        .min(2, "Skill Name must be at least 2 characters")
        .max(100, " Skill Name is too long"),
});
