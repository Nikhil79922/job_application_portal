/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  ShieldCheck,
  UploadCloud,
  XCircle,
  X,
  Sparkles,
  Eye,
  RefreshCw,
  FileBadge,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useUpdateResume } from "../hooks/use-resume"
import { useAuthStore } from "@/stores/auth.store"
import type { MeUser } from "../types/me.types"

interface Props {
  user: MeUser
}

// ─── Upload phase label cycle ──────────────────────────────────────────────────

const PHASES = [
  "Uploading file…",
  "Verifying format…",
  "Running ATS check…",
  "Securing storage…",
  "Almost done…",
]

function usePhaseLabel(active: boolean) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!active) { setIdx(0); return }
    const id = setInterval(() => setIdx((i) => (i + 1) % PHASES.length), 1800)
    return () => clearInterval(id)
  }, [active])
  return PHASES[idx]
}

// ─── Animated progress bar ────────────────────────────────────────────────────

function ProgressBar({ active }: { active: boolean }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    if (!active) { setPct(0); return }
    // Fast to 70, then crawl until done
    const id = setInterval(() => {
      setPct((p) => {
        if (p < 70) return p + 4
        if (p < 92) return p + 0.4
        return p
      })
    }, 80)
    return () => clearInterval(id)
  }, [active])

  return (
    <div className="absolute inset-x-0 top-0 h-[3px] overflow-hidden rounded-t-[30px] bg-violet-500/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-400 transition-all duration-200 ease-out"
        style={{ width: active ? `${pct}%` : "0%" }}
      />
      {/* shimmer */}
      {active && (
        <div className="absolute inset-y-0 w-24 animate-[shimmer_1.2s_linear_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      )}
    </div>
  )
}

// ─── Status chip ──────────────────────────────────────────────────────────────

function StatusChip({
  status,
  isPending,
}: {
  status: string | undefined
  isPending: boolean
}) {
  if (isPending) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
        </span>
        Processing
      </div>
    )
  }
  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Verified
      </div>
    )
  }
  if (status === "fail") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
        <XCircle className="h-3.5 w-3.5" />
        Failed
      </div>
    )
  }
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400">
      <Clock3 className="h-3.5 w-3.5" />
      Pending
    </div>
  )
}

// ─── View Resume modal ────────────────────────────────────────────────────────

function ResumePreviewModal({
  url,
  onClose,
}: {
  url: string
  onClose: () => void
}) {
  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0f] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Professional Resume</p>
              <p className="text-[11px] text-zinc-500">ATS Verified · Secure</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
            <Button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            >
              <X className="h-4 w-4 shrink-0" />
            </Button>
          </div>
        </div>
        {/* PDF iframe */}
        <div className="flex-1 overflow-hidden bg-zinc-950">
          <iframe
            src={`${url}#toolbar=0&navpanes=0`}
            className="h-full w-full"
            title="Resume Preview"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfileResume({ user }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const latestResume =
    useAuthStore((state) => state.user?.resume) || user.resume

  const latestResumeStatus =
    useAuthStore((state) => state.user?.resume_upload_status) ||
    user.resume_upload_status

  const { updateResume, isUploading, isProcessing } = useUpdateResume()

  const isPending =
    isUploading || isProcessing || latestResumeStatus === "pending"

  const phaseLabel = usePhaseLabel(isPending)

  if (user.role !== "jobseeker") return null

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    updateResume(file)
    e.target.value = ""
  }

  const hasResume = !!latestResume
  const isVerified = latestResumeStatus === "success"
  const isFailed = latestResumeStatus === "fail"

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(600%); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-in { animation: fadeSlideUp 0.35s ease both; }
      `}</style>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        hidden
        id="resume-upload"
        type="file"
        accept=".pdf"
        onChange={handleFile}
      />

      <div className="space-y-5">

        {/* ── Section header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">
              Resume
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Manage your professional resume for recruiter visibility and AI matching.
            </p>
          </div>
          <StatusChip status={latestResumeStatus} isPending={isPending} />
        </div>

        {/* ── Main card ── */}
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[#111111]">

          <ProgressBar active={isPending} />

          <div className="p-6">

            {/* Top row */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

              {/* Left — icon + copy */}
              <div className="flex items-start gap-4">
                <div
                  className={`
                    relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl transition-all duration-500
                    ${isPending
                      ? "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                      : isVerified
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : isFailed
                          ? "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                          : "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                    }
                  `}
                >
                  {isPending ? (
                    <RefreshCw className="h-7 w-7 animate-spin" />
                  ) : isVerified ? (
                    <FileBadge className="h-7 w-7" />
                  ) : isFailed ? (
                    <AlertTriangle className="h-7 w-7" />
                  ) : (
                    <FileText className="h-7 w-7" />
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-black tracking-[-0.7px] text-slate-950 dark:text-white">
                    Professional Resume
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 dark:text-zinc-400">
                    Upload an ATS-optimised resume to improve recruiter reach,
                    automated profile ranking, and job recommendations.
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["PDF", "Max 10 MB", "Secure Storage", "ATS Optimised"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right — actions */}
              <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">

                {/* View */}
                {hasResume && isVerified && (
                  <Button
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:hover:bg-white/[0.07]"
                  >
                    <Eye className="h-4 w-4" />
                    View Resume
                  </Button>
                )}

                {/* Download */}
                {hasResume && isVerified && (
                  <a
                    href={latestResume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:hover:bg-white/[0.07]"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                )}

                {/* Upload / Replace */}
                <label htmlFor="resume-upload" className="w-full sm:w-auto lg:w-full">
                  <div
                    className={`
                      relative flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 text-sm font-semibold text-white transition-all
                      ${isPending
                        ? "pointer-events-none bg-violet-600/80"
                        : "bg-violet-500 hover:bg-violet-600 active:scale-[0.98]"
                      }
                    `}
                  >
                    {isPending && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-y-0 w-32 animate-[shimmer_1.4s_linear_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      </div>
                    )}
                    <div className="relative z-10 flex items-center gap-2">
                      {isPending ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          {phaseLabel}
                        </>
                      ) : (
                        <>
                          <UploadCloud className="h-4 w-4" />
                          {hasResume ? "Replace Resume" : "Upload Resume"}
                        </>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* ── Processing banner ── */}
            {isPending && (
              <div className="anim-in mt-6 overflow-hidden rounded-[24px] border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50/50 p-5 dark:border-violet-500/10 dark:from-violet-500/[0.07] dark:to-fuchsia-500/[0.04]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black tracking-[-0.4px] text-violet-900 dark:text-violet-200">
                        Resume Processing
                      </h4>
                      <span className="text-[11px] font-semibold text-violet-500 dark:text-violet-400">
                        {phaseLabel}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-violet-700 dark:text-violet-300/70">
                      Your resume is being uploaded, ATS-verified, and securely
                      processed. This usually completes within a few seconds.
                    </p>
                    {/* Mini step dots */}
                    <div className="mt-4 flex items-center gap-2">
                      {PHASES.map((p, i) => {
                        const activeIdx = PHASES.indexOf(phaseLabel)
                        return (
                          <div
                            key={p}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              i <= activeIdx
                                ? "w-6 bg-violet-500"
                                : "w-1.5 bg-violet-200 dark:bg-violet-500/20"
                            }`}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Error banner ── */}
            {isFailed && !isPending && (
              <div className="anim-in mt-6 rounded-[24px] border border-red-200 bg-red-50/70 p-5 dark:border-red-500/10 dark:bg-red-500/[0.05]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-black tracking-[-0.4px] text-red-900 dark:text-red-300">
                      Resume Upload Failed
                    </h4>
                    <p className="mt-1.5 text-sm leading-6 text-red-700 dark:text-red-200/70">
                      We couldn't process your resume. Please upload a valid PDF,
                      DOC, or DOCX file under 5 MB and try again.
                    </p>
                    <label htmlFor="resume-upload">
                      <div className="mt-4 inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl bg-red-100 px-4 text-xs font-semibold text-red-700 transition hover:bg-red-200 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20">
                        <UploadCloud className="h-3.5 w-3.5" />
                        Try Again
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ── Success banner ── */}
            {isVerified && !isPending && (
              <div className="anim-in mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-500/10 dark:bg-emerald-500/[0.05]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black tracking-[-0.4px] text-emerald-900 dark:text-emerald-300">
                      Resume Verified &amp; Active
                    </h4>
                    <p className="mt-1.5 text-sm leading-6 text-emerald-700 dark:text-emerald-200/70">
                      Your resume is live, ATS-verified, and actively boosting
                      your recruiter visibility and job match score.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Stats grid ── */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                      Verification
                    </p>
                    <p className="mt-0.5 text-sm font-bold capitalize text-slate-950 dark:text-white">
                      {isPending ? "In Progress" : latestResumeStatus ?? "None"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                      Format
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-950 dark:text-white">
                      ATS Optimised
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                      Visibility
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-950 dark:text-white">
                      {isVerified ? "Boosted" : "Pending"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Empty state ── */}
            {!hasResume && !isPending && (
              <div className="anim-in mt-6 rounded-[26px] border border-dashed border-slate-300 bg-slate-50/70 p-10 text-center dark:border-white/10 dark:bg-white/[0.02]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <FileText className="h-7 w-7" />
                </div>
                <h4 className="mt-5 text-xl font-black tracking-[-0.7px] text-slate-950 dark:text-white">
                  No Resume Uploaded
                </h4>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500 dark:text-zinc-400">
                  Upload a professional ATS-friendly resume to unlock recruiter
                  visibility and intelligent job matching.
                </p>
                <label htmlFor="resume-upload">
                  <div className="mt-6 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-violet-500 px-6 text-sm font-semibold text-white transition hover:bg-violet-600 active:scale-[0.98]">
                    <UploadCloud className="h-4 w-4" />
                    Upload Resume
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resume preview modal */}
      {isPreviewOpen && latestResume && (
        <ResumePreviewModal
          url={latestResume}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  )
}