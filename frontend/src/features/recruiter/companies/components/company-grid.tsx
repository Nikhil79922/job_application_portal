"use client"

import { useState } from "react"

import type { Company } from "../types/company.types"

import CompanyCard from "./company-card"
import CompanyDetailModal from "./company-detail-modal"

interface Props {
  companies: Company[]
  deletingIds?: Set<number>
  onDelete?: (companyId: number) => void
}

export default function CompanyGrid({
  companies,
  deletingIds,
  onDelete,
}: Props) {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null)

  const handleOpenCompany = (companyId: number) => {
    console.log("[CompanyGrid] Opening company:", companyId)

    setSelectedCompanyId(companyId)
  }

  const handleCloseCompany = () => {
    console.log("[CompanyGrid] Closing modal")

    setSelectedCompanyId(null)
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard
            key={company.company_id}
            company={company}
            isDeleting={deletingIds?.has(company.company_id)}
            onDelete={onDelete}
            onOpen={handleOpenCompany}
          />
        ))}
      </div>

      <CompanyDetailModal
        companyId={selectedCompanyId}
        onClose={handleCloseCompany}
      />
    </>
  )
}