import express from "express";
// import {addSkillToUser, deleteSkillToUser, getUserProfile, myProfile, updateProfilePic, updateResume, updateUserProfile} from "../controllers/company.jobController.js";
import { verifyToken } from "../../shared/middleware/verifyToken.middleware.js";
import uploadFile from "../../config/multer.config.js";
const router = express.Router();


// router.get("/me",verifyToken,myProfile);
// router.get("/:userId",verifyToken,getUserProfile);
// router.put("/update/profile",verifyToken,updateUserProfile);
// router.put("/update/pic",verifyToken, uploadFile,updateProfilePic);
// router.put("/update/resume",verifyToken, uploadFile,updateResume);
// router.post("/skill/add",verifyToken,addSkillToUser);
// router.delete("/skill/delete",verifyToken,deleteSkillToUser);


export default router;