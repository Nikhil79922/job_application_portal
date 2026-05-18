// src/features/jobs/hooks/use-active-jobs.ts

"use client"

import {
  useQuery,
} from "@tanstack/react-query"

import activeJobsService from "../services/active-jobs.service"

export const useActiveJobs = () => {

  return useQuery({

    queryKey: [
      "active-jobs",
    ],

    queryFn: async () => {

      const response =
        await activeJobsService.getAll()

      return response.data
    },

    staleTime:
      1000 * 60 * 5,
  })
}