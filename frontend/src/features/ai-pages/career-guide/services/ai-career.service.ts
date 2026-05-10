import api from "@/services/axios"

import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/types/api/response.types"

import {
  CareerGuidanceResponse,
} from "../types/ai-career.types"

const aiCareerGuideService = {

  generateCareerGuide: async (
    skills: string[]
  ): Promise<
    CareerGuidanceResponse
  > => {

    try {

      const response =
        await api.post<
          ApiSuccessResponse<
            CareerGuidanceResponse
          >
        >(
          "/utils/ai/career",
          { skills }
        )

      return response.data.data

    } catch (error) {

      const err =
        error as ApiErrorResponse

      throw {
        success: false,

        message:
          err.message ||
          "Failed to generate career guide.",
      } satisfies ApiErrorResponse
    }
  },
}

export default aiCareerGuideService