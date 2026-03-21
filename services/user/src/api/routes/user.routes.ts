import express from "express";
import {getUserProfile, myProfile, updateProfilePic, updateUserProfile} from "../controllers/user.controller.js";
import { verifyToken } from "../../shared/middleware/verifyToken.middleware.js";
import uploadFile from "../../config/multer.config.js";
const router = express.Router();

router.get("/me",verifyToken,myProfile);
router.get("/:userId",verifyToken,getUserProfile);
router.put("/update/profile",verifyToken,updateUserProfile);
router.put("/update/pic",verifyToken, uploadFile,updateProfilePic);


export default router;