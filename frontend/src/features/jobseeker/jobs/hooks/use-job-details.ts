// src/features/jobs/hooks/use-job-details.ts
"use client"

import {
  useQuery,
} from "@tanstack/react-query"

import jobDetailsService from "../services/job-details.service"

export const useJobDetails = (
  jobId: number | null,
  enabled: boolean
) => {

  return useQuery({

    queryKey: [
      "job-details",
      jobId,
    ],

    enabled:
      enabled && !!jobId,

    queryFn: async () => {

      const response =
        await jobDetailsService.getDetails(
          jobId as number
        )

      // IMPORTANT
      // return ONLY inner job object

      return response.data
    },
  })
}