export interface ApiErrorResponse {
    success: false
    message: string
    stack?: string
    errors?: unknown
  }