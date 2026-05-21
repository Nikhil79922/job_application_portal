/* eslint-disable react-hooks/set-state-in-effect */
// src/features/jobs/components/jobs-page-view.tsx

"use client"
import { useSearchParams } from "next/navigation"

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CirclePlus,
  Users,
} from "lucide-react"

import { useCompanyDetail } from "../../companies/hooks/use-company-detail"

import type {
  CompanyJob,
} from "../../companies/types/company.types"

import JobForm from "./job-form"
import UpdateJobForm from "./update-job-form"

import { JobCard } from "./job-card"
import { useState } from "react"
import { ModalShell } from "./job-modalshell"
import AppBackground from "@/components/shared/app-background"

/* MAIN PAGE */

export default function JobsPageView() {

  const searchParams =
    useSearchParams()

  const companyId =
    Number(
      searchParams.get(
        "companyId"
      )
    ) || null

  const {
    company,
    isLoading,
    isError,
  } = useCompanyDetail({
    companyId,
  })

  const [
    createOpen,
    setCreateOpen,
  ] = useState(false)

  const [
    selectedJob,
    setSelectedJob,
  ] = useState<
    CompanyJob | null
  >(null)

  const jobs:
    CompanyJob[] =
      company?.jobs || []

  if (
    isLoading
  ) {
    return null
  }

  if (
    isError ||
    !company
  ) {
    return null
  }

  return (
<AppBackground >
    <div
      className="
        min-h-screen
      "
    >

      {/* HERO */}

      <section
        className="
          relative overflow-hidden
          border-b border-slate-200
          dark:border-white/[0.06]
        "
      >

        {/* BG */}

        <div
          className="
            pointer-events-none
            absolute inset-0
          "
        >

          <div
            className="
              absolute left-0 top-0
              h-72 w-72
              rounded-full
              bg-emerald-500/[0.05]
              blur-xl
            "
          />

          <div
            className="
              absolute bottom-0 right-0
              h-80 w-80
              rounded-full
              bg-cyan-500/[0.04]
              blur-xl
            "
          />
        </div>

        <div
          className="
            relative z-10
            mx-auto max-w-7xl
            px-5 py-8
            lg:px-8
          "
        >

          <div
            className="
              relative overflow-hidden
              rounded-[34px]
              border border-slate-200
              bg-white/80
              shadow-[0_25px_80px_rgba(15,23,42,0.07)]
              backdrop-blur-md
              dark:border-white/10
              dark:bg-[#111111]/80
            "
          >

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
                relative z-10
                p-7 lg:p-8
              "
            >

              <div
                className="
                  flex flex-col gap-8
                  xl:flex-row
                  xl:items-center
                  xl:justify-between
                "
              >

                {/* LEFT */}

                <div
                  className="
                    flex items-start gap-5
                  "
                >

                  {/* LOGO */}

                  {
                    company.logo &&
                    company.logo_upload_status === "success" ? (

                      <img
                        src={company.logo}
                        alt={company.name}
                        className="
                          h-24 w-24
                          rounded-[28px]
                          border border-slate-200
                          object-cover
                          shadow-lg
                          dark:border-white/10
                        "
                      />
                    ) : (

                      <div
                        className="
                          flex h-24 w-24
                          items-center justify-center
                          rounded-[28px]
                          border border-emerald-200
                          bg-emerald-50
                          dark:border-emerald-500/15
                          dark:bg-emerald-500/10
                        "
                      >

                        <span
                          className="
                            text-3xl font-black
                            text-emerald-600
                            dark:text-emerald-400
                          "
                        >
                          {
                            company.name
                              .charAt(0)
                              .toUpperCase()
                          }
                        </span>
                      </div>
                    )
                  }

                  {/* INFO */}

                  <div>

                    <div
                      className="
                        inline-flex items-center
                        gap-2 rounded-full
                        border border-emerald-200
                        bg-emerald-50
                        px-4 py-1.5
                        text-[11px]
                        font-bold uppercase
                        tracking-[0.14em]
                        text-emerald-700
                        dark:border-emerald-500/10
                        dark:bg-emerald-500/10
                        dark:text-emerald-400
                      "
                    >

                      <BriefcaseBusiness
                        className="
                          h-3.5 w-3.5
                        "
                      />

                      Company Jobs
                    </div>

                    <h1
                      className="
                        mt-5 text-4xl
                        font-black
                        tracking-[-0.08em]
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {company.name}
                    </h1>

                    <div
                      className="
                        mt-4 flex flex-wrap
                        items-center gap-5
                        text-sm text-slate-500
                        dark:text-zinc-500
                      "
                    >

                      <div
                        className="
                          flex items-center gap-2
                        "
                      >

                        <Building2
                          className="
                            h-4 w-4
                            text-emerald-500
                          "
                        />

                        Recruiter Dashboard
                      </div>

                      <div
                        className="
                          flex items-center gap-2
                        "
                      >

                        <Users
                          className="
                            h-4 w-4
                            text-cyan-500
                          "
                        />

                        {jobs.length} Jobs
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <button
                  onClick={() =>
                    setCreateOpen(true)
                  }
                  className="
                  cursor-pointer
                    group relative
                    flex h-12
                    items-center gap-2.5
                    overflow-hidden
                    rounded-2xl
                    border border-emerald-400/20
                    bg-[#07130F]
                    px-6 text-sm
                    font-semibold text-white
                    shadow-[0_4px_20px_rgba(0,0,0,0.35)]
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:border-emerald-400/40
                    hover:bg-[#0A1B15]
                    hover:shadow-[0_10px_35px_rgba(16,185,129,0.2)]
                  "
                >

                  <div
                    className="
                      absolute inset-x-0 top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-emerald-300/40
                      to-transparent
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      translate-x-[-120%]
                      bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.07),transparent)]
                      transition-transform duration-700
                      group-hover:translate-x-[120%]
                    "
                  />

                  <CirclePlus
                    className="
                      relative h-4 w-4
                      text-emerald-400
                    "
                  />

                  <span
                    className="
                      relative text-emerald-50
                    "
                  >
                    Post New Job
                  </span>

                  <ArrowUpRight
                    className="
                      relative h-4 w-4
                      text-emerald-400
                    "
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOB GRID */}

      <section
        className="
          mx-auto max-w-7xl
          px-4 py-10
          md:px-6
        "
      >

        <div
          className="
            grid gap-5
            lg:grid-cols-2
            xl:grid-cols-3
          "
        >

          {
            jobs.map(
              (job) => (

                <JobCard
                  key={job.job_id}
                  job={job}
                  onEdit={
                    setSelectedJob
                  }
                />
              )
            )
          }
        </div>
      </section>

      {/* CREATE */}

      <ModalShell
        open={createOpen}
        onClose={() =>
          setCreateOpen(false)
        }
        pill="New Listing"
        title="Post New Position"
        subtitle="Publish a professional listing that attracts the right candidates."
      >

        <JobForm
          companyId={
            company.company_id
          }
        />
      </ModalShell>

      {/* UPDATE */}

      <ModalShell
        open={!!selectedJob}
        onClose={() =>
          setSelectedJob(null)
        }
        pill="Edit Listing"
        title="Edit Position"
        subtitle="Modify and republish this job listing for candidates."
      >

        {
          selectedJob && (

            <UpdateJobForm
            job={selectedJob}
          />
          )
        }
      </ModalShell>
    </div>
    </AppBackground>
  )
}