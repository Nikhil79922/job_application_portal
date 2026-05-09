export interface ApiErrorResponse {
  success: false
  message: string
  stack?: string
  errors?: unknown
}

export interface ApiSuccessResponse<
  T = unknown
> {
  success: true
  message: string
  data: T
}