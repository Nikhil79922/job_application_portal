import express from "express";
import { checkout,paymentVerification} from "../controllers/payment.controller.js";
import { verifyToken } from "../../shared/middleware/verifyToken.middleware.js";

const router = express.Router();

router.post("/checkout",verifyToken,checkout);
router.post("/verify",verifyToken,paymentVerification);



export default router;