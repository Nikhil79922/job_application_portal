import { User } from "@/types/global/auth/user.type"


export interface MeUser
  extends User {
  resume_upload_status: "pending"| "success"| "fail"
  profile_pic: string| null
  profile_pic_public_id: string | null
  profile_pic_upload_status: "pending"| "success"| "fail"
}