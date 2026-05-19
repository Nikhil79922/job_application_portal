/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

// src/features/jobs/components/job-details-modal.tsx

"use client"

import {
  ReactNode,
  useEffect,
  useState,
} from "react"

import {
  createPortal,
} from "react-dom"

import {
  Briefcase,
  Building2,
  Clock3,
  MapPin,
  Sparkles,
  Users,
  X,
} from "lucide-react"

import {
  toast,
} from "sonner"

import {
  useJobDetails,
} from "../hooks/use-job-details"

import {
  useApplyJob,
} from "../hooks/use-apply-job"

import {
  useAuthStore,
} from "@/stores/auth.store"

import {
  Button,
} from "@/components/ui/button"

interface Props {
  jobId: number | null
  open: boolean
  onClose: () => void
  companyName?: string
}

export default function JobDetailsModal({
  jobId,
  open,
  onClose,
  companyName,
}: Props) {

  const [
    mounted,
    setMounted,
  ] = useState(false)

  const isAuthenticated =
    useAuthStore(
      (state) =>
        state.isAuthenticated
    )

  const {
    mutate: applyJob,
    isPending,
  } = useApplyJob()

  const {
    data: job,
    isLoading,
    isError,
  } = useJobDetails(
    jobId,
    open
  )

  useEffect(() => {

    setMounted(true)

  }, [])

  // prevent background scroll

  useEffect(() => {

    document.body.style.overflow =
      open
        ? "hidden"
        : "unset"

    return () => {

      document.body.style.overflow =
        "unset"
    }

  }, [open])

  if (
    !mounted ||
    !open
  ) {
    return null
  }

  const handleEasyApply =
    () => {

      if (
        !isAuthenticated
      ) {

        toast.error(
          "Please login to apply for jobs."
        )

        return
      }

      if (!jobId) {

        toast.error(
          "Invalid job"
        )

        return
      }

      applyJob(
        jobId,
        {

          onSuccess: (
            response
          ) => {

            toast.success(
              response.message ||
              "Successfully applied"
            )
          },

          onError: (
            error: any
          ) => {

            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Failed to apply"

            toast.error(message)
          },
        }
      )
    }

  return createPortal(

    <div
      className="
        fixed inset-0 z-[999999]
        flex items-center justify-center
        bg-black/60
        p-4 backdrop-blur-md
      "
      onClick={(e) => {

        if (
          e.target === e.currentTarget
        ) {

          onClose()
        }
      }}
    >

      {/* MODAL */}

      <div
        className="
          relative flex
          h-[88vh] w-full
          max-w-4xl flex-col
          overflow-hidden
          rounded-2xl

          border border-slate-200
          bg-white

          shadow-[0_20px_80px_rgba(15,23,42,0.15)]

          dark:border-white/10
          dark:bg-[#0B0F14]
          dark:shadow-[0_20px_80px_rgba(0,0,0,0.55)]
        "
      >

        {/* top glow */}

        <div
          className="
            absolute inset-x-0 top-0 h-px
            bg-gradient-to-r
            from-transparent
            via-emerald-400/60
            to-transparent
          "
        />

        {/* HEADER */}

        <div
          className="
            shrink-0 border-b
            border-slate-200
            px-5 py-5 md:px-7
            dark:border-white/5
          "
        >

          <div
            className="
              flex items-start
              justify-between gap-4
            "
          >

            <div className="min-w-0">

              {/* badge */}

              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-emerald-500/15
                  bg-emerald-500/10
                  px-3 py-1
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-emerald-500
                "
              >

                <Sparkles className="h-3 w-3" />

                Job Opportunity
              </div>

              {/* title */}

              <h2
                className="
                  mt-4 text-2xl
                  font-semibold tracking-tight
                  text-slate-950
                  md:text-3xl
                  dark:text-white
                "
              >
                {
                  job?.title ||
                  "Job Details"
                }
              </h2>

              {/* company */}

              <div
                className="
                  mt-3 flex items-center
                  gap-2 text-sm
                  text-slate-500
                  dark:text-zinc-400
                "
              >

                <Building2
                  className="
                    h-4 w-4
                    text-emerald-500
                  "
                />

                <span>
                  {
                    companyName ||
                    "Company"
                  }
                </span>
              </div>
            </div>

            {/* close */}

            <Button
              onClick={onClose}
              className="
                h-10 w-10 shrink-0
                rounded-xl

                border border-slate-200
                bg-slate-100
                p-0
                text-slate-600

                transition-all duration-300
                hover:bg-slate-200

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-zinc-400
                dark:hover:bg-white/[0.06]
                dark:hover:text-white
              "
            >

              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* CONTENT */}

        <div
          className="
            flex-1 overflow-y-auto
            scrollbar-hide
          "
        >

          {
            isLoading ? (

              <div
                className="
                  flex h-full
                  items-center justify-center
                "
              >

                <div
                  className="
                    relative h-12 w-12
                  "
                >

                  <div
                    className="
                      absolute inset-0
                      animate-spin rounded-full
                      border-2
                      border-emerald-500/15
                      border-t-emerald-400
                    "
                  />

                  <div
                    className="
                      absolute inset-[7px]
                      rounded-full
                      bg-emerald-500/10
                    "
                  />
                </div>
              </div>

            ) : isError ? (

              <div
                className="
                  flex h-full
                  items-center justify-center
                  text-slate-500
                  dark:text-zinc-400
                "
              >
                Failed to load job details
              </div>

            ) : job ? (

              <div
                className="
                  grid gap-6
                  p-5 md:p-7
                  lg:grid-cols-[1fr_300px]
                "
              >

                {/* LEFT */}

                <div className="space-y-6">

                  {/* tags */}

                  <div className="flex flex-wrap gap-2">

                    <div
                      className="
                        rounded-full
                        border border-emerald-500/15
                        bg-emerald-500/10
                        px-3 py-1
                        text-xs font-medium
                        text-emerald-500
                      "
                    >
                      {job.job_type}
                    </div>

                    <div
                      className="
                        rounded-full
                        border border-cyan-500/15
                        bg-cyan-500/10
                        px-3 py-1
                        text-xs font-medium
                        text-cyan-500
                      "
                    >
                      {job.work_location}
                    </div>

                    <div
                      className="
                        rounded-full
                        border border-violet-500/15
                        bg-violet-500/10
                        px-3 py-1
                        text-xs font-medium
                        text-violet-500
                      "
                    >
                      {job.role}
                    </div>
                  </div>

                  {/* description */}

                  <div
                    className="
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50
                      p-5

                      dark:border-white/5
                      dark:bg-white/[0.02]
                    "
                  >

                    <h3
                      className="
                        text-sm font-semibold
                        uppercase tracking-[0.14em]
                        text-slate-500
                        dark:text-zinc-500
                      "
                    >
                      About This Role
                    </h3>

                    <p
                      className="
                        mt-4 text-sm
                        leading-7
                        text-slate-700
                        dark:text-zinc-300
                      "
                    >
                      {job.description}
                    </p>
                  </div>

                  {/* DETAILS */}

                  <div
                    className="
                      grid gap-4
                      sm:grid-cols-2
                    "
                  >

                    <InfoCard
                      icon={
                        <MapPin className="h-5 w-5 text-emerald-500" />
                      }
                      label="Location"
                      value={job.location}
                    />

                    <InfoCard
                      icon={
                        <Briefcase className="h-5 w-5 text-cyan-500" />
                      }
                      label="Employment Type"
                      value={job.job_type}
                    />

                    <InfoCard
                      icon={
                        <Users className="h-5 w-5 text-violet-500" />
                      }
                      label="Open Positions"
                      value={`${job.openings} Positions`}
                    />

                    <InfoCard
                      icon={
                        <Clock3 className="h-5 w-5 text-orange-500" />
                      }
                      label="Posted On"
                      value={
                        new Date(
                          job.created_at
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      }
                    />
                  </div>
                </div>

                {/* RIGHT */}

                <div className="space-y-4">

                  {/* salary */}

                  <div
                    className="
                      rounded-2xl
                      border border-emerald-500/15
                      bg-emerald-500/10
                      p-6
                    "
                  >

                    <p
                      className="
                        text-[11px]
                        font-semibold uppercase
                        tracking-[0.16em]
                        text-emerald-500
                      "
                    >
                      Annual Salary
                    </p>

                    <h3
                      className="
                        mt-3 text-4xl
                        font-bold tracking-tight
                        text-slate-950
                        dark:text-white
                      "
                    >
                      ₹
                      {
                        Number(
                          job.salary
                        ).toLocaleString(
                          "en-IN"
                        )
                      }
                    </h3>

                    <p
                      className="
                        mt-2 text-sm
                        text-slate-500
                        dark:text-zinc-400
                      "
                    >
                      Estimated yearly compensation
                    </p>
                  </div>

                  {/* ACTIONS */}

                  <div
                    className="
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50
                      p-4

                      dark:border-white/5
                      dark:bg-white/[0.02]
                    "
                  >

                    <div className="space-y-3">

                      {/* APPLY */}

                      <Button
                        disabled={isPending}
                        onClick={
                          handleEasyApply
                        }
                        className="
                          h-11 w-full
                          rounded-xl
                          border border-emerald-400/20
                          bg-[#07130F]
                          text-sm font-medium
                          text-white
                          transition-all duration-300
                          hover:border-emerald-400/40
                          hover:bg-[#0A1B15]
                          hover:shadow-[0_10px_30px_rgba(16,185,129,0.16)]
                          disabled:cursor-not-allowed
                          disabled:opacity-70
                        "
                      >
                        {
                          isPending
                            ? "Applying..."
                            : "Apply Now"
                        }
                      </Button>

                      {/* CLOSE */}

                      <Button
                        onClick={onClose}
                        className="
                          h-11 w-full
                          rounded-xl

                          border border-slate-200
                          bg-white
                          text-sm font-medium
                          text-slate-700

                          transition-all duration-300
                          hover:bg-slate-100

                          dark:border-white/10
                          dark:bg-white/[0.03]
                          dark:text-zinc-300
                          dark:hover:bg-white/[0.06]
                          dark:hover:text-white
                        "
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            ) : (

              <div
                className="
                  flex h-full
                  items-center justify-center
                  text-slate-500
                  dark:text-zinc-400
                "
              >
                No Job Found
              </div>
            )
          }
        </div>
      </div>
    </div>,

    document.body
  )
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {

  return (

    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-slate-50
        p-5

        dark:border-white/5
        dark:bg-white/[0.02]
      "
    >

      {icon}

      <p
        className="
          mt-4 text-[11px]
          font-semibold uppercase
          tracking-[0.14em]
          text-slate-500
          dark:text-zinc-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2 text-sm
          font-medium
          text-slate-800
          dark:text-white
        "
      >
        {value}
      </p>
    </div>
  )
}