export interface ICompaniesRepository {
    existingCompanies(company_id: number ,tx?:any): Promise<any | null>;
    companyDetails(company_id: number ,tx?:any): Promise<any | null>;
    getAll(user_id:number ,tx?:any): Promise <any | null>; 
    create(data: any ,tx?:any): Promise<any | null>;
    update(companyId: number | string, data: Partial<any>): Promise<any | null>;
    delete(companyId: number, userId:number): Promise<any | null>;
}