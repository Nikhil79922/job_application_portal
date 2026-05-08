import api from "./axios"

import {
  CareerGuidanceResponse,
} from "@/types/utils/AIservice.types"

const aiService = {

  /* -------------------------------- */
  /* CAREER GUIDE */
  /* -------------------------------- */

  generateCareerGuide: async (
    skills: string[]
  ): Promise<CareerGuidanceResponse> => {

    const response =
      await api.post(
        "/utils/ai/career",
        { skills }
      )
console.log("Response ====>",response)
    return response.data
  },

  /* -------------------------------- */
  /* RESUME ANALYSER */
  /* -------------------------------- */

  analyseResume: async (
    pdfBase64: string
  ) => {

    const response =
      await api.post(
        "/resume-analyser",
        { pdfBase64 }
      )

    return response.data.data
  },
}

export default aiService