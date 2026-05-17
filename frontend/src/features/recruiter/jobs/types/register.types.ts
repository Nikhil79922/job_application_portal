/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
    ApiSuccessResponse,
  } from "@/types/api/response.types"
  
  export interface RegisterPayload {
    name: string
    email: string
    password: string
    phoneNumber: string
    role: "jobseeker" | "recruiter"
    bio?: string
    file?: File
  }
  
  export interface RegisteredUser {
    user_id: number
    name: string
    email: string
    phone_number: string
    role: "jobseeker" | "recruiter"
    bio: string | null
    resume_upload_status:
      | "pending"
      | "success"
      | "fail"
    created_at: string
  }
  
  export interface RegisterResponseData {
    registeredUser: RegisteredUser
    accessToken: string
  }
  
  export interface RegisterResponse
    extends ApiSuccessResponse<
      RegisterResponseData
    > {}