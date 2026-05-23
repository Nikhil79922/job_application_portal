export interface Applicant {
    application_id: number
    job_id: number
    applicant_id: number
    applicant_email: string
    status: string
    resume: string
    applied_at: string
    subscribed: boolean
  }
  
  export interface ApplicantsResponse {
    success: boolean
    message: string
    data: Applicant[]
  }


