// src/features/jobs/types/job.types.ts

export interface ActiveJob {
    job_id: number
    title: string
    description: string
    salary: string
    location: string
    job_type: string
    role: string
    work_location: string
    created_at: string
    company_name: string
    company_logo: string
    company_id: number
  }
  
  export interface JobDetails {
    job_id: number
    title: string
    description: string
    salary: string
    location: string
    job_type: string
    openings: number
    role: string
    work_location: string
    company_id: number
    posted_by_recruiter: number
    created_at: string
    is_active: boolean
  }
  
  export interface ActiveJobsResponse {
    success: boolean
    message: string
    data: ActiveJob[]
  }
  
  export interface JobDetailsResponse {
    success: boolean
    message: string
    data: JobDetails
  }