export class UserEntity {
    updateProfilePic(url, publicId, updateStatus) {
        if (!url) {
            throw new Error("Invalid profile picture");
        }
        return {
            profile_pic: url,
            profile_pic_public_id: publicId,
            profile_pic_upload_status: updateStatus
        };
    }
    updateResume(url, publicId, updateStatus) {
        if (!url) {
            throw new Error("Invalid resume");
        }
        return {
            resume: url,
            resume_public_id: publicId,
            resume_upload_status: updateStatus
        };
    }
}
