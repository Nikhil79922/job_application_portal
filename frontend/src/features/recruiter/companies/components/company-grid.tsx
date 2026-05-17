"use client"

import type { Company } from "../types/company.types"
import CompanyCard from "./company-card"

interface Props {
  companies: Company[]
  deletingIds?: Set<number>
  onDelete?: (companyId: number) => void
  onOpen?: (companyId: number) => void  // ← was (company: Company)
}

export default function CompanyGrid({
  companies,
  deletingIds,
  onDelete,
  onOpen,
}: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard
          key={company.company_id}
          company={company}
          isDeleting={deletingIds?.has(company.company_id)}
          onDelete={onDelete}
          onOpen={onOpen}  // ← pass directly, signatures now match
        />
      ))}
    </div>
  )
}