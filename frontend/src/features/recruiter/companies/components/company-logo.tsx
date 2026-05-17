"use client"

import Image           from "next/image"
import { Loader2, AlertTriangle } from "lucide-react"
import type { Company } from "../types/company.types"
import { getCompanyInitials } from "../utils/company.utils"

interface Props {
  company: Company
  size?:   number
}

export default function CompanyLogo({ company, size = 64 }: Props) {
  const isPending = company.logo_upload_status === "pending"
  const isFailed  = company.logo_upload_status === "fail"

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/[0.04]"
      style={{ width: size, height: size }}
    >
      {company.logo ? (
        <Image src={company.logo} alt={company.name} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="font-black text-slate-700 dark:text-zinc-300"
            style={{ fontSize: size * 0.28 }}
          >
            {getCompanyInitials(company.name)}
          </span>
        </div>
      )}

      {/* Pending overlay */}
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        </div>
      )}

      {/* Failed badge */}
      {isFailed && !isPending && (
        <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
          <AlertTriangle className="h-3 w-3" />
        </div>
      )}
    </div>
  )
}
