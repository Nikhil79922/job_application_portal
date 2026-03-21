import express from "express";
import {getUserProfile, myProfile} from "../controllers/user.controller.js";
import { verifyToken } from "../../shared/middleware/verifyToken.middleware.js";
const router = express.Router();

router.get("/me",verifyToken,myProfile);
router.get("/:userId",verifyToken,getUserProfile);


export default router;