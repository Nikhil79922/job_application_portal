export interface User {
    user_id: number
    name: string
    email: string
    phone_number: string
    role: "jobseeker" | "recruiter"
    bio: string | null
    resume: string | null
    resume_public_id: string | null
    subscription: string | null
    sessions: string
  }