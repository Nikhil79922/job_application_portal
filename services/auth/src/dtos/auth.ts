enum UserRole {
    Recruiter = 'recruiter',
    JobSeeker = 'jobseeker'
}
export interface ResgisterCheck {
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    role: UserRole,
    bio?: string,
    resume ?:string,
    resumePublicId?: string,
}
