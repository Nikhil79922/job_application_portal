import RoleGuard from '@/components/guards/role-guard'
import ApplicationsPage from '@/features/jobseeker/applicants/components/applications-page'
import React from 'react'

const ApplicantPage = () => {
  return (
    <RoleGuard
    allowedRoles={[
      "jobseeker",
    ]}
  >
    <div>
<ApplicationsPage />
    </div>
</RoleGuard>
  )

}

export default ApplicantPage
