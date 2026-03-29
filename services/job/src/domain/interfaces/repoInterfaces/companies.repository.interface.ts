export interface ICompaniesRepository {
    existingCompanies(skillName: string ,tx:any): Promise<any | null>;
    create(data: any ,tx?:any): Promise<any | null>;
    update(companyId: number | string, data: Partial<any>): Promise<void>;
}