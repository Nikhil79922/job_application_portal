import api from "@/services/axios"

import type {
  CreateOrderResponse,
  VerifyPaymentDTO,
  VerifyPaymentResponse,
} from "../types/payment.types"

const paymentService = {

  createOrder: async (
    accessToken: string
  ): Promise<CreateOrderResponse> => {

    const response =
      await api.post<CreateOrderResponse>(
        "/payment/checkout",
        {},
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      )

    return response.data
  },

  verifyPayment: async (
    dto: VerifyPaymentDTO,
    accessToken: string
  ): Promise<VerifyPaymentResponse> => {

    const response =
      await api.post<VerifyPaymentResponse>(
        "/payment/verify",
        dto,
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      )

    return response.data
  },
}

export default paymentService