import { Users } from "../../../../shared/types/user.type.js";
import { ICompaniesRepository } from "../../../interfaces/repoInterfaces/companies.repository.interface.js";

export class getAllCompanySer {
    constructor(
        private companyRepo: ICompaniesRepository
    ) { }

    async getAllCompany(userDetails: Users) {
        let allCompanies: any = await this.companyRepo.getAll(userDetails.user_id);
        if (!allCompanies) {
            return { message: "Company not found" };
        }else{
            return { message: "Companies fetched successfully" , allCompanies}
        }
    }
}