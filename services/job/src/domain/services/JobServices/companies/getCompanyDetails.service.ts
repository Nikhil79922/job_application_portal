import { ICompaniesRepository } from "../../../interfaces/repoInterfaces/companies.repository.interface.js";

export class getCompanyDetailSer {
    constructor(
        private companyRepo: ICompaniesRepository
    ) { }

    async getCompanyDetail(company_id :number) {
        let companyDetails: any = await this.companyRepo.companyDetails(company_id);
        if (!companyDetails) {
            return { message: "Company not found" };
        }else{
            return { message: "Company details fetched successfully" , companyDetails}
        }
    }
}