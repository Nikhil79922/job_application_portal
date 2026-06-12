import express from "express";
import { verifyToken } from "../../../shared/middleware/verifyToken.middleware.js";
import { createJobController, getAllActiveJobController, getAllApplicationForJobController, getJobController, udpateJobController, updateApplicationController } from "../../controllers/jobController.js";

const router = express.Router();

router.get("/public/activeJobs",getAllActiveJobController);
router.get("/public/details/:id",getJobController);

router.post("/new",verifyToken,createJobController);
router.put("/update",verifyToken,udpateJobController);

//Applcaints '
router.get("/applications/:id",verifyToken,getAllApplicationForJobController);
router.put("/applications/update/:id",verifyToken,updateApplicationController)


export default router;