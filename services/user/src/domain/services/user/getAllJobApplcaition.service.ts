import { Users } from "../../../shared/types/user.type.js";
import { IApplicantionsRepository } from "../../interfaces/repoInterfaces/applications.repository.interface.js";

export class getAllJobApplicationSer {
    constructor(
        private applicationRepo: IApplicantionsRepository,
    ) { }

    async getAllApplications(userDetails: Users) {
        const allApplication = await this.applicationRepo.findAllActive(userDetails.user_id);
        if (allApplication.length == 0) {
            return {
                message: "No active job applciation found",
                data: allApplication
            }
        }
        return {
            message: "Successfully fetched all the job applications",
            data: allApplication
        }
    }
}