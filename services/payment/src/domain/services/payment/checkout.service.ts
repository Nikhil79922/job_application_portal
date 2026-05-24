import { Users } from "../../../shared/types/user.type.js";
import AppError from "../../../shared/errors/AppError.js";
import { razorpayInstance } from "../../../config/razorpay.config.js";

export class checkoutSer {
  constructor() {}

  async checkoutSubs(userDetails: Users) {
    const now = Date.now();

    const subTime = userDetails.subscription
      ? new Date(userDetails.subscription).getTime()
      : 0;

    const isSubscribe = subTime > now;

    // ✅ Prevent duplicate active subscriptions
    if (isSubscribe) {
      throw new AppError(
        "You already have a valid subscription",
        400
      );
    }

    // ✅ Razorpay order options
    const paymentOption = {
      amount: 119 * 100, // ₹119 in paise
      currency: "INR",
      receipt: `sub_${userDetails.user_id}_${Date.now()}`,

      notes: {
        user_id: String(userDetails.user_id),
        payment_for: "premium_subscription",
      },
    };

    try {
      const razorpay = razorpayInstance();

      const order = await razorpay.orders.create(paymentOption);

      if (!order) {
        throw new AppError(
          "Unable to create checkout session",
          500
        );
      }

      return {
        message: "Order checkout session created successfully",
        data: order,
      };
    } catch (error: any) {
      console.error("RAZORPAY_CHECKOUT_ERROR:", error);

      throw new AppError(
        error?.error?.description ||
          error?.message ||
          "Payment gateway error",
        500
      );
    }
  }
}