"use client"

import {
  useMutation,
} from "@tanstack/react-query"

import applyJobService from "../services/apply-job.service"

export const useApplyJob =
  () => {

    return useMutation({
retry:false,
      mutationFn: (
        jobId: number
      ) => {

        return applyJobService.apply({
          jobId,
        })
      },
    })
  }