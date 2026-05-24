// ─── Request DTOs ─────────────────────────────────────────────────────────────


  export interface VerifyPaymentDTO {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }
  
  // ─── Response shapes ──────────────────────────────────────────────────────────
  
  export interface RazorpayOrder {
    id: string
    amount: number
    currency: string
    receipt?: string
  }
  
  export interface CreateOrderResponse {
    success: boolean
    message: string
    data: {
      data: RazorpayOrder
    }
  }
  
  export interface VerifyPaymentResponse {
    success: boolean
    message: string
    data: unknown // backend returns updated user; shape depends on your repo
  }
  
  // ─── Razorpay SDK callback shape ──────────────────────────────────────────────
  
  export interface RazorpayPaymentResponse {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }
  
  export interface RazorpayFailureResponse {
    error: {
      code: string
      description: string
      source: string
      step: string
      reason: string
      metadata: {
        order_id: string
        payment_id: string
      }
    }
  }