// validation/paymentVerification.validation.ts

import { z } from "zod";

// ✅ Payment Verification Request Schema
export const paymentVerificationSchema = z.object({
  razorpay_order_id: z
    .string()
    .trim()
    .min(1, "Razorpay order id is required")
    .regex(/^order_[a-zA-Z0-9]+$/, "Invalid razorpay order id"),

  razorpay_payment_id: z
    .string()
    .trim()
    .min(1, "Razorpay payment id is required")
    .regex(/^pay_[a-zA-Z0-9]+$/, "Invalid razorpay payment id"),

  razorpay_signature: z
    .string()
    .trim()
    .min(1, "Razorpay signature is required")
    .min(20, "Invalid razorpay signature"),
});

export type paymentVerificationDTO = z.infer<
  typeof paymentVerificationSchema
>;
