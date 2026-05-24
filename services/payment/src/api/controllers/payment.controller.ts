import { Request, Response } from "express";
import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { AuthenticatedRequest } from "../../shared/types/user.type.js";
import AppError from "../../shared/errors/AppError.js";
import { rateLimit } from "../../composition-root/helper/rateLimiting.container.js";
import { checkoutServices } from "../../composition-root/payment/checkoutSubscription.container.js";
import { paymentVerificationSchema } from "../dtos/verifyPayment.schema.js";
import { paymentVerificationService } from "../../composition-root/payment/paymentVerification.container.js";

// Helper function
const getClientIP = (req: Request) =>
  (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
  req.ip ||
  "unknown";


  export const checkout = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const userData = req.user;
  
    if (!userData) {
      throw new AppError("Unauthorized", 401);
    }
  
    const ip = getClientIP(req);
  
    // 🔐 STRONG RATE LIMIT (USER + IP)
    await rateLimit.checkCheckoutLimit(
      String(userData.user_id),
      ip
    );
  
    const resData = await checkoutServices.checkoutSubs(userData);
  
    sendResponse(
      res,
      201,
     resData.message,
      resData
    );
  });

  export const paymentVerification = TryCatch(
    async (req: AuthenticatedRequest, res: Response) => {
      const userData = req.user;
  
      if (!userData) {
        throw new AppError("Unauthorized", 401);
      }
  
     const dto = paymentVerificationSchema.parse(req.body)
  
      const resData = await paymentVerificationService.verifyPayment({
        userId: String(userData.user_id),
        payload : dto
      });
  
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: resData.data,
      });
    }
  );