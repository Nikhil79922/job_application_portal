import express from "express";
import { verifyToken } from "../../../shared/middleware/verifyToken.middleware.js";
import uploadFile from "../../../config/multer.config.js";
import { createCompanyController, deleteCompanyController, getAllCompanyController, getCompanyDetailsController } from "../../controllers/companyController.js";

const router = express.Router();

router.get("/all",verifyToken, getAllCompanyController);
router.get("/:id",verifyToken, getCompanyDetailsController);
router.post("/new",verifyToken, uploadFile,createCompanyController);
router.delete("/delete",verifyToken, deleteCompanyController);



export default router;