"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import applyJobService from "../services/apply-job.service"

export const useApplyJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (jobId: number) =>applyJobService.apply({jobId}),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      })
    },
  })
}