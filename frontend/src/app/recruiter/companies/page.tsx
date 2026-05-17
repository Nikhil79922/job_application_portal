"use client"

import RoleGuard from "@/components/guards/role-guard"
import CompaniesPageView from "@/features/recruiter/companies/components/companies-page-view"

export default function CompaniesPage() {
  return (
    <RoleGuard
      allowedRoles={[
        "recruiter",
      ]}
    >
      <CompaniesPageView />
    </RoleGuard>
  )
}