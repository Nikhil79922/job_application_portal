/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import profileImageService from "../services/profileImage.service"
import { useAuthStore } from "@/stores/auth.store"

export const useUpdateProfileImage = () => {

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const confirmedImage =
    useAuthStore((s) => s.user?.profile_pic) ?? null

  const uploadStatus =
    useAuthStore((s) => s.user?.profile_pic_upload_status)

  const [forceStopProcessing, setForceStopProcessing] =
    useState(false)

  const uploadedThisSession = useRef(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isProcessing =
    uploadStatus === "pending" &&
    !forceStopProcessing &&
    uploadedThisSession.current

  const imageSrc = useMemo(
    () => previewUrl || confirmedImage || null,
    [previewUrl, confirmedImage]
  )

  // Clear stale "pending" status on mount
  useEffect(() => {
    const { user, accessToken, setAuth } = useAuthStore.getState()
    if (user?.profile_pic_upload_status === "pending") {
      setAuth({ ...user, profile_pic_upload_status: undefined }, accessToken!)
    }
  }, [])

  // Cleanup object URLs and timers on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [previewUrl])

  // Safety timeout: stop spinner if stuck in pending > 30s
  useEffect(() => {
    if (uploadStatus !== "pending") {
      setForceStopProcessing(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    timeoutRef.current = setTimeout(() => {
      console.warn("Profile image stuck in pending state. Stopping loader.")
      setForceStopProcessing(true)
    }, 30000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [uploadStatus])

  // Clear preview once the background job resolves
  useEffect(() => {
    if (!previewUrl) return

    const unsubscribe = useAuthStore.subscribe((state) => {
      const status = state.user?.profile_pic_upload_status

      if (status === "success" || status === "fail") {
        requestAnimationFrame(() => {
          setPreviewUrl(null)
          setForceStopProcessing(false)
          uploadedThisSession.current = false
        })
      }
    })

    return unsubscribe
  }, [previewUrl])

  const mutation = useMutation({
    retry: false,

    mutationFn: (file: File) =>
      profileImageService.updateProfileImage({ file, checkUpload: false }),

    onMutate: async (file) => {
      uploadedThisSession.current = true
      setForceStopProcessing(false)

      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(URL.createObjectURL(file))

      const { user, accessToken, setAuth } = useAuthStore.getState()
      if (user) {
        setAuth({ ...user, profile_pic_upload_status: "pending" }, accessToken!)
      }
    },

    onSuccess: () => {
      toast.success("Image upload started — processing in background")
    },

    onError: (error: any) => {
      setPreviewUrl(null)
      uploadedThisSession.current = false

      const { user, accessToken, setAuth } = useAuthStore.getState()
      if (user) {
        setAuth({ ...user, profile_pic_upload_status: "fail" }, accessToken!)
      }

      setForceStopProcessing(false)

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Upload failed"
      )
    },
  })

  return {
    updateImage: mutation.mutate,
    isUploading: mutation.isPending,
    isProcessing,
    previewUrl,
    imageSrc,
  }
}