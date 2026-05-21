// src/features/jobs/types/job.types.ts

import type {
  ApiSuccessResponse,
} from "@/types/api/response.types"

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"

export type WorkLocation =
  | "On-site"
  | "Remote"
  | "Hybrid"

export interface Job {

  job_id: number

  title: string

  description: string

  salary: string

  location: string

  job_type: JobType

  work_location: WorkLocation

  openings: number

  role: string

  company_id: number

  posted_by_recruiter: number

  created_at: string

  is_active: boolean
}

export interface CreateJobPayload {

  title: string

  description: string

  salary: number

  location: string

  job_type: JobType

  work_location: WorkLocation

  openings: number

  role: string

  company_id: number
}

export type CreateJobResponse =
  ApiSuccessResponse<Job>

export type JobsResponse =
  ApiSuccessResponse<Job[]>

export type JobDetailResponse =
  ApiSuccessResponse<Job>