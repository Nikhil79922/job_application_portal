import type {
  ApiSuccessResponse,
} from "@/types/api/response.types"

export interface Application {
  application_id: number
  job_id: number
  applicant_id: number
  applicant_email: string

  status: string

  resume: string

  applied_at: string

  subscribed: boolean

  job_title: string
  job_salary: string
  job_location: string

  /* NEW */

  company_id: number

  company_name: string

  company_logo: string
}

export type ApplicationsResponse =
  ApiSuccessResponse<
    Application[]
  >