import api from "@/services/axios"

import type {
  SkillPayload,
  SkillResponse,
} from "../types/skill.types"

const skillService = {

  addSkill: async (
    payload: SkillPayload
  ): Promise<SkillResponse> => {

    const response =
      await api.post<
        SkillResponse
      >(
        "/user/skill/add",
        payload
      )

    return response.data
  },

  deleteSkill: async (
    payload: SkillPayload
  ): Promise<SkillResponse> => {

    const response =
      await api.delete<
        SkillResponse
      >(
        "/user/skill/delete",
        {
          data: payload,
        }
      )

    return response.data
  },
}

export default skillService