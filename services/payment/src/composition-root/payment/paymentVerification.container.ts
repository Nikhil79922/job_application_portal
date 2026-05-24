import { checkoutSer } from "../../domain/services/payment/checkout.service.js";
import { paymentVerificationSer } from "../../domain/services/payment/paymentVerification.service.js";
import { PostgresUserRepository } from "../../infra/database/repository/user.repository.js";

const userRepo= new PostgresUserRepository()

export const paymentVerificationService = new paymentVerificationSer(userRepo)