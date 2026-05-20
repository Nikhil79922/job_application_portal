"use client"

import Link from "next/link"

import Image from "next/image"

import {
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  ExternalLink,
  FileText,
  MapPin,
  Sparkles,
} from "lucide-react"

import {
  useApplications,
} from "../hooks/use-applications"

import AppBackground from "@/components/shared/app-background"

import {
  Button,
} from "@/components/ui/button"

/* ────────────────────────────────────────────────────────────────────────── */
/* STATUS COLORS */
/* ────────────────────────────────────────────────────────────────────────── */

const getStatusStyles = (
  status: string
) => {

  switch (
    status.toLowerCase()
  ) {

    case "submitted":
      return {
        badge:
          "border-blue-500/20 bg-blue-500/10 text-blue-500 dark:text-blue-400",
        dot:
          "bg-blue-500",
      }

    case "Hired":
      return {
        badge:
          "border-green-500/20 bg-green-500/10 text-green-500 dark:text-green-400",
        dot:
          "bg-green-500",
      }

    case "Rejected":
      return {
        badge:
          "border-red-500/20 bg-red-500/10 text-red-500 dark:text-red-400",
        dot:
          "bg-red-500",
      }

    default:
      return {
        badge:
          "border-slate-500/20 bg-slate-500/10 text-slate-500 dark:text-slate-400",
        dot:
          "bg-slate-500",
      }
  }
}

const ApplicationsPage = () => {

  const {
    data,
    isLoading,
  } = useApplications()

  const applications =
    data?.data || []

  return (

    <AppBackground>

      <section
        className="
          min-h-screen px-4 py-8
          sm:px-6 lg:px-8
        "
      >

        <div
          className="
            mx-auto max-w-6xl
          "
        >

          {/* HEADER */}

          <div
            className="
              flex flex-col gap-5
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-4 py-2
                  text-[11px] font-bold
                  uppercase tracking-[0.18em]
                  text-emerald-500
                  dark:text-emerald-400
                "
              >

                <Sparkles className="h-4 w-4" />

                Applications
              </div>

              <h1
                className="
                  mt-5 text-4xl
                  font-black tracking-[-0.08em]
                  text-slate-950
                  dark:text-white
                  sm:text-5xl
                "
              >
                My Applications
              </h1>

              <p
                className="
                  mt-4 text-sm leading-7
                  text-slate-500
                  dark:text-zinc-400
                "
              >
                Track and manage all your applied jobs.
              </p>
            </div>

            {/* TOTAL */}

            <div
              className="
                rounded-[28px]
                border border-slate-200/80
                bg-white/80
                px-6 py-5
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >

              <p
                className="
                  text-[10px]
                  font-bold uppercase
                  tracking-[0.18em]
                  text-slate-400
                  dark:text-zinc-500
                "
              >
                Total Applied
              </p>

              <h2
                className="
                  mt-2 text-4xl
                  font-black tracking-[-0.08em]
                  text-slate-950
                  dark:text-white
                "
              >
                {applications.length}
              </h2>
            </div>
          </div>

          {/* LOADER */}

          {
            isLoading ? (

              <div
                className="
                  flex h-[60vh]
                  items-center justify-center
                "
              >

                <div
                  className="
                    relative h-16 w-16
                  "
                >

                  <div
                    className="
                      absolute inset-0
                      animate-spin rounded-full
                      border-2 border-emerald-500/20
                      border-t-emerald-500
                    "
                  />

                  <div
                    className="
                      absolute inset-[10px]
                      rounded-full
                      bg-emerald-500/10
                    "
                  />
                </div>
              </div>
            ) : applications.length === 0 ? (

              <div
                className="
                  mt-8 rounded-[32px]
                  border border-dashed
                  border-slate-300
                  bg-white/70
                  p-12 text-center
                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >

                <div
                  className="
                    mx-auto flex h-20 w-20
                    items-center justify-center
                    rounded-[28px]
                    bg-emerald-500/10
                    text-emerald-500
                    dark:text-emerald-400
                  "
                >

                  <Briefcase className="h-10 w-10" />
                </div>

                <h2
                  className="
                    mt-7 text-3xl
                    font-black tracking-[-0.06em]
                    text-slate-950
                    dark:text-white
                  "
                >
                  No Applications Yet
                </h2>

                <p
                  className="
                    mx-auto mt-4 max-w-lg
                    text-sm leading-8
                    text-slate-500
                    dark:text-zinc-400
                  "
                >
                  Start applying to jobs and manage
                  your recruitment journey here.
                </p>

                <Link href="/jobs">

                  <Button
                    className="
                      mt-8 h-12 rounded-2xl
                      bg-emerald-600 px-6
                      text-sm font-semibold
                      text-white
                      hover:bg-emerald-500
                    "
                  >

                    Explore Jobs

                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (

              <div
                className="
                  mt-8 grid gap-6
                "
              >

                {
                  applications.map((application) => {

                    const statusStyles =
                      getStatusStyles(
                        application.status
                      )

                    return (

                      <div
                        key={
                          application.application_id
                        }
                        className="
                          group relative overflow-hidden
                          rounded-[32px]
                          border border-slate-200/80
                          bg-white/85
                          backdrop-blur-2xl
                          transition-all duration-300
                          hover:-translate-y-0.5
                          hover:border-emerald-500/20
                          hover:bg-white
                          hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]
                          dark:border-white/10
                          dark:bg-[#0B0B0B]/90
                          dark:hover:bg-[#101010]
                          dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                        "
                      >

                        {/* TOP ACCENT */}

                        <div
                          className="
                            absolute inset-x-0 top-0 h-px
                            bg-gradient-to-r
                            from-transparent
                            via-emerald-400/40
                            to-transparent
                          "
                        />

                        <div
                          className="
                            flex flex-col gap-7
                            p-7 lg:flex-row
                            lg:items-center
                            lg:justify-between
                          "
                        >

                          {/* LEFT */}

                          <div
                            className="
                              flex min-w-0 flex-1
                              items-start gap-5
                            "
                          >

                            {/* LOGO */}

                            <div
                              className="
                                relative h-[68px] w-[68px]
                                shrink-0 overflow-hidden
                                rounded-2xl border
                                border-slate-200
                                bg-slate-50
                                dark:border-white/10
                                dark:bg-black/30
                              "
                            >

                              <Image
                                src={
                                  application.company_logo
                                }
                                alt={
                                  application.company_name
                                }
                                fill
                                className="
                                  object-cover
                                "
                              />
                            </div>

                            {/* INFO */}

                            <div className="min-w-0 flex-1">

                              {/* TOP */}

                              <div
                                className="
                                  flex flex-wrap
                                  items-center gap-3
                                "
                              >

                                <p
                                  className="
                                    truncate text-sm
                                    font-semibold
                                    text-slate-500
                                    dark:text-zinc-400
                                  "
                                >
                                  {
                                    application.company_name
                                  }
                                </p>

                                {/* STATUS */}

                                <div
                                  className={`
                                    inline-flex items-center
                                    gap-2 rounded-full
                                    border px-3 py-1
                                    text-[10px] font-bold
                                    uppercase tracking-[0.18em]
                                    ${statusStyles.badge}
                                  `}
                                >

                                  <span
                                    className={`
                                      h-2 w-2 rounded-full
                                      ${statusStyles.dot}
                                    `}
                                  />

                                  {
                                    application.status
                                  }
                                </div>
                              </div>

                              {/* TITLE */}

                              <h2
                                className="
                                  mt-4 break-words
                                  text-[30px]
                                  font-black tracking-[-0.07em]
                                  text-slate-950
                                  dark:text-white
                                "
                              >
                                {
                                  application.job_title
                                }
                              </h2>

                              {/* META */}

                              <div
                                className="
                                  mt-6 flex flex-wrap
                                  gap-3
                                "
                              >

                                {/* LOCATION */}

                                <div
                                  className="
                                    inline-flex items-center
                                    gap-2 rounded-xl
                                    border border-slate-200
                                    bg-slate-50/80
                                    px-4 py-2.5 text-sm
                                    font-medium text-slate-700
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                    dark:text-zinc-300
                                  "
                                >

                                  <MapPin
                                    className="
                                      h-4 w-4
                                      text-emerald-400
                                    "
                                  />

                                  {
                                    application.job_location
                                  }
                                </div>

                                {/* SALARY */}

                                <div
                                  className="
                                    inline-flex items-center
                                    gap-2 rounded-xl
                                    border border-slate-200
                                    bg-slate-50/80
                                    px-4 py-2.5 text-sm
                                    font-medium text-slate-700
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                    dark:text-zinc-300
                                  "
                                >

                                  <Briefcase
                                    className="
                                      h-4 w-4
                                      text-cyan-400
                                    "
                                  />

                                  ₹
                                  {
                                    Number(
                                      application.job_salary
                                    ).toLocaleString()
                                  }
                                </div>

                                {/* DATE */}

                                <div
                                  className="
                                    inline-flex items-center
                                    gap-2 rounded-xl
                                    border border-slate-200
                                    bg-slate-50/80
                                    px-4 py-2.5 text-sm
                                    font-medium text-slate-700
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                    dark:text-zinc-300
                                  "
                                >

                                  <CalendarDays
                                    className="
                                      h-4 w-4
                                      text-violet-400
                                    "
                                  />

                                  {
                                    new Date(
                                      application.applied_at
                                    ).toLocaleDateString()
                                  }
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* RIGHT */}

                          <div
                            className="
                              flex flex-col gap-3
                              sm:flex-row
                              lg:flex-col
                            "
                          >

                            {/* RESUME BUTTON */}

                            <a
                              href={
                                application.resume
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                group relative flex h-12
                                items-center justify-center
                                overflow-hidden rounded-2xl
                                border border-emerald-400/20
                                bg-[#07130F]
                                px-6 text-sm
                                font-semibold tracking-[0.02em]
                                text-white
                                shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                                transition-all duration-300
                                hover:-translate-y-0.5
                                hover:border-emerald-400/40
                                hover:bg-[#0A1B15]
                              "
                            >

                              <div
                                className="
                                  absolute inset-0
                                  translate-x-[-120%]
                                  bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)]
                                  transition-transform duration-1000
                                  group-hover:translate-x-[120%]
                                "
                              />

                              <span
                                className="
                                  relative z-10
                                  flex items-center gap-2
                                "
                              >

                                <FileText
                                  className="
                                    h-4 w-4
                                    text-emerald-400
                                  "
                                />

                                View Resume

                                <ExternalLink
                                  className="
                                    h-4 w-4
                                    text-emerald-400
                                  "
                                />
                              </span>
                            </a>

                            {/* EMAIL */}

                            <div
                              className="
                                flex items-center gap-3
                                rounded-2xl border
                                border-slate-200
                                bg-slate-50/80
                                px-4 py-3.5
                                dark:border-white/10
                                dark:bg-white/[0.03]
                              "
                            >

                              <div
                                className="
                                  flex h-10 w-10
                                  items-center justify-center
                                  rounded-xl
                                  bg-emerald-500/10
                                "
                              >

                                <FileText
                                  className="
                                    h-4 w-4
                                    text-emerald-400
                                  "
                                />
                              </div>

                              <div className="min-w-0">

                                <p
                                  className="
                                    text-[10px]
                                    font-bold uppercase
                                    tracking-[0.18em]
                                    text-slate-400
                                    dark:text-zinc-500
                                  "
                                >
                                  Applied Using
                                </p>

                                <p
                                  className="
                                    truncate text-sm
                                    font-medium
                                    text-slate-700
                                    dark:text-zinc-300
                                  "
                                >
                                  {
                                    application.applicant_email
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        </div>
      </section>
    </AppBackground>
  )
}

export default ApplicationsPage