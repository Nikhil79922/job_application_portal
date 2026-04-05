import { deleteCompanyDTO } from "../../../../api/dtos/deleteCompany.schema.js";
import { Users } from "../../../../shared/types/user.type.js";
import { ICompaniesRepository } from "../../../interfaces/repoInterfaces/companies.repository.interface.js";

export class deleteCompanySer {
    constructor(
        private companyRepo: ICompaniesRepository
    ) { }

    async deleteCompany(data: deleteCompanyDTO, userDetails: Users) {
        let deleteCount: any = await this.companyRepo.delete(data.companyId, userDetails.user_id);
        if (deleteCount) {
            return { message: "Company deleted along with the jobs successfully" };
        }
    }
}