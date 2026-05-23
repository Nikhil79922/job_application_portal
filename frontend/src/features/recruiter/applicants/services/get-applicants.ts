import axios from "@/services/axios"

import type {
  ApplicantsResponse,
} from "../types/applicant.types"

export const getApplicants =
  async (
    jobId: number
  ) => {

    const response =
      await axios.get<ApplicantsResponse>(
        `/job/applications/${jobId}`
      )

    return response.data.data
  }