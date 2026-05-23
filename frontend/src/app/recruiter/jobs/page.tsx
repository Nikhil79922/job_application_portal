// src/app/recruiter/jobs/page.tsx

import RoleGuard from "@/components/guards/role-guard"
import JobsIndexView from "@/features/recruiter/jobs/components/jobs-index-view"
import { Suspense } from "react"

export default function JobsPage() {
  return (
    <RoleGuard
    allowedRoles={[
      "recruiter",
    ]}
  >
    <Suspense>
      <JobsIndexView/>
    </Suspense>
    </RoleGuard>
  )
}