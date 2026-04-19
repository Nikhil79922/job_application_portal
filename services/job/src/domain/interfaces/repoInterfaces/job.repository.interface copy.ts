export interface IJobsRepository {
    existingJob(job_id: number ,tx?:any): Promise<any | null>;
    create(data: any ,tx?:any): Promise<any | null>;
    update(jobId: number | string, data: Partial<any>): Promise<any | null>;
    delete(jobId: number, userId:number): Promise<any | null>;
}