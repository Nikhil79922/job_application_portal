/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"

import Image from "next/image"

import {
  Building2,
  CheckCircle2,
  MapPin,
} from "lucide-react"

import { toast } from "sonner"

import type { ActiveJob } from "../types/job.types"

import { useAuthStore } from "@/stores/auth.store"
import { useApplications } from "../../applicants/hooks/use-applications"
import { useApplyJob } from "../hooks/use-apply-job"

import { Button } from "@/components/ui/button"
import JobDetailsModal from "./job-details-modal"

interface Props {
  job: ActiveJob
}

export default function JobCard({ job }: Props) {
  const [open, setOpen] = useState(false)

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const { data: applicationsData } = useApplications()
  const appliedJobIds = new Set(
    (applicationsData?.data ?? []).map((a: any) => a.job_id)
  )
  const alreadyApplied = appliedJobIds.has(job.job_id)

  const { mutate: applyJob, isPending } = useApplyJob()

  const handleEasyApply = () => {
    if (!isAuthenticated) {
      toast.error("Please login to apply for jobs.")
      return
    }
    if (alreadyApplied) return

    applyJob(job.job_id, {
      onSuccess: (response: any) => {
        toast.success(response.message || "Successfully applied")
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to apply"
        toast.error(message)
      },
    })
  }

  return (
    <>
      <div
        className="
          group relative flex h-full flex-col
          overflow-hidden rounded-[30px]
          border border-slate-200 bg-white
          shadow-[0_12px_40px_rgba(15,23,42,0.06)]
          transition-all duration-300
          hover:-translate-y-1
          hover:border-emerald-300/40
          hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]
          dark:border-white/10 dark:bg-[#111111]
          dark:hover:border-emerald-500/20
          dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)]
        "
      >
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-cyan-500/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* top glow line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* ── CONTENT ── */}
        <div className="relative z-10 flex h-full flex-col p-6">

          {/* ── HEADER ── */}
          <div className="flex items-start gap-4">

            {/* logo */}
            <div
              className="
                relative flex h-[72px] w-[72px] shrink-0
                items-center justify-center overflow-hidden
                rounded-2xl border border-slate-200
                bg-gradient-to-br from-slate-50 to-slate-100
                dark:border-white/10 dark:from-white/[0.05] dark:to-white/[0.02]
              "
            >
              {job.company_logo ? (
                <Image
                  src={job.company_logo}
                  alt={job.company_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <Building2 className="h-8 w-8 text-emerald-500" />
              )}
            </div>

            {/* title + company + status badge */}
            <div className="min-w-0 flex-1">

              {/* status row — sits above the title, never overlaps */}
              <div className="mb-2 flex items-center gap-2">
                {alreadyApplied ? (
                  <span
                    className="
                      inline-flex items-center gap-1.5
                      rounded-full
                      border border-emerald-500/20
                      bg-emerald-50
                      px-2.5 py-0.5
                      text-[10px] font-bold uppercase tracking-[0.14em]
                      text-emerald-600
                      dark:bg-emerald-500/10
                      dark:text-emerald-400
                    "
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    Applied
                  </span>
                ) : (
                  <span
                    className="
                      inline-flex items-center
                      rounded-full
                      border border-emerald-200
                      bg-emerald-50
                      px-2.5 py-0.5
                      text-[10px] font-bold uppercase tracking-[0.14em]
                      text-emerald-700
                      dark:border-emerald-500/10
                      dark:bg-emerald-500/10
                      dark:text-emerald-400
                    "
                  >
                    Active
                  </span>
                )}
              </div>

              <h3
                className="
                  line-clamp-1 text-[21px] font-black
                  leading-tight tracking-[-0.05em]
                  text-slate-950 dark:text-white
                "
              >
                {job.title}
              </h3>

              <p className="mt-1 truncate text-sm font-medium text-slate-500 dark:text-zinc-400">
                {job.company_name}
              </p>
            </div>
          </div>

          {/* ── TYPE + LOCATION BADGES ── */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className="
                inline-flex items-center rounded-full
                border border-emerald-500/20 bg-emerald-500/10
                px-3 py-1 text-[11px] font-semibold
                text-emerald-600 dark:text-emerald-400
              "
            >
              {job.job_type}
            </span>
            <span
              className="
                inline-flex items-center rounded-full
                border border-cyan-500/20 bg-cyan-500/10
                px-3 py-1 text-[11px] font-semibold
                text-cyan-600 dark:text-cyan-400
              "
            >
              {job.work_location}
            </span>
          </div>

          {/* ── DESCRIPTION — flex-1 pins footer to bottom ── */}
          <div className="mt-5 flex-1">
            <p className="line-clamp-2 text-sm leading-7 text-slate-600 dark:text-zinc-400">
              {job.description}
            </p>
          </div>

          {/* ── LOCATION ── */}
          <div className="mt-5">
            <div
              className="
                inline-flex items-center gap-2 rounded-full
                border border-slate-200 bg-slate-50
                px-3 py-1.5
                text-xs font-semibold text-slate-700
                dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300
              "
            >
              <MapPin className="h-3.5 w-3.5 text-emerald-500" />
              <span className="max-w-[180px] truncate">{job.location}</span>
            </div>
          </div>

          {/* ── ACTIONS ── */}
          <div
            className="
              mt-6 flex items-center gap-3
              border-t border-slate-100 pt-6
              dark:border-white/[0.06]
            "
          >
            {/* View Details */}
            <Button
              onClick={() => setOpen(true)}
              className="
                h-12 flex-1 rounded-2xl
                border border-slate-200 bg-white
                text-sm font-semibold text-slate-700
                transition-all duration-300 hover:bg-slate-100
                dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-200
                dark:hover:bg-white/[0.06]
              "
            >
              View Details
            </Button>

            {/* Apply / Already Applied */}
            {alreadyApplied ? (
              /* valid Tailwind classes only — no /8 opacity */
              <div
                className="
                  flex h-12 flex-1 items-center justify-center gap-2
                  rounded-2xl
                  border border-emerald-500/20
                  bg-emerald-50
                  px-6 text-sm font-semibold
                  text-emerald-600
                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >
                <CheckCircle2 className="h-4 w-4" />
                Applied
              </div>
            ) : (
              <Button
                disabled={isPending}
                onClick={handleEasyApply}
                className="
                  group/apply relative flex h-12 flex-1
                  items-center justify-center overflow-hidden
                  rounded-2xl border border-emerald-400/20 bg-[#07130F]
                  px-6 text-sm font-semibold tracking-[0.02em] text-white
                  shadow-[0_4px_20px_rgba(0,0,0,0.35)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5
                  hover:border-emerald-400/40 hover:bg-[#0A1B15]
                  hover:shadow-[0_10px_35px_rgba(16,185,129,0.18)]
                  active:scale-[0.985]
                  disabled:cursor-not-allowed disabled:opacity-70
                "
              >
                {/* glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/apply:opacity-100">
                  <div className="absolute inset-y-0 left-0 w-[40%] bg-emerald-400/15 blur-2xl" />
                </div>
                {/* shimmer top border */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
                {/* sweep shine */}
                <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)] transition-transform duration-1000 group-hover/apply:translate-x-[120%]" />

                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-emerald-50">
                    {isPending ? "Applying…" : "Easy Apply"}
                  </span>
                  {!isPending && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover/apply:translate-x-0.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="m13 6 6 6-6 6" />
                    </svg>
                  )}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <JobDetailsModal
        open={open}
        jobId={job.job_id}
        companyName={job.company_name}
        onClose={() => setOpen(false)}
      />
    </>
  )
}