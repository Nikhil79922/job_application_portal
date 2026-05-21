// src/features/jobs/hooks/use-update-job.ts

"use client"

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import {
  toast,
} from "sonner"

import jobService from "../services/update-job.services"

import type {
  ApiErrorResponse,
} from "@/types/api/response.types"

export const useUpdateJob =
  () => {

    const queryClient =
      useQueryClient()

    return useMutation({

      mutationFn:
        jobService.update,

      onSuccess: (
        response
      ) => {

        toast.success(
          response.message ||
          "Job updated successfully"
        )

        queryClient.invalidateQueries({
          queryKey: ["jobs"],
        })

        queryClient.invalidateQueries({
          queryKey: [
            "job-details",
            response.data.job_id,
          ],
        })
      },

      onError: (
        error:
          ApiErrorResponse
      ) => {

        toast.error(
          error.message ||
          "Failed to update job"
        )
      },
    })
  }