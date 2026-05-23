// src/features/jobs/components/jobs-index-view.tsx

"use client"

import { useRouter } from "next/navigation"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Globe,
  Loader2,
  AlertTriangle,
  Sparkles,
  Users,
} from "lucide-react"
import { useCompanies } from "../../companies/hooks/use-companies"
import AppBackground from "@/components/shared/app-background"
import type { Company } from "../../companies/types/company.types"

/* ─────────────────────────────────────────────────────────── */
/*  Logo upload status indicator                               */
/* ─────────────────────────────────────────────────────────── */

function LogoStatus({ status }: { status: Company["logo_upload_status"] }) {
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-yellow-700 dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-400">
        <Loader2 className="h-2.5 w-2.5 animate-spin" />
        Processing
      </span>
    )
  }
  if (status === "fail") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
        <AlertTriangle className="h-2.5 w-2.5" />
        Logo Failed
      </span>
    )
  }
  return null
}

/* ─────────────────────────────────────────────────────────── */
/*  Company card                                               */
/* ─────────────────────────────────────────────────────────── */

function CompanySelectCard({
  company,
  onSelect,
}: {
  company: Company
  onSelect: (id: number) => void
}) {

  return (
    <button
      onClick={() => onSelect(company.company_id)}
      className="
        cursor-pointer group relative w-full overflow-hidden
        rounded-[28px] border border-slate-200
        bg-white/80 p-6 text-left
        shadow-[0_8px_30px_rgba(15,23,42,0.06)]
        backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-emerald-300/60
        hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]
        dark:border-white/10
        dark:bg-white/[0.03]
        dark:hover:border-emerald-500/30
        dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
      "
    >
      {/* top hover line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/0 to-transparent transition-all duration-300 group-hover:via-emerald-400/60 dark:group-hover:via-emerald-400/50" />

      {/* inner ambient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.00] via-transparent to-cyan-500/[0.00] opacity-0 transition-opacity duration-300 group-hover:from-emerald-500/[0.04] group-hover:to-cyan-500/[0.03] group-hover:opacity-100" />

      <div className="relative z-10">
        {/* logo + name row */}
        <div className="flex items-start gap-4">
          {/* logo */}
          <div className="relative shrink-0">
            {company.logo && company.logo_upload_status === "success" ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-16 w-16 rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-white/10"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/15 dark:bg-emerald-500/10">
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                  {company.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {company.logo_upload_status === "success" && company.logo && (
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-sm dark:border-[#111111]">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          {/* text */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="truncate text-lg font-black tracking-[-0.05em] text-slate-900 dark:text-white">
                {company.name}
              </h3>
              <LogoStatus status={company.logo_upload_status} />
            </div>

            {company.website && (
              <p className="mt-1 flex items-center gap-1 truncate text-xs font-medium text-slate-400 dark:text-zinc-500">
                <Globe className="h-3 w-3 shrink-0 text-emerald-500" />
                {company.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </p>
            )}
          </div>
        </div>

        {/* description */}
        {company.description && (
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">
            {company.description}
          </p>
        )}

        {/* footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
          <div className="flex items-center gap-4">
       

            {/* created date */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-zinc-500">
              <Clock3 className="h-3.5 w-3.5 text-violet-400" />
              {new Date(company.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          {/* CTA arrow */}
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400 transition-all duration-300 group-hover:border-emerald-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 dark:border-white/10 dark:bg-white/[0.03] dark:group-hover:border-emerald-500/30 dark:group-hover:bg-emerald-500/10 dark:group-hover:text-emerald-400">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </button>
  )
}

/* ─────────────────────────────────────────────────────────── */
/*  Skeleton card                                              */
/* ─────────────────────────────────────────────────────────── */

function SkeletonCard() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/[0.06]" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-2/3 animate-pulse rounded-xl bg-slate-200 dark:bg-white/[0.06]" />
          <div className="h-3.5 w-1/2 animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.04]" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.04]" />
        <div className="h-3.5 w-5/6 animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.04]" />
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
        <div className="h-3.5 w-24 animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.04]" />
        <div className="h-8 w-8 animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.04]" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/*  Main view                                                  */
/* ─────────────────────────────────────────────────────────── */

export default function JobsIndexView() {
  const router = useRouter()
  const { data: companies, isLoading, isError } = useCompanies()

  const handleSelect = (companyId: number) => {
    router.push(`/recruiter/jobs/${companyId}`)
  }

  const totalJobs = companies?.reduce(
    (sum, c) => sum + (c.jobs?.length ?? 0),
    0
  ) ?? 0

  return (
    <AppBackground>
      <section className="relative min-h-screen overflow-x-hidden">

        {/* page-level ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/[0.05] blur-xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/[0.04] blur-xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">

          {/* ════════════════════════
              HERO CARD
          ════════════════════════ */}
          <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white/80 shadow-[0_25px_80px_rgba(15,23,42,0.07)] backdrop-blur-md dark:border-white/10 dark:bg-[#111111]/80">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-cyan-500/[0.04]" />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

            <div className="relative z-10 p-7 lg:p-8">
              <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

                {/* LEFT */}
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    Recruiter Workspace
                  </div>

                  <h1 className="mt-5 text-4xl font-black tracking-[-0.08em] text-slate-950 dark:text-white lg:text-5xl">
                    Jobs Management
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-zinc-400">
                    Select a company below to view and manage its job listings,
                    post new positions, and track your hiring pipeline.
                  </p>

                  {/* STATS */}
                  <div className="mt-7 grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        icon: Building2,
                        color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
                        label: "Companies",
                        value: isLoading ? "—" : String(companies?.length ?? 0),
                      },
                      {
                        icon: BriefcaseBusiness,
                        color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
                        label: "Total Jobs",
                        value: isLoading ? "—" : String(totalJobs),
                      },
                      {
                        icon: Users,
                        color: "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
                        label: "Active Listings",
                        value: isLoading
                          ? "—"
                          : String(
                              companies?.reduce(
                                (sum, c) =>
                                  sum + (c.jobs?.filter((j) => j.is_active).length ?? 0),
                                0
                              ) ?? 0
                            ),
                      },
                    ].map(({ icon: Icon, color, label, value }) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-zinc-500">
                              {label}
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                              {value}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — decorative prompt */}
                <div className="hidden xl:flex xl:shrink-0 xl:flex-col xl:items-center xl:gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-emerald-200 bg-emerald-50 shadow-[0_8px_30px_rgba(16,185,129,0.12)] dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:shadow-[0_8px_30px_rgba(16,185,129,0.10)]">
                    <BriefcaseBusiness className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-center text-xs font-semibold text-slate-400 dark:text-zinc-600">
                    Select a company<br />to manage jobs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════
              SECTION HEADING
          ════════════════════════ */}
          <div className="mt-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-[-0.06em] text-slate-900 dark:text-white">
                Your Companies
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
                Click any company to open its job management workspace
              </p>
            </div>

            {!isLoading && companies && companies.length > 0 && (
              <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-bold text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400">
                {companies.length} {companies.length === 1 ? "company" : "companies"}
              </span>
            )}
          </div>

          {/* ════════════════════════
              LOADING
          ════════════════════════ */}
          {isLoading && (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* ════════════════════════
              ERROR
          ════════════════════════ */}
          {isError && !isLoading && (
            <div className="mt-6 flex flex-col items-center justify-center rounded-[28px] border border-red-200 bg-red-50/50 py-16 text-center dark:border-red-500/15 dark:bg-red-500/[0.05]">
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-red-200 bg-red-100 dark:border-red-500/20 dark:bg-red-500/10">
                <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400" />
              </div>
              <p className="mt-4 font-black tracking-[-0.04em] text-slate-900 dark:text-white">
                Failed to load companies
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">
                Check your connection and refresh the page
              </p>
            </div>
          )}

          {/* ════════════════════════
              EMPTY STATE
          ════════════════════════ */}
          {!isLoading && !isError && companies?.length === 0 && (
            <div className="mt-6 flex flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 py-24 text-center dark:border-white/10">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-emerald-200 bg-emerald-50 dark:border-emerald-500/15 dark:bg-emerald-500/10">
                <Building2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="mt-6 text-xl font-black tracking-[-0.05em] text-slate-900 dark:text-white">
                No companies yet
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">
                Create a company first, then manage its job listings here
              </p>
            </div>
          )}

          {/* ════════════════════════
              COMPANY GRID
          ════════════════════════ */}
          {!isLoading && !isError && companies && companies.length > 0 && (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {companies.map((company) => (
                <CompanySelectCard
                  key={company.company_id}
                  company={company}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}

          {/* bottom breathing room */}
          <div className="h-16" />
        </div>
      </section>
    </AppBackground>
  )
}