/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import {
  Building2, Calendar, ExternalLink, Globe,
  MapPin, Briefcase, Users, X, Sparkles,
  TrendingUp, DollarSign, Loader2, AlertCircle,
} from "lucide-react"
import { createPortal } from "react-dom"
import { useEffect } from "react"
import { useCompanyDetail } from "../hooks/use-company-detail"
import { formatDate, formatWebsiteDisplay, getCompanyInitials } from "../utils/company.utils"

interface Props {
  open: boolean
  companyId: number | null
  onClose: () => void
}

export default function CompanyDetailModal({ open, companyId, onClose }: Props) {
  // Pass companyId directly — enabled: !!companyId handles the null case inside the hook.
  // Do NOT gate with `open` here; we want the query to fire the moment companyId is set,
  // which happens at the same time open becomes true.
  const { company, isLoading, isError } = useCompanyDetail({ companyId })

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const jobs = company?.jobs ?? []

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[32px] border border-white/10 shadow-[0_-20px_80px_rgba(0,0,0,0.6)] sm:rounded-[32px]"
        style={{ background: "linear-gradient(145deg, #141414 0%, #0d0d0d 60%, #111810 100%)" }}
      >
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* ── STICKY HEADER ── */}
        <div className="relative z-10 shrink-0 border-b border-white/[0.06] px-6 py-5">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]">
              {company?.logo ? (
                <Image src={company.logo} alt={company.name} fill className="object-cover" />
              ) : (
                <span className="text-lg font-black text-zinc-400">
                  {company ? getCompanyInitials(company.name) : "…"}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-400">
                <Sparkles className="h-3 w-3" />
                Recruiter Workspace
              </div>
              <h2 className="mt-1 truncate text-2xl font-black tracking-[-1px] text-white">
                {isLoading
                  ? <span className="inline-block h-6 w-48 animate-pulse rounded-lg bg-white/10" />
                  : company?.name ?? "—"
                }
              </h2>
            </div>

            {/* Close — plain button, NOT shadcn Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-zinc-400 transition-all hover:bg-white/[0.10] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="relative z-10 flex-1 overflow-y-auto">

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <p className="text-sm font-medium text-zinc-500">Loading company details…</p>
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="text-sm font-medium text-zinc-400">Failed to load company details.</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/[0.10]"
              >
                Close
              </button>
            </div>
          )}

          {/* Content */}
          {!isLoading && !isError && company && (
            <>
              {/* COMPANY INFO */}
              <div className="px-6 py-6">
                <p className="text-sm leading-7 text-zinc-400">{company.description}</p>

                {/* META PILLS */}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400"
                  >
                    <Globe className="h-3.5 w-3.5 text-emerald-500" />
                    {formatWebsiteDisplay(company.website)}
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>

                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300">
                    <Calendar className="h-3.5 w-3.5 text-cyan-500" />
                    {formatDate(company.created_at)}
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300">
                    <Users className="h-3.5 w-3.5 text-violet-400" />
                    Recruiter ID: {company.recruiter_id}
                  </div>
                </div>

                {/* STATS */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Open Jobs</span>
                    </div>
                    <p className="mt-2 text-3xl font-black tracking-[-2px] text-white">{jobs.length}</p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Openings</span>
                    </div>
                    <p className="mt-2 text-3xl font-black tracking-[-2px] text-white">
                      {jobs.reduce((acc, j) => acc + (j.openings || 0), 0)}
                    </p>
                  </div>

                  <div className="col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 sm:col-span-1">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Avg. Salary</span>
                    </div>
                    <p className="mt-2 text-3xl font-black tracking-[-2px] text-white">
                      {jobs.length > 0
                        ? `₹${Math.round(jobs.reduce((acc, j) => acc + Number(j.salary || 0), 0) / jobs.length).toLocaleString()}`
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* JOBS */}
              <div className="border-t border-white/[0.06] px-6 py-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black tracking-[-0.8px] text-white">Open Positions</h3>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-zinc-400">
                    {jobs.length} {jobs.length === 1 ? "role" : "roles"}
                  </div>
                </div>

                {/* Empty */}
                {!jobs.length && (
                  <div className="mt-5 rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
                    <Building2 className="mx-auto h-10 w-10 text-zinc-700" />
                    <h4 className="mt-4 text-base font-black text-white">No Positions Yet</h4>
                    <p className="mt-1.5 text-sm text-zinc-500">This company doesn't have any active job listings.</p>
                  </div>
                )}

                {/* Job cards */}
                {jobs.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {jobs.map((job) => (
                      <div
                        key={job.job_id}
                        className="group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:border-emerald-500/20 hover:bg-white/[0.05]"
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="relative">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h4 className="truncate text-base font-black tracking-[-0.4px] text-white">{job.title}</h4>
                              <p className="mt-0.5 text-sm font-semibold text-emerald-400">{job.role}</p>
                            </div>
                            <div className="shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                              {job.job_type}
                            </div>
                          </div>

                          <p className="mt-3 line-clamp-2 text-xs leading-5 text-zinc-500">{job.description}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-xs font-semibold text-zinc-400">
                              <MapPin className="h-3 w-3 text-cyan-500" />
                              {job.location}
                            </div>
                            <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-xs font-semibold text-zinc-400">
                              <Briefcase className="h-3 w-3 text-violet-400" />
                              {job.work_location}
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                            <p className="text-base font-black tracking-[-0.5px] text-white">
                              ₹{Number(job.salary).toLocaleString()}
                              <span className="ml-1 text-xs font-medium text-zinc-500">/yr</span>
                            </p>
                            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs font-bold text-zinc-400">
                              {job.openings} {job.openings === 1 ? "opening" : "openings"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}