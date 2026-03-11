import { Request } from "express";

export interface Users{
    user_id :string,
    name :string,
    email :string,
    password :string,
    phone_number :string,
    role : 'jobseeker' | 'recruiter',
    bio :string,
    resume : string | null,
    resume_public_id : string | null,
    profile_pic : string | null,
    profile_pic_public_id : string | null,
    skills: string[],
    subscription : string | null,
}

export interface  AuthenticatedRequest extends Request{
user?:Users
}