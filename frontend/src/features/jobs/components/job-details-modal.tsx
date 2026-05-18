/* eslint-disable react-hooks/set-state-in-effect */
// src/features/jobs/components/job-details-modal.tsx

"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  createPortal,
} from "react-dom"

import {
  Briefcase,
  Clock3,
  MapPin,
  Users,
  X,
  Sparkles,
} from "lucide-react"

import {
  toast,
} from "sonner"

import {
  useJobDetails,
} from "../hooks/use-job-details"

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
}

export default function JobDetailsModal({
  jobId,
  open,
  onClose,
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
    data: job,
    isLoading,
  } = useJobDetails(jobId)

  useEffect(() => {

    setMounted(true)

  }, [])

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

      toast.success(
        "Application flow started."
      )
    }

  return createPortal(

    <div
      className="
        fixed inset-0 z-[999999]
        flex items-center justify-center
        bg-black/75 p-4 backdrop-blur-md
      "
      onClick={(e) => {

        if (
          e.target === e.currentTarget
        ) {

          onClose()
        }
      }}
    >

      <div
        className="
          relative w-full max-w-4xl
          overflow-hidden rounded-[36px]
          border border-slate-200
          bg-white shadow-[0_40px_120px_rgba(15,23,42,0.18)]
          dark:border-white/10
          dark:bg-[#111111]
          dark:shadow-[0_40px_120px_rgba(0,0,0,0.6)]
        "
      >

        {/* background */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-emerald-500/[0.03]
            via-transparent
            to-cyan-500/[0.03]
            pointer-events-none
          "
        />

        {/* top glow */}

        <div
          className="
            absolute inset-x-0 top-0 h-[2px]
            bg-gradient-to-r
            from-transparent
            via-emerald-400/70
            to-transparent
          "
        />

        {/* HEADER */}

        <div
          className="
            relative z-10 flex items-start
            justify-between border-b
            border-slate-200 px-7 py-6
            dark:border-white/10
          "
        >

          <div>

            <div
              className="
                inline-flex items-center gap-2
                rounded-full border border-emerald-500/20
                bg-emerald-500/10 px-3 py-1
                text-[11px] font-bold uppercase
                tracking-[0.14em]
                text-emerald-600
                dark:text-emerald-400
              "
            >

              <Sparkles className="h-3.5 w-3.5" />

              Job Details
            </div>

            <h2
              className="
                mt-4 text-3xl font-black
                tracking-[-0.06em]
                text-slate-950 dark:text-white
              "
            >
              Explore Opportunity
            </h2>

            <p
              className="
                mt-2 text-sm text-slate-500
                dark:text-zinc-400
              "
            >
              Complete overview of the selected role
            </p>
          </div>

          <Button
            onClick={onClose}
            className="
              h-11 w-11 rounded-2xl
              border border-slate-200
              bg-white p-0 text-slate-600
              transition-all duration-300
              hover:rotate-90
              hover:bg-slate-100
              dark:border-white/10
              dark:bg-white/[0.03]
              dark:text-zinc-300
              dark:hover:bg-white/[0.06]
            "
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* CONTENT */}

        <div
          className="
            relative z-10
            max-h-[80vh] overflow-y-auto
            p-7
          "
        >

          {
            isLoading ? (

              <div
                className="
                  flex h-[450px]
                  items-center justify-center
                "
              >

                <div
                  className="
                    relative h-14 w-14
                  "
                >

                  <div
                    className="
                      absolute inset-0 animate-spin
                      rounded-full border-2
                      border-emerald-500/20
                      border-t-emerald-500
                    "
                  />

                  <div
                    className="
                      absolute inset-[8px]
                      rounded-full bg-emerald-500/10
                    "
                  />
                </div>
              </div>
            ) : job ? (

              <>
                {/* TOP SECTION */}

                <div
                  className="
                    flex flex-col gap-6
                    lg:flex-row lg:items-start
                    lg:justify-between
                  "
                >

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap gap-2">

                      <div
                        className="
                          rounded-full border
                          border-emerald-500/20
                          bg-emerald-500/10
                          px-3 py-1
                          text-xs font-semibold
                          text-emerald-600
                          dark:text-emerald-400
                        "
                      >
                        {job.job_type}
                      </div>

                      <div
                        className="
                          rounded-full border
                          border-cyan-500/20
                          bg-cyan-500/10
                          px-3 py-1
                          text-xs font-semibold
                          text-cyan-600
                          dark:text-cyan-400
                        "
                      >
                        {job.work_location}
                      </div>

                      <div
                        className="
                          rounded-full border
                          border-violet-500/20
                          bg-violet-500/10
                          px-3 py-1
                          text-xs font-semibold
                          text-violet-600
                          dark:text-violet-400
                        "
                      >
                        {job.role}
                      </div>
                    </div>

                    <h3
                      className="
                        mt-5 text-4xl font-black
                        tracking-[-0.07em]
                        text-slate-950
                        dark:text-white
                      "
                    >
                      {job.title}
                    </h3>

                    <p
                      className="
                        mt-4 max-w-3xl
                        text-sm leading-8
                        text-slate-600
                        dark:text-zinc-300
                      "
                    >
                      {job.description}
                    </p>
                  </div>

                  {/* SALARY CARD */}

                  <div
                    className="
                      rounded-[28px]
                      border border-emerald-500/20
                      bg-emerald-500/10
                      p-6 lg:w-[260px]
                    "
                  >

                    <p
                      className="
                        text-xs font-bold uppercase
                        tracking-[0.16em]
                        text-emerald-600
                        dark:text-emerald-400
                      "
                    >
                      Salary Package
                    </p>

                    <h4
                      className="
                        mt-3 text-3xl font-black
                        tracking-[-0.06em]
                        text-slate-950
                        dark:text-white
                      "
                    >
                      ₹
                      {
                        Number(
                          job.salary
                        ).toLocaleString()
                      }
                    </h4>

                    <p
                      className="
                        mt-2 text-sm
                        text-slate-500
                        dark:text-zinc-400
                      "
                    >
                      Annual compensation
                    </p>
                  </div>
                </div>

                {/* META */}

                <div
                  className="
                    mt-10 grid gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                  "
                >

                  <div
                    className="
                      rounded-[28px]
                      border border-slate-200
                      bg-slate-50/80 p-5
                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                  >

                    <MapPin
                      className="
                        h-5 w-5
                        text-emerald-500
                      "
                    />

                    <p
                      className="
                        mt-4 text-[11px]
                        font-bold uppercase
                        tracking-[0.16em]
                        text-slate-400
                      "
                    >
                      Location
                    </p>

                    <p
                      className="
                        mt-2 text-sm font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {job.location}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-[28px]
                      border border-slate-200
                      bg-slate-50/80 p-5
                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                  >

                    <Briefcase
                      className="
                        h-5 w-5
                        text-cyan-500
                      "
                    />

                    <p
                      className="
                        mt-4 text-[11px]
                        font-bold uppercase
                        tracking-[0.16em]
                        text-slate-400
                      "
                    >
                      Job Type
                    </p>

                    <p
                      className="
                        mt-2 text-sm font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {job.job_type}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-[28px]
                      border border-slate-200
                      bg-slate-50/80 p-5
                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                  >

                    <Users
                      className="
                        h-5 w-5
                        text-violet-500
                      "
                    />

                    <p
                      className="
                        mt-4 text-[11px]
                        font-bold uppercase
                        tracking-[0.16em]
                        text-slate-400
                      "
                    >
                      Openings
                    </p>

                    <p
                      className="
                        mt-2 text-sm font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {job.openings} Positions
                    </p>
                  </div>

                  <div
                    className="
                      rounded-[28px]
                      border border-slate-200
                      bg-slate-50/80 p-5
                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                  >

                    <Clock3
                      className="
                        h-5 w-5
                        text-orange-500
                      "
                    />

                    <p
                      className="
                        mt-4 text-[11px]
                        font-bold uppercase
                        tracking-[0.16em]
                        text-slate-400
                      "
                    >
                      Posted
                    </p>

                    <p
                      className="
                        mt-2 text-sm font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {
                        new Date(
                          job.created_at
                        ).toLocaleDateString()
                      }
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}

                <div
                  className="
                    mt-10 flex flex-col gap-3
                    border-t border-slate-200
                    pt-7
                    dark:border-white/10
                    sm:flex-row
                  "
                >

                  <Button
                    onClick={
                      handleEasyApply
                    }
                    className="
                      h-12 flex-1 rounded-2xl
                      bg-emerald-500 text-sm
                      font-semibold text-white
                      shadow-[0_10px_30px_rgba(16,185,129,0.18)]
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:bg-emerald-600
                    "
                  >
                    Easy Apply
                  </Button>

                  <Button
                    onClick={onClose}
                    className="
                      h-12 rounded-2xl
                      border border-slate-200
                      bg-white px-6
                      text-sm font-semibold
                      text-slate-700
                      transition-all duration-300
                      hover:bg-slate-100
                      dark:border-white/10
                      dark:bg-white/[0.03]
                      dark:text-zinc-200
                      dark:hover:bg-white/[0.06]
                    "
                  >
                    Close
                  </Button>
                </div>
              </>
            ) : null
          }
        </div>
      </div>
    </div>,

    document.body
  )
}