import api from "@/services/axios"

import type {
  CreateCompanyPayload,
  CreateCompanyResponse,
  DeleteCompanyPayload,
  DeleteCompanyResponse,
  GetAllCompaniesResponse,
  GetCompanyDetailResponse,
} from "../types/company.types"

/* ================================================================== */
/*  API Base                                                           */
/* ================================================================== */

const COMPANY_BASE = "/job/company"

/* ================================================================== */
/*  POST /api/job/company/new                                          */
/*  multipart/form-data – name, description, website, file (optional) */
/* ================================================================== */

export async function createCompany(
  payload: CreateCompanyPayload,
): Promise<CreateCompanyResponse> {
  const form = new FormData()

  form.append("name", payload.name)
  form.append("description", payload.description)
  form.append("website", payload.website)

  if (payload.file) {
    form.append("file", payload.file)
  }

  /**
   * DO NOT set Content-Type — axios + multipart will handle it.
   * The api instance already has axios interceptors for auth token injection.
   */
  const response = await api.post<CreateCompanyResponse>(
    `${COMPANY_BASE}/new`,
    form,
  )

  return response.data
}

/* ================================================================== */
/*  DELETE /api/job/company/delete                                     */
/*  JSON body: { companyId: number }                                   */
/* ================================================================== */

export async function deleteCompany(
  payload: DeleteCompanyPayload,
): Promise<DeleteCompanyResponse> {
  const response = await api.delete<DeleteCompanyResponse>(
    `${COMPANY_BASE}/delete`,
    {
      data: payload,
    },
  )

  return response.data
}

/* ================================================================== */
/*  GET /api/job/company/all                                           */
/* ================================================================== */

export async function getAllCompanies(): Promise<GetAllCompaniesResponse> {
  const response = await api.get<GetAllCompaniesResponse>(
    `${COMPANY_BASE}/all`,
  )

  return response.data
}

/* ================================================================== */
/*  GET /api/job/company/:id                                           */
/*  Used for initial fetch AND polling for logo URL                   */
/* ================================================================== */

export async function   getCompanyDetail(
  companyId: number,
): Promise<GetCompanyDetailResponse> {
  const response = await api.get<GetCompanyDetailResponse>(
    `${COMPANY_BASE}/${companyId}`,
  )

  return response.data
}
