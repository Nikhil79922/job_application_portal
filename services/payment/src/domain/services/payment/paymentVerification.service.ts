// services/paymentVerification.service.ts

import crypto from "crypto";

import AppError from "../../../shared/errors/AppError.js";
import { razorpayInstance } from "../../../config/razorpay.config.js";

import {
  paymentVerificationDTO,
} from "../../../api/dtos/verifyPayment.schema.js";

import { IUserRepository } from "../../interfaces/repoInterfaces/user.repository.interface.js";

interface VerifyPaymentPayload {
  userId: string;
  payload: paymentVerificationDTO;
}

export class paymentVerificationSer {
  constructor(private userRepo: IUserRepository) {}

  async verifyPayment(
    data: VerifyPaymentPayload
  ){
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = data.payload;

    // Generate signature for verification
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET as string
      )
      .update(body)
      .digest("hex");

    // Verify signature
    const isAuthentic =
      expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      throw new AppError(
        "Invalid payment signature",
        400
      );
    }

    //  Razorpay instance
    const razorpay = razorpayInstance();

    //  Fetch payment details
    const payment = await razorpay.payments.fetch(
      razorpay_payment_id
    );

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    // Verify payment status
    if (payment.status !== "captured") {
      throw new AppError(
        "Payment is not captured",
        400
      );
    }

    // Extra security checks
    if (payment.order_id !== razorpay_order_id) {
      throw new AppError(
        "Order mismatch detected",
        400
      );
    }

    if (payment.currency !== "INR") {
      throw new AppError(
        "Invalid payment currency",
        400
      );
    }

    // Prevent duplicate subscription extension
    const existingUser = await this.userRepo.findById(
      data.userId
    );

    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    const now = Date.now();

    const existingSubTime = existingUser.subscription
      ? new Date(existingUser.subscription).getTime()
      : 0;

    // If active subscription exists, extend from current expiry
    const baseDate =
      existingSubTime > now
        ? new Date(existingSubTime)
        : new Date();

    baseDate.setDate(baseDate.getDate() + 30);

    // Update subscription
    const subscribedUserData =
      await this.userRepo.update(data.userId, {
        subscription: baseDate,
      });

    if (subscribedUserData) {
      throw new AppError(
        "Failed to activate subscription",
        500
      );
    }

    return {
        data:subscribedUserData
    };
  }
}