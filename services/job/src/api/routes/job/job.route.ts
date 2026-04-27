import express from "express";
import { verifyToken } from "../../../shared/middleware/verifyToken.middleware.js";
import uploadFile from "../../../config/multer.config.js";
import { createJobController, getAllActiveJobController, getAllApplicationForJobController, getJobController, udpateJobController } from "../../controllers/jobController.js";

const router = express.Router();

router.get("/public/activeJobs",getAllActiveJobController);
router.get("/public/details/:id",getJobController);
router.get("/applications/:id",verifyToken,getAllApplicationForJobController);
router.post("/new",verifyToken,createJobController);
router.put("/update",verifyToken,udpateJobController);


export default router;