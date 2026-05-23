"use client"

import { useState } from "react"

import Link from "next/link"

import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Loader2,
  Mail,
  MoreHorizontal,
  Users,
  Calendar,
  Zap,
} from "lucide-react"

import AppBackground from "@/components/shared/app-background"

import { useApplicants } from "../hooks/use-applicants"
import { useUpdateApplicantStatus } from "../hooks/use-update-applicant-status"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/models/dropdown-menu"

import ApplicantProfileModal from "./applicant-profile-modal"
import { Button } from '@/components/ui/button';

// ─── types ────────────────────────────────────────────────────────────────────

interface Props {
  jobId: number
}

type ApplicationStatus =
  | "Submitted"
  | "Hired"
  | "Rejected"

// ─── helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ApplicationStatus,
  {
    label: string
    dot: string
    bg: string
    border: string
    text: string
  }
> = {
  Submitted: {
    label: "Submitted",
    dot: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.18)",
    text: "rgb(252,211,77)",
  },

  Hired: {
    label: "Hired",
    dot: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    border: "rgba(16,185,129,0.18)",
    text: "rgb(52,211,153)",
  },

  Rejected: {
    label: "Rejected",
    dot: "#ef4444",
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.18)",
    text: "rgb(252,165,165)",
  },
}

function getStatusConfig(
  status: string
) {

  return (
    STATUS_CONFIG[
      status as ApplicationStatus
    ] ||
    STATUS_CONFIG.Submitted
  )
}

// ─── component ────────────────────────────────────────────────────────────────

export default function ApplicantsIndexView({
  jobId,
}: Props) {

  const {
    data,
    isLoading,
    isError,
  } = useApplicants(jobId)

  const {
    mutate,
    isPending,
  } =
    useUpdateApplicantStatus()

  const [
    selectedApplicantId,
    setSelectedApplicantId,
  ] = useState<number | null>(
    null
  )

  const totalCount =
    data?.length ?? 0

  const hiredCount =
    data?.filter(
      (a) =>
        a.status === "Hired"
    ).length ?? 0

  const pendingCount =
    data?.filter(
      (a) =>
        a.status === "Submitted"
    ).length ?? 0

  const rejectedCount =
    data?.filter(
      (a) =>
        a.status === "Rejected"
    ).length ?? 0

  return (

    <AppBackground>

      <section
        className="
          relative min-h-screen
          overflow-x-hidden
        "
      >

        {/* ambient */}

        <div
          className="
            pointer-events-none
            absolute inset-0
          "
        >

          <div
            className="
              absolute left-0 top-0
              h-96 w-96
              rounded-full
              bg-emerald-500/[0.05]
              blur-3xl
            "
          />

          <div
            className="
              absolute bottom-0 right-0
              h-96 w-96
              rounded-full
              bg-cyan-500/[0.04]
              blur-3xl
            "
          />
        </div>

        <div
          className="
            relative z-10
            mx-auto max-w-5xl
            px-5 py-8
            lg:px-8
          "
        >

          {/* HERO */}

          <div
            className="
              relative overflow-hidden
              rounded-[30px]
              border border-slate-200
              bg-white/80
              shadow-[0_25px_80px_rgba(15,23,42,0.06)]
              backdrop-blur-md

              dark:border-white/10
              dark:bg-[#111111]/80
            "
          >

            {/* glow */}

            <div
              className="
                absolute inset-0
                bg-gradient-to-br
                from-emerald-500/[0.05]
                via-transparent
                to-cyan-500/[0.04]
              "
            />

            <div
              className="
                absolute inset-x-0 top-0
                h-[1px]
                bg-gradient-to-r
                from-transparent
                via-emerald-400/50
                to-transparent
              "
            />

            <div
              className="
                relative z-10
                flex items-center
                justify-between gap-5
                p-7
              "
            >

              {/* left */}

              <div>

                <div
                  className="
                    inline-flex items-center gap-2
                    rounded-full
                    border border-emerald-200
                    bg-emerald-50
                    px-3 py-1
                    text-[10px]
                    font-bold uppercase
                    tracking-[0.16em]
                    text-emerald-700

                    dark:border-emerald-500/15
                    dark:bg-emerald-500/10
                    dark:text-emerald-400
                  "
                >

                  <CheckCircle2
                    className="
                      h-3 w-3
                    "
                  />

                  Recruiter Panel
                </div>

                <h1
                  className="
                    mt-4 text-3xl
                    font-black
                    tracking-[-0.06em]
                    text-slate-950

                    dark:text-white
                  "
                >
                  Applicants
                </h1>

                <p
                  className="
                    mt-1.5 text-sm
                    text-slate-500

                    dark:text-zinc-400
                  "
                >
                  Review and manage
                  candidates for this
                  position.
                </p>
              </div>

              {/* right */}

              <div
                className="
                  hidden md:flex
                  h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  border border-emerald-200
                  bg-emerald-50

                  dark:border-emerald-500/15
                  dark:bg-emerald-500/10
                "
              >

                <Users
                  className="
                    h-8 w-8
                    text-emerald-600

                    dark:text-emerald-400
                  "
                />
              </div>
            </div>
          </div>

          {/* STATS */}

          {
            !isLoading &&
            !isError &&
            data && (

              <div
                className="
                  mt-4 grid
                  grid-cols-2 gap-3
                  lg:grid-cols-4
                "
              >

                {
                  [
                    {
                      label:
                        "Total",
                      value:
                        totalCount,
                      sub:
                        "candidates",
                      color:
                        "text-slate-700 dark:text-white",
                    },

                    {
                      label:
                        "Hired",
                      value:
                        hiredCount,
                      sub:
                        "accepted",
                      color:
                        "text-emerald-500",
                    },

                    {
                      label:
                        "Pending",
                      value:
                        pendingCount,
                      sub:
                        "to review",
                      color:
                        "text-yellow-500",
                    },

                    {
                      label:
                        "Rejected",
                      value:
                        rejectedCount,
                      sub:
                        "declined",
                      color:
                        "text-red-400",
                    },
                  ].map(
                    (
                      item
                    ) => (

                      <div
                        key={
                          item.label
                        }
                        className="
                          relative overflow-hidden
                          rounded-2xl
                          border border-slate-200
                          bg-white/70
                          p-4
                          shadow-[0_4px_20px_rgba(15,23,42,0.04)]
                          backdrop-blur-md

                          dark:border-white/10
                          dark:bg-[#111111]/70
                        "
                      >

                        <div
                          className="
                            absolute inset-0
                            bg-gradient-to-br
                            from-white/40
                            to-transparent

                            dark:from-white/[0.02]
                          "
                        />

                        <div
                          className="
                            relative z-10
                          "
                        >

                          <p
                            className="
                              text-[11px]
                              font-semibold
                              uppercase
                              tracking-[0.1em]
                              text-slate-400

                              dark:text-zinc-500
                            "
                          >
                            {
                              item.label
                            }
                          </p>

                          <p
                            className={`
                              mt-1 text-2xl
                              font-black
                              tracking-tight
                              ${item.color}
                            `}
                          >
                            {
                              item.value
                            }
                          </p>

                          <p
                            className="
                              mt-1 text-[11px]
                              text-slate-400

                              dark:text-zinc-600
                            "
                          >
                            {
                              item.sub
                            }
                          </p>
                        </div>
                      </div>
                    )
                  )
                }
              </div>
            )
          }

          {/* LOADING */}

          {
            isLoading && (

              <div
                className="
                  flex justify-center
                  py-20
                "
              >

                <Loader2
                  className="
                    h-7 w-7
                    animate-spin
                    text-emerald-500
                  "
                />
              </div>
            )
          }

          {/* ERROR */}

          {
            isError && (

              <div
                className="
                  mt-5 flex
                  items-center gap-3
                  rounded-2xl
                  border border-red-200
                  bg-red-50
                  px-4 py-3
                  text-sm font-medium
                  text-red-600

                  dark:border-red-500/20
                  dark:bg-red-500/10
                  dark:text-red-400
                "
              >

                <span
                  className="
                    h-1.5 w-1.5
                    shrink-0 rounded-full
                    bg-red-500
                  "
                />

                Failed to fetch
                applicants.
              </div>
            )
          }

          {/* EMPTY */}

          {
            !isLoading &&
            data?.length === 0 && (

              <div
                className="
                  mt-5 rounded-[24px]
                  border border-dashed
                  border-slate-200
                  bg-white/60
                  p-12 text-center

                  dark:border-white/10
                  dark:bg-[#111111]/60
                "
              >

                <div
                  className="
                    mx-auto mb-4
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50

                    dark:border-white/10
                    dark:bg-white/[0.03]
                  "
                >

                  <Users
                    className="
                      h-6 w-6
                      text-slate-400
                    "
                  />
                </div>

                <h3
                  className="
                    text-xl
                    font-black
                    tracking-[-0.04em]
                    text-slate-950

                    dark:text-white
                  "
                >
                  No applicants yet
                </h3>

                <p
                  className="
                    mt-2 text-sm
                    text-slate-500

                    dark:text-zinc-400
                  "
                >
                  Applications will
                  appear here once
                  candidates apply.
                </p>
              </div>
            )
          }

          {/* LIST */}

          <div
            className="
              mt-4 space-y-3
            "
          >

            {
              data?.map(
                (
                  applicant
                ) => {

                  const status =
                    getStatusConfig(
                      applicant.status
                    )

                  return (

                    <div
                      key={
                        applicant.application_id
                      }
                      className="
                        group relative
                        overflow-hidden
                        rounded-[24px]
                        border border-slate-200
                        bg-white/80
                        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
                        backdrop-blur-md
                        transition-all duration-300

                        hover:-translate-y-[1px]
                        hover:border-slate-300
                        hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]

                        dark:border-white/10
                        dark:bg-[#111111]/80

                        dark:hover:border-white/15
                      "
                    >

                      {/* glow */}

                      <div
                        className="
                          absolute inset-0
                          bg-gradient-to-br
                          from-white/40
                          to-transparent

                          dark:from-white/[0.02]
                        "
                      />

                      {/* accent */}

                      <div
                        className="
                          absolute left-0 top-4 bottom-4
                          w-[3px]
                          rounded-r-full
                        "
                        style={{
                          background:
                            status.dot,
                        }}
                      />

                      <div
                        className="
                          relative z-10
                          flex items-center
                          gap-4 px-5 py-4
                        "
                      >

                        {/* avatar */}

                        <div
                          className="
                            relative flex
                            h-12 w-12
                            shrink-0
                            items-center justify-center
                            rounded-2xl
                            border border-emerald-500/15
                            bg-emerald-500/10
                          "
                        >

                          <Users
                            className="
                              h-5 w-5
                              text-emerald-500
                            "
                          />

                          {
                            applicant.status ===
                              "Hired" && (

                              <div
                                className="
                                  absolute
                                  -bottom-0.5
                                  -right-0.5
                                  h-3 w-3
                                  rounded-full
                                  border-2 border-white
                                  bg-emerald-400

                                  dark:border-[#111111]
                                "
                              />
                            )
                          }
                        </div>

                        {/* info */}

                        <div
                          className="
                            min-w-0 flex-1
                          "
                        >

                          <div
                            className="
                              flex flex-wrap
                              items-center gap-2
                            "
                          >

                            <Button
                              onClick={() =>
                                setSelectedApplicantId(
                                  applicant.applicant_id
                                )
                              }
                              className="
                                text-[15px]
                                font-black
                                tracking-[-0.03em]
                                text-slate-900
                                transition-colors duration-200

                                hover:text-emerald-600

                                dark:text-white
                                dark:hover:text-emerald-400
                              "
                            >

                              Applicant #
                              {
                                applicant.applicant_id
                              }
                            </Button>

                            {/* status */}

                            <span
                              className="
                                inline-flex
                                items-center gap-1
                                rounded-full
                                px-2.5 py-0.5
                                text-[10px]
                                font-bold uppercase
                                tracking-[0.1em]
                              "
                              style={{
                                background:
                                  status.bg,

                                border:
                                  `1px solid ${status.border}`,

                                color:
                                  status.text,
                              }}
                            >

                              <span
                                className="
                                  h-1.5 w-1.5
                                  rounded-full
                                "
                                style={{
                                  background:
                                    status.dot,
                                }}
                              />

                              {
                                status.label
                              }
                            </span>

                            {
                              applicant.subscribed && (

                                <span
                                  className="
                                    inline-flex
                                    items-center gap-1
                                    rounded-full
                                    border border-violet-500/20
                                    bg-violet-500/10
                                    px-2.5 py-0.5
                                    text-[10px]
                                    font-bold uppercase
                                    tracking-[0.1em]
                                    text-violet-300
                                  "
                                >

                                  <Zap
                                    className="
                                      h-2.5 w-2.5
                                    "
                                  />

                                  Pro
                                </span>
                              )
                            }
                          </div>

                          {/* bottom */}

                          <div
                            className="
                              mt-1.5 flex
                              flex-wrap
                              items-center gap-3
                            "
                          >

                            <span
                              className="
                                flex items-center
                                gap-1.5 text-[13px]
                                text-slate-500

                                dark:text-zinc-400
                              "
                            >

                              <Mail
                                className="
                                  h-3 w-3
                                  text-emerald-500/60
                                "
                              />

                              <span
                                className="
                                  max-w-[220px]
                                  truncate
                                "
                              >
                                {
                                  applicant.applicant_email
                                }
                              </span>
                            </span>

                            <span
                              className="
                                h-3.5 w-px
                                bg-slate-200

                                dark:bg-white/10
                              "
                            />

                            <span
                              className="
                                flex items-center
                                gap-1.5 text-[12px]
                                text-slate-400

                                dark:text-zinc-500
                              "
                            >

                              <Calendar
                                className="
                                  h-3 w-3
                                "
                              />

                              {
                                new Date(
                                  applicant.applied_at
                                ).toLocaleDateString(
                                  "en-US",
                                  {
                                    month:
                                      "short",

                                    day:
                                      "numeric",

                                    year:
                                      "numeric",
                                  }
                                )
                              }
                            </span>
                          </div>
                        </div>

                        {/* actions */}

                        <div
                          className="
                            flex items-center
                            gap-2
                            shrink-0
                          "
                        >

                          {
                            isPending && (

                              <Loader2
                                className="
                                  h-3.5 w-3.5
                                  animate-spin
                                  text-emerald-500
                                "
                              />
                            )
                          }

                          {/* profile */}

                          <Button
                            onClick={() =>
                              setSelectedApplicantId(
                                applicant.applicant_id
                              )
                            }
                            className="
                              inline-flex
                              h-9 items-center
                              gap-1.5
                              rounded-xl
                              border border-emerald-500/15
                              bg-emerald-500/10
                              px-3 text-[13px]
                              font-semibold
                              text-emerald-500
                              transition-all duration-200

                              hover:border-emerald-500/30
                              hover:bg-emerald-500/15
                            "
                          >

                            <Users
                              className="
                                h-3.5 w-3.5
                              "
                            />

                            Profile
                          </Button>

                          {/* resume */}

                          <Link
                            href={
                              applicant.resume
                            }
                            target="_blank"
                            className="
                              group/link inline-flex
                              h-9 items-center
                              gap-1.5
                              rounded-xl
                              border border-slate-200
                              bg-slate-50
                              px-3 text-[13px]
                              font-semibold
                              text-slate-600
                              transition-all duration-200

                              hover:border-slate-300
                              hover:bg-slate-100

                              dark:border-white/10
                              dark:bg-white/[0.03]
                              dark:text-zinc-300
                            "
                          >

                            <FileText
                              className="
                                h-3.5 w-3.5
                                text-slate-400
                              "
                            />

                            Resume

                            <ArrowUpRight
                              className="
                                h-3 w-3
                                text-slate-400
                                transition-transform duration-200

                                group-hover/link:-translate-y-0.5
                                group-hover/link:translate-x-0.5
                              "
                            />
                          </Link>

                          {/* menu */}

                          <DropdownMenu>

                            <DropdownMenuTrigger
                              asChild
                            >

                              <button
                                className="
                                cursor-pointer
                                  flex h-9 w-9
                                  items-center justify-center
                                  rounded-xl
                                  border border-transparent
                                  text-slate-400
                                  opacity-0
                                  transition-all duration-200

                                  hover:border-slate-200
                                  hover:bg-slate-100
                                  hover:text-slate-600

                                  group-hover:opacity-100

                                  dark:text-zinc-500

                                  dark:hover:border-white/10
                                  dark:hover:bg-white/[0.05]
                                  dark:hover:text-zinc-300
                                "
                              >

                                <MoreHorizontal
                                  className="
                                    h-4 w-4
                                  "
                                />
                              </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="
                                w-48 rounded-2xl
                                border border-slate-200
                                bg-white/95
                                p-1.5
                                shadow-[0_8px_32px_rgba(15,23,42,0.10)]
                                backdrop-blur-xl

                                dark:border-white/10
                                dark:bg-[#111111]/95
                              "
                            >
                              <DropdownMenuItem
                                onClick={() =>
                                  mutate({
                                    application_id:
                                      applicant.application_id,

                                    status:
                                      "Submitted",
                                  })
                                }
                                className="
                                cursor-pointer
                                  rounded-xl
                                  px-3 py-2.5
                                  text-sm font-medium
                                "
                              >

                                Mark Submitted
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() =>
                                  mutate({
                                    application_id:
                                      applicant.application_id,

                                    status:
                                      "Hired",
                                  })
                                }
                                className="
                                cursor-pointer
                                  rounded-xl
                                  px-3 py-2.5
                                  text-sm font-medium
                                  text-emerald-600

                                  hover:bg-emerald-50

                                  dark:text-emerald-400
                                  dark:hover:bg-emerald-500/10
                                "
                              >

                                Mark Hired
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() =>
                                  mutate({
                                    application_id:
                                      applicant.application_id,

                                    status:
                                      "Rejected",
                                  })
                                }
                                className="
                                cursor-pointer
                                  rounded-xl
                                  px-3 py-2.5
                                  text-sm font-medium
                                  text-red-600

                                  hover:bg-red-50

                                  dark:text-red-400
                                  dark:hover:bg-red-500/10
                                "
                              >

                                Mark Rejected
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  )
                }
              )
            }
          </div>
        </div>
      </section>

      {/* PROFILE MODAL */}

      <ApplicantProfileModal
        applicantId={
          selectedApplicantId
        }
        onClose={() =>
          setSelectedApplicantId(
            null
          )
        }
      />
    </AppBackground>
  )
}