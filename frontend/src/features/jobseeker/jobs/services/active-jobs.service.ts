// src/features/jobs/services/active-jobs.service.ts

import api from "@/services/axios"

import type {
  ActiveJobsResponse,
} from "../types/job.types"

const activeJobsService = {

  getAll: async (): Promise<ActiveJobsResponse> => {

    const response =
      await api.get<ActiveJobsResponse>(
        "/job/public/activeJobs"
      )

    return response.data
  },
}

export default activeJobsService