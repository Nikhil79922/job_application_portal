  "use client"

  import { useState, useRef, useEffect } from "react"
  import Image from "next/image"
  import {
    Globe, Trash2, Loader2, AlertTriangle,
    MoreVertical, ExternalLink, Calendar, Eye,
  } from "lucide-react"
  import type { Company } from "../types/company.types"
  import { formatDate, formatWebsiteDisplay, getCompanyInitials } from "../utils/company.utils"
  import { useCompanyLogoPolling } from "../hooks/use-company-logo-polling"
import { Button } from "@/components/ui/button"

  interface Props {
    company: Company
    isDeleting?: boolean
    onDelete?: (companyId: number) => void
    // Changed: passes companyId so the parent fetches fresh detail (including jobs)
    onOpen?: (companyId: number) => void
  }

  export default function CompanyCard({ company: initialCompany, isDeleting, onDelete, onOpen }: Props) {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setMenuOpen(false)
        }
      }
      if (menuOpen) document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [menuOpen])

    const { company } = useCompanyLogoPolling({
      companyId: initialCompany.company_id,
      enabled: initialCompany.logo_upload_status === "pending",
    })

    const currentCompany = company || initialCompany
    const isPending = currentCompany.logo_upload_status === "pending"
    const isFailed = currentCompany.logo_upload_status === "fail"
    const isSuccess = currentCompany.logo_upload_status === "success"

    const triggerOpen = () => onOpen?.(currentCompany.company_id)

    return (
      <div
        className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#111111] dark:hover:border-emerald-500/20 dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-cyan-500/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10 flex flex-1 flex-col p-5">
          <div className="flex items-start gap-4">

            {/* LOGO */}
            <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 dark:border-white/10 dark:from-white/[0.05] dark:to-white/[0.02]">
              {currentCompany.logo ? (
                <Image src={currentCompany.logo} alt={currentCompany.name} fill className="object-cover" />
              ) : (
                <span className="text-xl font-black text-slate-400 dark:text-zinc-500">
                  {getCompanyInitials(currentCompany.name)}
                </span>
              )}
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              )}
              {isFailed && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500/15 backdrop-blur-sm">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
              )}
              {isSuccess && currentCompany.logo && (
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-lg dark:border-[#111111]">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-black tracking-[-0.6px] text-slate-950 dark:text-white">
                    {currentCompany.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                      Active
                    </div>
                    {isPending && (
                      <div className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400">
                        Processing
                      </div>
                    )}
                    {isFailed && (
                      <div className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-red-700 dark:border-red-500/10 dark:bg-red-500/10 dark:text-red-400">
                        Failed
                      </div>
                    )}
                  </div>
                </div>

                {/* MENU */}
                <div className="relative" ref={menuRef}>
                  <Button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setMenuOpen((p) => !p) }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
                  >
                    <MoreVertical className="h-4 w-4 shrink-0" />
                  </Button>

                  {menuOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-[#151515]"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          triggerOpen()
                          setMenuOpen(false)
                        }}
                        className=" cursor-pointer  flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/[0.06] dark:hover:text-white"
                      >
                        <Eye className="h-4 w-4 text-emerald-500" />
                        View Details
                      </button>

                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={(e) => {
                          e.stopPropagation()
                          setMenuOpen(false)
                          onDelete?.(currentCompany.company_id)
                        }}
                        className="cursor-pointer mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition-all hover:bg-red-50 disabled:pointer-events-none disabled:opacity-60 dark:hover:bg-red-500/10"
                      >
                        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        Delete Company
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                {currentCompany.description}
              </p>
            </div>
          </div>

          {/* META */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-zinc-500">Website</p>
              <a
                href={currentCompany.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400"
              >
                <Globe className="h-4 w-4 shrink-0 text-emerald-500" />
                <span className="truncate">{formatWebsiteDisplay(currentCompany.website)}</span>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-zinc-500">Created</p>
              <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Calendar className="h-4 w-4 text-cyan-500" />
                {formatDate(currentCompany.created_at)}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
            <p className="text-xs font-medium text-slate-400 dark:text-zinc-500">Click card to explore company workspace</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
              Active Workspace
            </div>
          </div>
        </div>
      </div>
    )
  }