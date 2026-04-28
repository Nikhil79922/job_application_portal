export interface IApplicantionsRepository {
    findAllActive(applicant_id:number, tx?:any): Promise<any | null>;
    find(applicant_id:number, tx?:any): Promise<any | null>;
    findAllOnJobId(job_id:number, tx?:any): Promise<any | null>;
    existingApplicants(job_id: number ,tx?:any): Promise<any | null>;
    create(data: any ,tx?:any): Promise<any | null>;
    update(application_id: number | string, data: Partial<any>): Promise<any | null>;
    delete(applicant_id: number, userId:number): Promise<any | null>;
}