import AppBackground from '@/components/shared/app-background'
import JobsList from '@/features/jobseeker/jobs/components/jobs-list'
import React from 'react'

const JobsPage = () => {
  return (
<AppBackground>
    <main className="p-6">

      <JobsList />
    </main>
    </AppBackground>
  )
}

export default JobsPage
