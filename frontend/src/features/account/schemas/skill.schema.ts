import {z} from "zod"
  
  export const SkillsToUserSchema =
    z.object({
      skillName:
        z.string()
        .trim()
          .min(
            1,
            "Skill name is required"
          )
          .min(
            2,
            "Skill name must be at least 2 characters"
          )
          .max(
            100,
            "Skill name is too long"
          )
          .regex(
            /^[a-zA-Z0-9\s+#.-]+$/,
            "Invalid skill name"
          ),
    })
  
  export type SkillsToUserDTO = z.infer<typeof SkillsToUserSchema>