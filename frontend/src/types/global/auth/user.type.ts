export interface User {
  skills: string[] | null;
  user_id: number,
  name: string,
  email: string,
  phone_number: string,
  role: "jobseeker" | "recruiter",
  bio: string | null,
  resume: string | null,
  resume_public_id: string | null,
  resume_upload_status: | "pending" | "success" | "fail",
  subscription: string | null,
  sessions: string | null,
  profile_pic: string | null,
  profile_pic_upload_status?: "fail" | "pending" | "success"
  profile_pic_public_id: string | null,
}