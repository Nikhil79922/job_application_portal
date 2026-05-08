export interface ApiSuccessResponse<T = unknown> {
    success: true
    message: string
    data?: T
  }
  
