import api from "@/services/axios"

import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/types/api/response.types"

import {
  ResumeAnalyserResponse
} from "../types/resume-analysis.types"

const aiResumeAnalyserService = {

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

export default aiResumeAnalyserService