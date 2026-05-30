"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react"
import { toast } from "sonner"

import { useAuthStore } from "@/stores/auth.store"
import resumeService from "@/features/account/services/resume.service"
import profileImageService from "@/features/account/services/profileImage.service"

const INTERVAL = 3000
const MAX_ATTEMPTS = 6

export default function UploadPollingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const resumeTimer = useRef<NodeJS.Timeout | null>(null)
  const imageTimer = useRef<NodeJS.Timeout | null>(null)
  const resumeAttempts = useRef(0)
  const imageAttempts = useRef(0)

  /* ── resume polling ── */

  const stopResumePolling = () => {
    if (resumeTimer.current) {
      clearInterval(resumeTimer.current)
      resumeTimer.current = null
    }
    resumeAttempts.current = 0
  }

  const startResumePolling = () => {
    if (resumeTimer.current) return   // already running

    resumeTimer.current = setInterval(async () => {

      if (resumeAttempts.current >= MAX_ATTEMPTS) {
        stopResumePolling()
        const { user, accessToken, setAuth } = useAuthStore.getState()
        if (user) setAuth({ ...user, resume_upload_status: "fail" }, accessToken!)
        toast.error("Resume processing timed out. Please try uploading again.")
        return
      }

      resumeAttempts.current += 1

      try {
        const res = await resumeService.updateResume({ checkUpload: true })

        if (res.status === 202) return   // still processing

        if (res.status === 200 && res.data) {
          stopResumePolling()
          const { user, accessToken, setAuth } = useAuthStore.getState()
          setAuth(
            { ...user!, resume: res.data.resume, resume_upload_status: "success" },
            accessToken!
          )
          toast.success("Resume updated successfully")
        }
      } catch (err: any) {
        stopResumePolling()
        const { user, accessToken, setAuth } = useAuthStore.getState()
        if (user) setAuth({ ...user, resume_upload_status: "fail" }, accessToken!)
        toast.error(err?.response?.data?.message || err?.message || "Resume processing failed")
      }
    }, INTERVAL)
  }

  /* ── image polling ── */

  const stopImagePolling = () => {
    if (imageTimer.current) {
      clearInterval(imageTimer.current)
      imageTimer.current = null
    }
    imageAttempts.current = 0
  }

  const startImagePolling = () => {
    if (imageTimer.current) return   // already running

    imageTimer.current = setInterval(async () => {

      if (imageAttempts.current >= MAX_ATTEMPTS) {
        stopImagePolling()
        const { user, accessToken, setAuth } = useAuthStore.getState()
        if (user) setAuth({ ...user, profile_pic_upload_status: "fail" }, accessToken!)
        toast.error("Image processing timed out. Please try uploading again.")
        return
      }

      imageAttempts.current += 1

      try {
        const res = await profileImageService.updateProfileImage({ checkUpload: true })

        if (res.status === 202) return   // still processing

        if (res.status === 200 && res.data) {
          stopImagePolling()
          const { user, accessToken, setAuth } = useAuthStore.getState()
          setAuth(
            { ...user!, profile_pic: res.data.profile_pic, profile_pic_upload_status: "success" },
            accessToken!
          )
          toast.success("Profile image updated successfully")
        }
      } catch (err: any) {
        stopImagePolling()
        const { user, accessToken, setAuth } = useAuthStore.getState()
        if (user) setAuth({ ...user, profile_pic_upload_status: "fail" }, accessToken!)
        toast.error(err?.response?.data?.message || err?.message || "Image processing failed")
      }
    }, INTERVAL)
  }

  /* ── subscribe to store changes to start/stop polling ── */

  useEffect(() => {
    // Resume: restore on page refresh if still pending
    const { user } = useAuthStore.getState()
    if (user?.resume_upload_status === "pending") startResumePolling()

    // Image: never auto-start on mount — only starts when user actively uploads
    let prevImgStatus = user?.profile_pic_upload_status

    const unsub = useAuthStore.subscribe((state) => {
      const status = state.user?.resume_upload_status
      const imgStatus = state.user?.profile_pic_upload_status

      if (status === "pending") startResumePolling()
      else stopResumePolling()

      // Only start image polling on the transition TO pending (active upload)
      if (imgStatus === "pending" && prevImgStatus !== "pending") startImagePolling()
      else if (imgStatus !== "pending") stopImagePolling()

      prevImgStatus = imgStatus
    })

    return () => {
      unsub()
      stopResumePolling()
      stopImagePolling()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
