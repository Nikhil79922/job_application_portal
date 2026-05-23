export interface ApplicantProfile {
    user_id: number
    name: string
    email: string
    phone_number: string
    role: string
    bio: string
    resume: string
    resume_public_id: string
    resume_upload_status: string
    profile_pic: string
    profile_pic_public_id: string
    profile_pic_upload_status: string
    subscription: string | null
    skills: string[]
  }
  
  export interface ApplicantProfileResponse {
    success: boolean
    message: string
    data: ApplicantProfile
  }