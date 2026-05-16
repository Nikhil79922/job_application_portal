export interface UpdateProfilePicPayload {
    file?: File
    checkUpload: boolean
  }
  
  export interface UpdateProfilePicResponse {
    success: boolean
  
    message: string
  
    data?: {
      user_id: number
      name: string
      profile_pic: string
    }
  }