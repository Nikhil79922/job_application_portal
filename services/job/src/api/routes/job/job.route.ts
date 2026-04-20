import express from "express";
import { verifyToken } from "../../../shared/middleware/verifyToken.middleware.js";
import uploadFile from "../../../config/multer.config.js";
import { createJobController, udpateJobController } from "../../controllers/jobController.js";

const router = express.Router();

router.post("/new",verifyToken,createJobController);
router.put("/update",verifyToken,udpateJobController);


export default router;