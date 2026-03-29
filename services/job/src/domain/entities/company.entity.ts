export class CompanyEntity {
    updatelogoPic(url: string, publicId: string , updateStatus:string) {
      if (!url) {
        throw new Error("Invalid profile picture");
      }
  
      return {
        logo: url,
        logo_public_id: publicId,
        logo_upload_status: updateStatus
      };
    }
  
    updateResume(url: string, publicId: string , updateStatus:string) {
      if (!url) {
        throw new Error("Invalid resume");
      }
  
      return {
        resume: url,
        resume_public_id: publicId,
        resume_upload_status:updateStatus
      };
    }
  }