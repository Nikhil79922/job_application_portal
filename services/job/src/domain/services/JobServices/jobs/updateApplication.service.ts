import { UpdateApplicationDTO } from "../../../../api/dtos/job/updateApplication.schema.js";
import AppError from "../../../../shared/errors/AppError.js";
import { Users } from "../../../../shared/types/user.type.js";
import { applicationStatusUpdateTemplate } from "../../../../shared/utils/emailTemplate.js";
import { IMessageBroker } from "../../../interfaces/infraInterfaces/message-broker.interface.js";
import { IApplicantionsRepository } from "../../../interfaces/repoInterfaces/applications.repository.interface.js";
import { IJobsRepository } from "../../../interfaces/repoInterfaces/job.repository.interface copy.js";

export class updateApplicationSer {
    constructor(
        private jobRepo: IJobsRepository,
        private applicationRepo: IApplicantionsRepository,
        private messageBroker: IMessageBroker,
    ) { }

    async updateApplications(data: UpdateApplicationDTO, userDetails: Users) {
        let application = await this.applicationRepo.find(data.application_id);
        if (!application) {
            throw new AppError('Application not found', 404);
        }
        console.log(application)
        let selectedRow= ['posted_by_recruiter' ,'title']
        let jobDetails = await this.jobRepo.findJobData(application.job_id,selectedRow)
      console.log(jobDetails)
        if (!jobDetails) {
            throw new AppError('No job with this application Id is found', 404);
        }
        if(jobDetails.posted_by_recruiter !== userDetails.user_id){
            throw new AppError('Forbidden you are not allowed',403)
        }
        let updateData= {
            status: data.status,
        }
        const updatedApplication= await this.applicationRepo.update(data.application_id,updateData)

        const message = {
            to: application.applicant_email,
            subject: 'Application Update - Job Portal',
            html: applicationStatusUpdateTemplate(jobDetails.title),
        }

        await this.messageBroker.publish("send-mail", message).catch((error)=>{
console.log("Email Sent error ===>",error)
        });

        return {
            message :"Application is update",
            data:{
                job:jobDetails,
                application:updatedApplication
            }
        }
    }
}