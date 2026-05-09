import api from "./axios"

import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/types/api/response.types"

import {
  CareerGuidanceResponse,
  ResumeAnalyserResponse,
} from "@/types/utils/AIservice.types"

const aiService = {

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

  analyseResume: async (
    pdfBase64: string
  ): Promise<
    ResumeAnalyserResponse
  > => {

    try {
      const response =await api.post<ApiSuccessResponse<ResumeAnalyserResponse>>(
          "/utils/ai/resume-analyser",
          { pdfBase64 }
        )

      return response.data.data

    } catch (error) {

      const err =
        error as ApiErrorResponse

      throw {
        success: false,

        message:
          err.message ||
          "Failed to analyse resume.",
      } satisfies ApiErrorResponse
    }
  },
}

export default aiService