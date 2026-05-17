/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
    ApiSuccessResponse,
  } from "@/types/api/response.types"
  
  export interface ForgotPasswordPayload {
    email: string
  }
  
  export interface ForgotPasswordResponse
    extends ApiSuccessResponse<null> {}