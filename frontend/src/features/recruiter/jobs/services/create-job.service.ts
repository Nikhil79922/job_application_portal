// src/features/jobs/services/job.service.ts

import api from "@/services/axios"

import type {
  CreateJobPayload,
  CreateJobResponse,
} from "../types/job.types"

const jobService = {

  create: async (
    payload: CreateJobPayload
  ): Promise<CreateJobResponse> => {

    const response =
      await api.post<CreateJobResponse>(
        "/job/new",
        payload
      )

    return response.data
  },
}

export default jobService