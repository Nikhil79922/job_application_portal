"use client"

import { useState, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import {
  Briefcase,
  Camera,
  Crown,
  Loader2,
  Pencil,
  Sparkles,
  User2,
  X,
  ZoomIn,
} from "lucide-react"

import { useUpdateProfileImage } from "../hooks/use-profileImage"
import type { MeUser } from "../types/me.types"
import { EditProfileModal } from "@/features/account/models/edit-profile-model"
import { useAuthStore } from "@/stores/auth.store"
import { Button } from "@/components/ui/button"
import { CropModal } from "../models/crop-model"

interface Props {
  user: MeUser
  completion : number
}

// ─── Profile Hero ──────────────────────────────────────────────────────────────
export default function ProfileHero({
  user:initialUser,
  completion:complete
}:Props){

  const liveUser=
    useAuthStore(
      (state)=>state.user
    )

  const user=liveUser||initialUser

  const { updateImage, isUploading, isProcessing, imageSrc } =
    useUpdateProfileImage()

  // The cropped version shown in the circle avatar
  const [croppedSrc, setCroppedSrc] = useState<string | null>(null)
  // Raw selected file — triggers crop modal
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [pendingDataUrl, setPendingDataUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // When a file is selected, open crop modal instead of uploading immediately
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPendingDataUrl(ev.target?.result as string)
      setPendingFile(file)
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  // After crop confirmed — upload original file but show cropped preview locally
  const handleCropConfirm = (croppedDataUrl: string) => {
    setCroppedSrc(croppedDataUrl)
    setPendingDataUrl(null)
    // Upload the original file to the server
    if (pendingFile) updateImage(pendingFile)
    setPendingFile(null)
  }

  const handleCropClose = () => {
    setPendingFile(null)
    setPendingDataUrl(null)
  }

  // Display priority: croppedSrc (local crop) → imageSrc (from hook/server)
  const displaySrc = croppedSrc ?? imageSrc

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        id="profile-upload"
        onChange={handleFileChange}
      />

      <div className="relative overflow-hidden rounded-[34px] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#111111]/90 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:px-6 lg:px-7">

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-cyan-500/[0.04]" />

        <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

          {/* LEFT */}
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">

            {/* AVATAR */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl" />

              {/* Avatar circle — clicking opens full preview modal */}
              <div
                className={`
                  group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-[6px] bg-slate-100 transition-all duration-300 dark:bg-zinc-900 sm:h-44 sm:w-44
                  ${isProcessing ? "border-yellow-400/60" : "border-emerald-500/20"}
                  ${displaySrc ? "cursor-pointer hover:scale-[1.02]" : ""}
                `}
                onClick={() => {
                  if (displaySrc) setIsPreviewOpen(true)
                }}
                title={displaySrc ? "Click to preview" : undefined}
              >
                {displaySrc ? (
                  <>
                    <Image
                      src={displaySrc}
                      alt={user.name}
                      fill
                      priority
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                      <ZoomIn className="h-7 w-7 text-white" />
                      <span className="text-[10px] font-semibold text-white">Preview</span>
                    </div>
                  </>
                ) : (
                  <User2 className="h-16 w-16 text-slate-400" />
                )}

                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                )}
              </div>

              {/* Camera Button */}
              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-2 z-20 cursor-pointer"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-600 dark:border-[#111111]">
                  <Camera className="h-5 w-5" />
                </div>
              </label>
            </div>

            {/* INFO */}
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-semibold text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Sparkles className="h-4 w-4" />
                Talent Forge Profile
              </div>

              <h1 className="mt-4 break-words text-[38px] font-black leading-none tracking-[-2px] text-slate-950 dark:text-white sm:text-[48px]">
                {user.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold capitalize text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                  <Briefcase className="h-4 w-4 text-emerald-500" />
                  {user.role}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  {user.subscription || "Free Plan"}
                </div>
                {isProcessing && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-300">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating Image
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — completion card */}
          <div className="w-full xl:max-w-[280px]">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                    Completion
                  </p>
                  <h2 className="mt-1 text-[38px] font-black leading-none tracking-[-3px] text-slate-950 dark:text-white">
                    {complete}%
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Active
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                  style={{ width: `${complete}%` }}
                />
              </div>

              <div className="mt-5 grid gap-3">
                <Button
                  onClick={() => setIsEditOpen(true)}
                  className="h-11 rounded-2xl bg-emerald-500 text-sm font-semibold text-white hover:bg-emerald-600">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>

                <label htmlFor="profile-upload" className="w-full">
                  <div
                    className={`
                      flex h-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-4 text-sm font-semibold transition-all duration-200 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]
                      ${isUploading || isProcessing ? "pointer-events-none opacity-70" : ""}
                    `}
                  >
                    {isUploading || isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        {user.profile_pic ? "Change Profile Image" : "Upload Profile Image"}
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL — portal so fixed pos works correctly */}
      {isPreviewOpen && displaySrc &&
        createPortal(
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 p-6 backdrop-blur-xl"
            onClick={() => setIsPreviewOpen(false)}
          >
            <div
              className="relative flex max-h-[90vh] max-w-lg w-full flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <Button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-white shadow-lg transition hover:bg-white/10"
              >
                <X className="h-4 w-4 shrink-0" />
              </Button>

              {/* Full image in circle */}
              <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-emerald-500/40 shadow-2xl sm:h-96 sm:w-96">
                <Image
                  src={displaySrc}
                  alt={user.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <p className="text-sm font-semibold text-white/60">{user.name}</p>

              {/* Action — re-upload */}
              <Button
                onClick={() => {
                  setIsPreviewOpen(false)
                  fileInputRef.current?.click()
                }}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Camera className="h-4 w-4" />
                Change Photo
              </Button>
            </div>
          </div>,
          document.body
        )}

      {/* CROP MODAL — portal at document.body escapes parent overflow/stacking */}
      {pendingDataUrl &&
        createPortal(
          <CropModal
            imageSrc={pendingDataUrl}
            userName={user.name}
            onConfirm={handleCropConfirm}
            onClose={handleCropClose}
          />,
          document.body
        )}

      {/* EDIT PROFILE MODAL */}
      {isEditOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </> 
  )
}