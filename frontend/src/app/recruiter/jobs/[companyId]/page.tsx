// src/app/recruiter/jobs/[companyId]/page.tsx

import RoleGuard from "@/components/guards/role-guard"
import JobsPageView from "@/features/recruiter/jobs/components/jobs-page"
import { Suspense } from "react"

export default function JobsCompanyPage() {
  return (
    <RoleGuard
    allowedRoles={[
      "recruiter",
    ]}
  >
    <Suspense>
      <JobsPageView />
    </Suspense>
       </ RoleGuard>
  )
}