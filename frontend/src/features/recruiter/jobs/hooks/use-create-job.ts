"use client"

// src/features/jobs/hooks/use-create-job.ts

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import {
  toast,
} from "sonner"

import jobService from "../services/create-job.service"

import type {
  ApiErrorResponse,
} from "@/types/api/response.types"

export const useCreateJob =
  () => {

    const queryClient =
      useQueryClient()

    return useMutation({

      mutationFn:
        jobService.create,

      onSuccess: (
        response
      ) => {

        toast.success(
          response.message ||
          "Job created successfully"
        )

        queryClient.invalidateQueries({
          queryKey: ["jobs"],
        })
      },

      onError: (
        error:
          ApiErrorResponse
      ) => {

        toast.error(
          error.message ||
          "Failed to create job"
        )
      },
    })
  }