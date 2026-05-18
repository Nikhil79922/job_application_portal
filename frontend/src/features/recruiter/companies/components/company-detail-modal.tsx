/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { createPortal } from "react-dom"

import type {
  Company,
  CompanyJob,
} from "../types/company.types"

import {
  useCompanyDetail,
} from "../hooks/use-company-detail"

import { Button } from "@/components/ui/button"

interface Props {
  companyId: number | null
  onClose: () => void
}

function StatusBadge({
  status,
}: {
  status: Company["logo_upload_status"]
}) {

  const map = {

    success: {
      bg: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
      label: "Logo Active",
    },

    pending: {
      bg: "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
      label: "Uploading...",
    },

    fail: {
      bg: "border border-red-500/20 bg-red-500/10 text-red-400",
      label: "Upload Failed",
    },
  }

  const {
    bg,
    label,
  } = map[status]

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${bg}`}
    >
      {label}
    </span>
  )
}

function WorkLocationBadge({
  type,
}: {
  type: CompanyJob["work_location"]
}) {

  const map: Record<
    CompanyJob["work_location"],
    string
  > = {

    "On-site":
      "border border-slate-300 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300",

    Remote:
      "border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",

    Hybrid:
      "border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[type]}`}
    >
      {type}
    </span>
  )
}

function JobTypeBadge({
  type,
}: {
  type: CompanyJob["job_type"]
}) {

  return (
    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
      {type}
    </span>
  )
}

function JobCard({
  job,
}: {
  job: CompanyJob
}) {

  const [
    expanded,
    setExpanded,
  ] = useState(false)

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-500/20">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            {job.title}
          </h4>

          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            {job.role}
          </p>
        </div>

        <div
          className={`h-3 w-3 rounded-full ${job.is_active
              ? "bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.7)]"
              : "bg-zinc-400"
            }`}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">

        <WorkLocationBadge
          type={job.work_location}
        />

        <JobTypeBadge
          type={job.job_type}
        />

        <span className="text-xs text-slate-500 dark:text-zinc-500">
          {job.location}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between">

        <div className="flex gap-6">

          <div>

            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500">
              Salary
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              ${job.salary.toLocaleString()}

              <span className="ml-1 text-xs font-normal text-slate-400">
                /yr
              </span>
            </p>
          </div>

          <div>

            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500">
              Openings
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              {job.openings}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setExpanded(
              (v) => !v
            )
          }
          className="text-xs cursor-pointer font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-500 dark:text-emerald-400"
        >
          {
            expanded
              ? "Hide Details ↑"
              : "View Details ↓"
          }
        </button>
      </div>

      {
        expanded && (

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300">

            {job.description}
          </div>
        )
      }
    </div>
  )
}

export default function CompanyDetailModal({
  companyId,
  onClose,
}: Props) {

  const {
    company,
    isLoading,
    isError,
  } = useCompanyDetail({
    companyId,
  })

  const [
    mounted,
    setMounted,
  ] = useState(false)

  useEffect(() => {

    setMounted(true)

  }, [])

  if (!mounted) {
    return null
  }

  if (
    companyId === null ||
    companyId === undefined
  ) {
    return null
  }

  return createPortal(

    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={(e) =>
        e.target === e.currentTarget &&
        onClose()
      }
    >

      <div className="hide-scrollbar relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#111111]">

        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-5 backdrop-blur-sm dark:border-white/10 dark:bg-[#111111]/90">

          <div>

            <h2 className="text-lg font-black tracking-[-0.04em] text-slate-950 dark:text-white">
              Company Details
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
              Explore company workspace and openings
            </p>
          </div>

          <Button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-500 transition-transform duration-300 hover:rotate-90 hover:bg-slate-200 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:bg-white/[0.08]"
          >
            ✕
          </Button>
        </div>

        <div className="space-y-8 p-6">

{
  company &&
  !isLoading && (

    <>
      {/* COMPANY HEADER */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

        {
          company.logo &&
          company.logo_upload_status === "success" ? (

            <img
              src={company.logo}
              alt={company.name}
              className="h-24 w-24 rounded-3xl border border-slate-200 object-cover dark:border-white/10"
            />
          ) : (

            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10">

              <span className="text-3xl font-black text-emerald-500">
                {
                  company.name
                    .charAt(0)
                    .toUpperCase()
                }
              </span>
            </div>
          )
        }

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="truncate text-2xl font-black tracking-[-0.05em] text-slate-950 dark:text-white">
              {company.name}
            </h3>

            <StatusBadge
              status={
                company.logo_upload_status
              }
            />
          </div>

          {
            company.website && (

              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors duration-300 hover:text-emerald-500 dark:text-emerald-400"
              >
                {
                  company.website.replace(
                    /^https?:\/\//,
                    "",
                  )
                }
              </a>
            )
          }
        </div>
      </div>

      {/* COMPANY DESCRIPTION */}

      {
        company.description && (

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-zinc-500">
              About Company
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-zinc-300">
              {company.description}
            </p>
          </div>
        )
      }

      {/* COMPANY STATS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">

          <p className="text-xs uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
            Company ID
          </p>

          <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
            #{company.company_id}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">

          <p className="text-xs uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
            Recruiter ID
          </p>

          <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
            #{company.recruiter_id}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">

          <p className="text-xs uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
            Open Positions
          </p>

          <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
            {
              company.jobs?.length || 0
            }
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">

          <p className="text-xs uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
            Created
          </p>

          <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
            {
              new Date(
                company.created_at
              ).toLocaleDateString()
            }
          </p>
        </div>
      </div>

      {/* JOB SECTION */}

      <div>

        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <h4 className="text-lg font-black tracking-[-0.04em] text-slate-950 dark:text-white">
              Job Listings
            </h4>

            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">

              {
                company.jobs?.length || 0
              } Active
            </div>
          </div>

          <Link href="/recruiter/jobs">

            <Button
              className="
                group relative flex h-11 items-center justify-center
                overflow-hidden rounded-xl
                border border-emerald-400/20
                bg-[#07130F]
                px-6
                text-sm font-medium tracking-[0.02em] text-white
                shadow-[0_4px_20px_rgba(0,0,0,0.35)]
                transition-all duration-300 ease-out
                hover:border-emerald-400/40
                hover:bg-[#0A1B15]
                hover:shadow-[0_10px_35px_rgba(16,185,129,0.18)]
                active:scale-[0.985]
              "
            >

              <div
                className="
                  absolute inset-0 opacity-0
                  transition-opacity duration-300
                  group-hover:opacity-100
                "
              >
                <div
                  className="
                    absolute inset-y-0 left-0 w-[40%]
                    bg-emerald-400/15 blur-2xl
                  "
                />
              </div>

              <div
                className="
                  absolute inset-x-0 top-0 h-px
                  bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent
                "
              />

              <div
                className="
                  absolute inset-0
                  translate-x-[-120%]
                  bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)]
                  transition-transform duration-1000
                  group-hover:translate-x-[120%]
                "
              />

              <span className="relative z-10 flex items-center gap-2">

                <span className="text-emerald-50">
                  Manage Jobs
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="
                    h-4 w-4 text-emerald-400
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m13 6 6 6-6 6"
                  />
                </svg>
              </span>
            </Button>
          </Link>
        </div>

        {
          company.jobs &&
          company.jobs.length > 0 ? (

            <div className="space-y-4">

              {
                company.jobs.map(
                  (job) => (

                    <JobCard
                      key={job.job_id}
                      job={job}
                    />
                  )
                )
              }
            </div>
          ) : (

            <div className="rounded-3xl border border-dashed border-slate-300 py-16 text-center dark:border-white/10">

              <p className="text-sm text-slate-500 dark:text-zinc-500">
                No job listings yet
              </p>
            </div>
          )
        }
      </div>
    </>
  )
}
</div>
      </div>
    </div>,

    document.body
  )
} 