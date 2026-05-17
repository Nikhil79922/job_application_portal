import { User } from "@/types/global/auth/user.type"

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginData {
  user: User
  accessToken: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: LoginData
}