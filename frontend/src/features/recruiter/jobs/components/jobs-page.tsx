// src/features/jobs/components/jobs-page-view.tsx

/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CirclePlus,
  Users,
} from "lucide-react"
import { useCompanyDetail } from "../../companies/hooks/use-company-detail"
import type { CompanyJob } from "../../companies/types/company.types"
import JobForm from "./job-form"
import UpdateJobForm from "./update-job-form"
import { JobCard } from "./job-card"
import { ModalShell } from "./job-modalshell"
import AppBackground from "@/components/shared/app-background"

/* ═══════════════════════════════════════════════════════════ */
/*  Main page                                                  */
/* ═══════════════════════════════════════════════════════════ */

export default function JobsPageView() {
  const params    = useParams()
  const router    = useRouter()

  // Route: /recruiter/jobs/[companyId]
  const companyId = Number(params?.companyId) || null

  const { company, isLoading, isError } = useCompanyDetail({ companyId })

  const [createOpen,  setCreateOpen]  = useState(false)
  const [selectedJob, setSelectedJob] = useState<CompanyJob | null>(null)

  const jobs: CompanyJob[] = company?.jobs || []

  /* ── loading ── */
  if (isLoading) {
    return (
      <AppBackground>
        <div className="relative flex min-h-screen items-center justify-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/[0.05] blur-xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/[0.04] blur-xl" />
          </div>
          <div className="relative flex flex-col items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-[30px] border border-emerald-200 bg-emerald-50 shadow-[0_0_40px_rgba(16,185,129,0.12)] dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              <BriefcaseBusiness className="h-11 w-11 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-black tracking-[-0.06em] text-slate-900 dark:text-white">
                Loading Jobs
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">
                Fetching company data…
              </p>
            </div>
          </div>
        </div>
      </AppBackground>
    )
  }

  /* ── error / not found ── */
  if (isError || !company) {
    return (
      <AppBackground>
        <div className="relative flex min-h-screen items-center justify-center px-6">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-500/[0.04] blur-xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-red-500/[0.03] blur-xl" />
          </div>

          <div className="relative w-full max-w-lg overflow-hidden rounded-[34px] border border-slate-200 bg-white/80 p-10 shadow-[0_25px_80px_rgba(15,23,42,0.07)] backdrop-blur-md dark:border-white/10 dark:bg-[#111111]/80">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-red-200 bg-red-50 dark:border-red-500/15 dark:bg-red-500/10">
                <Building2 className="h-10 w-10 text-red-500 dark:text-red-400" />
              </div>
              <h2 className="mt-8 text-3xl font-black tracking-[-0.07em] text-slate-900 dark:text-white">
                Company Not Found
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-zinc-400">
                This company doesn&apos;t exist or failed to load. Go back and select a valid company.
              </p>
              <button
                onClick={() => router.push("/recruiter/jobs")}
                className="
                  group relative mt-8 flex h-12 w-full items-center justify-center gap-2
                  overflow-hidden rounded-2xl
                  border border-emerald-200 bg-emerald-50
                  text-sm font-semibold text-emerald-800
                  transition-all duration-300
                  hover:border-emerald-300 hover:bg-emerald-100
                  dark:border-emerald-400/20 dark:bg-[#07130F] dark:text-white
                  dark:hover:border-emerald-400/40 dark:hover:bg-[#0A1B15]
                "
              >
                <ArrowLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Back to Companies
              </button>
            </div>
          </div>
        </div>
      </AppBackground>
    )
  }

  /* ── main ── */
  return (
    <AppBackground>
      <div className="min-h-screen">

        {/* ════════════════════════
            HERO
        ════════════════════════ */}
        <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/[0.06]">

          {/* ambient blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/[0.05] blur-xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/[0.04] blur-xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">

            {/* back link */}
            <button
              onClick={() => router.push("/recruiter/jobs")}
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4" />
              All Companies
            </button>

            {/* hero card */}
            <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white/80 shadow-[0_25px_80px_rgba(15,23,42,0.07)] backdrop-blur-md dark:border-white/10 dark:bg-[#111111]/80">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-cyan-500/[0.04]" />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

              <div className="relative z-10 p-7 lg:p-8">
                <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

                  {/* LEFT */}
                  <div className="flex items-start gap-5">
                    {/* logo */}
                    {company.logo && company.logo_upload_status === "success" ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-24 w-24 rounded-[28px] border border-slate-200 object-cover shadow-lg dark:border-white/10"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-emerald-200 bg-emerald-50 dark:border-emerald-500/15 dark:bg-emerald-500/10">
                        <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                          {company.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* info */}
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <BriefcaseBusiness className="h-3.5 w-3.5" />
                        Company Jobs
                      </div>

                      <h1 className="mt-5 text-4xl font-black tracking-[-0.08em] text-slate-900 dark:text-white">
                        {company.name}
                      </h1>

                      <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-zinc-500">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-emerald-500" />
                          Recruiter Dashboard
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-cyan-500" />
                          {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — post job button */}
                  <button
                    onClick={() => setCreateOpen(true)}
                    className="
                      group relative flex h-12 cursor-pointer items-center gap-2.5
                      overflow-hidden rounded-2xl
                      border border-emerald-400/20 bg-[#07130F]
                      px-6 text-sm font-semibold text-white
                      shadow-[0_4px_20px_rgba(0,0,0,0.35)]
                      transition-all duration-300
                      hover:-translate-y-0.5 hover:border-emerald-400/40
                      hover:bg-[#0A1B15] hover:shadow-[0_10px_35px_rgba(16,185,129,0.2)]
                    "
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
                    <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.07),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
                    <CirclePlus className="relative h-4 w-4 text-emerald-400" />
                    <span className="relative text-emerald-50">Post New Job</span>
                    <ArrowUpRight className="relative h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════
            JOB GRID
        ════════════════════════ */}
        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

          {jobs.length === 0 ? (
            /* empty state */
            <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 py-24 text-center dark:border-white/10">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-emerald-200 bg-emerald-50 dark:border-emerald-500/15 dark:bg-emerald-500/10">
                <BriefcaseBusiness className="h-9 w-9 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="mt-6 text-xl font-black tracking-[-0.05em] text-slate-900 dark:text-white">
                No jobs yet
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-600">
                Post the first position for {company.name}
              </p>
              <button
                onClick={() => setCreateOpen(true)}
                className="
                  cursor-pointer mt-6 flex items-center gap-2 rounded-2xl
                  border border-emerald-200 bg-emerald-50
                  px-5 py-2.5 text-sm font-semibold text-emerald-800
                  transition-all hover:bg-emerald-100
                  dark:border-emerald-400/20 dark:bg-[#07130F] dark:text-emerald-50
                  dark:hover:bg-[#0A1B15]
                "
              >
                <CirclePlus className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Post a Job
              </button>
            </div>
          ) : (
            <>
              {/* section heading */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black tracking-[-0.05em] text-slate-900 dark:text-white">
                    All Positions
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
                    {jobs.filter((j) => j.is_active).length} active · {jobs.length} total
                  </p>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {jobs.map((job) => (
                  <JobCard key={job.job_id} job={job} onEdit={setSelectedJob} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* ════════════════════════
            CREATE MODAL
        ════════════════════════ */}
        <ModalShell
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          pill="New Listing"
          title="Post New Position"
          subtitle="Publish a professional listing that attracts the right candidates."
        >
          <JobForm companyId={company.company_id} />
        </ModalShell>

        {/* ════════════════════════
            UPDATE MODAL
        ════════════════════════ */}
        <ModalShell
          open={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          pill="Edit Listing"
          title="Edit Position"
          subtitle="Modify and republish this job listing for candidates."
        >
          {selectedJob && <UpdateJobForm job={selectedJob} />}
        </ModalShell>

        <div className="h-16" />
      </div>
    </AppBackground>
  )
}