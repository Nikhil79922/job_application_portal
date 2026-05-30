/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import resumeService from "../services/resume.service"
import { useAuthStore } from "@/stores/auth.store"

export const useUpdateResume = () => {

  const [isUploading, setIsUploading] = useState(false)

  const mutation = useMutation({

    retry: false,

    mutationFn: (file: File) =>
      resumeService.updateResume({ file, checkUpload: false }),

    onMutate: () => {
      setIsUploading(true)
      const { user, accessToken, setAuth } = useAuthStore.getState()
      if (user) setAuth({ ...user, resume_upload_status: "pending" }, accessToken!)
    },

    onSuccess: () => {
      setIsUploading(false)
      toast.success("Resume upload started — processing in background")
      // UploadPollingProvider picks up the 'pending' status automatically
    },

    onError: (error: any) => {
      setIsUploading(false)
      const { user, accessToken, setAuth } = useAuthStore.getState()
      if (user) setAuth({ ...user, resume_upload_status: "fail" }, accessToken!)
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Resume upload failed"
      )
    },
  })

  return {
    updateResume: mutation.mutate,
    isUploading,
  }
}
