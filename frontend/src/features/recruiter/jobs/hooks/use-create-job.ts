"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import jobService from "../services/create-job.service"
import type { ApiErrorResponse } from "@/types/api/response.types"

export const useCreateJob = (companyId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: jobService.create,

    onSuccess: (response) => {
      toast.success(response.message || "Job created successfully")

      queryClient.invalidateQueries({ queryKey: ["jobs"] })

      // ✅ this is what refreshes the job list on the page
      if (companyId) {
        queryClient.invalidateQueries({ queryKey: ["company-detail", companyId] })
      }
    },

    onError: (error: ApiErrorResponse) => {
      toast.error(error.message || "Failed to create job")
    },
  })
}