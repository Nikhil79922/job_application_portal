// src/features/jobs/services/job-details.service.ts

import api from "@/services/axios"

import type {
  JobDetailsResponse,
} from "../types/job.types"

const jobDetailsService = {

  getDetails: async (
    jobId: number
  ): Promise<JobDetailsResponse> => {

    const response =
      await api.get<JobDetailsResponse>(
        `/job/public/details/${jobId}`
      )

    return response.data
  },
}

export default jobDetailsService