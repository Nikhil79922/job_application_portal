/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
    ApiSuccessResponse,
  } from "@/types/api/response.types"
  
  export interface ResetPasswordPayload {
    token: string
    password: string
  }
  
  export interface ResetPasswordResponse
    extends ApiSuccessResponse<null> {}