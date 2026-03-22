export class UserEntity {
    updateProfilePic(url: string, publicId: string) {
      if (!url) {
        throw new Error("Invalid profile picture");
      }
  
      return {
        profile_pic: url,
        profile_pic_public_id: publicId,
      };
    }
  
    updateResume(url: string, publicId: string) {
      if (!url) {
        throw new Error("Invalid resume");
      }
  
      return {
        resume: url,
        resume_public_id: publicId,
      };
    }
  }