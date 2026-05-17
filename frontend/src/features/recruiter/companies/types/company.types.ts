/* ========================================================================== */
/*  Shared Upload Status                                                      */
/* ========================================================================== */

export type UploadStatus =
  | "pending"
  | "success"
  | "fail"

/* ========================================================================== */
/*  Company Entity                                                            */
/* ========================================================================== */

// company.types.ts
// Matches the exact API response shape from GET /companies and POST /companies
export interface CompanyJob {
    job_id: number
    role: string
    title: string
    salary: number
    job_type:
      | "Full-time"
      | "Part-time"
      | "Contract"
      | "Internship"
  
    work_location:
      | "On-site"
      | "Remote"
      | "Hybrid"
  
    location: string
    openings: number
    is_active: boolean
    company_id: number
    posted_by_recruiter: number
    description: string
    created_at: string
  }
  
  export interface Company {
    company_id: number
  
    name: string
  
    description: string
  
    website: string
  
    logo: string | null
  
    logo_public_id: string | null
  
    logo_upload_status:
      | "pending"
      | "success"
      | "fail"
  
    recruiter_id: number
  
    created_at: string
  
    jobs?: CompanyJob[]
  }

/* ========================================================================== */
/*  Request Payloads                                                          */
/* ========================================================================== */

export interface CreateCompanyPayload {

  name: string

  description: string

  website: string

  file?: File
}

export interface DeleteCompanyPayload {

  companyId: number
}

/* ========================================================================== */
/*  Base API Envelopes                                                        */
/* ========================================================================== */

export interface ApiSuccessResponse<T = unknown> {

  success: true

  message: string

  data: T
}

export interface ApiErrorResponse {

  success: false

  message: string

  stack?: string

  errors?: unknown
}

export type ApiResponse<T = unknown> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse

/* ========================================================================== */
/*  Typed API Responses                                                       */
/* ========================================================================== */

export type CreateCompanyResponse =
  ApiSuccessResponse<Company>

export type DeleteCompanyResponse =
  ApiSuccessResponse<null>

export type GetAllCompaniesResponse =
  ApiSuccessResponse<Company[]>

export type GetCompanyDetailResponse =
  ApiSuccessResponse<Company>

/* ========================================================================== */
/*  UI / Utility Types                                                        */
/* ========================================================================== */

export type CompanySortKey =
  | "name"
  | "createdAt"