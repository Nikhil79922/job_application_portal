"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { toast } from "sonner"

import { useAuthStore } from "@/stores/auth.store"

import paymentService from "../services/payment.service"

import type {
  RazorpayPaymentResponse,
  RazorpayFailureResponse,
} from "../types/payment.types"

// ─── Razorpay script loader ───────────────────────────────────────────────────

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// ─── Error classifier ─────────────────────────────────────────────────────────

function classifyPaymentError(err: any): string {
  const code        = err?.error?.code        as string | undefined
  const reason      = err?.error?.reason      as string | undefined
  const description = err?.error?.description as string | undefined
  const step        = err?.error?.step        as string | undefined

  // UPI-specific
  if (reason === "payment_cancelled" || code === "BAD_REQUEST_ERROR") {
    if (step === "payment_authentication") {
      return "UPI payment was cancelled or timed out. Please try again."
    }
  }

  // Card decline
  if (
    reason === "card_declined" ||
    reason === "insufficient_funds" ||
    code   === "GATEWAY_ERROR"
  ) {
    return description || "Your card was declined. Please try a different card."
  }

  // Network / timeout
  if (
    reason === "network_error" ||
    code   === "NETWORK_ERROR"
  ) {
    return "Network error during payment. Please check your connection and try again."
  }

  // Generic Razorpay description
  if (description) return description

  return "Payment failed. Please try again or use a different payment method."
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const usePayment = () => {

  const [isLoading, setIsLoading] = useState(false)

  const accessToken = useAuthStore((state) => state.accessToken)
  const user        = useAuthStore((state) => state.user)
  const setAuth     = useAuthStore((state) => state.setAuth)

  const initiateCheckout = async () => {

    try {
      setIsLoading(true)

      // 1. Load Razorpay SDK
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        toast.error(
          "Failed to load payment SDK. Check your internet connection."
        )
        setIsLoading(false)
        return
      }

      // 2. Validate Razorpay public key
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

      if (!razorpayKey) {
        toast.error(
          "Payment configuration missing. Please contact support."
        )
        setIsLoading(false)
        return
      }

      // 3. Validate session token
      if (!accessToken) {
        toast.error("Session expired. Please log in again.")
        setIsLoading(false)
        return
      }

      // 4. Create order on backend
      // Backend shape: { success, message, data: { message, data: RazorpayOrder } }
      const orderResponse = await paymentService.createOrder(accessToken)
      const orderData = orderResponse?.data?.data

      if (!orderData?.id) {
        throw new Error("Unable to create order. Please try again.")
      }

      // 5. Open Razorpay checkout modal
      const options = {
        key:         razorpayKey,
        amount:      orderData.amount,
        currency:    orderData.currency,
        name:        "Job Portal",
        description: "Premium Subscription – ₹119/month",
        order_id:    orderData.id,

        // ── Success: verify on backend then update store ──────────────────
        handler: async (razorpayResponse: RazorpayPaymentResponse) => {
          try {
            const verifyResponse = await paymentService.verifyPayment(
              {
                razorpay_order_id:   razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature:  razorpayResponse.razorpay_signature,
              },
              accessToken
            )

            if (user && accessToken) {
              const expiresAt = new Date()
              expiresAt.setDate(expiresAt.getDate() + 30)

              setAuth(
                { ...user, subscription: expiresAt.toISOString() },
                accessToken
              )
            }

            setIsLoading(false)

            toast.success(
              verifyResponse?.message ??
              "Subscription activated successfully!"
            )

          } catch (err: any) {
            setIsLoading(false)

            // Verification failure — payment went through but backend failed
            const msg =
              err?.response?.data?.message ||
              err?.message ||
              "Payment verification failed. Contact support with your payment ID."

            toast.error(msg)
          }
        },

        prefill: {
          name:    user?.name,
          email:   user?.email,
          contact: user?.phone_number,
        },

        theme: { color: "#10b981" },

        modal: {
          // User closed the Razorpay modal without paying
          ondismiss: () => {
            setIsLoading(false)
            toast.info("Payment cancelled.")
          },
          // Escape key / back button
          escape: true,
          backdropclose: false,
        },
      }

      const razor = new (window as any).Razorpay(options)

      // Card decline / network failure / UPI timeout inside the modal
      razor.on(
        "payment.failed",
        (failureResponse: RazorpayFailureResponse) => {
          setIsLoading(false)
          toast.error(classifyPaymentError(failureResponse))
        }
      )

      razor.open()

    } catch (err: any) {
      setIsLoading(false)

      // Network error reaching our backend
      if (!navigator.onLine) {
        toast.error("No internet connection. Please check your network.")
        return
      }

      // Rate limit
      if (err?.response?.status === 429) {
        toast.error("Too many checkout attempts. Please wait a few minutes.")
        return
      }

      // Already subscribed
      if (err?.response?.status === 400) {
        toast.error(
          err?.response?.data?.message ||
          "You already have an active subscription."
        )
        return
      }

      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Checkout failed. Please try again."
      )
    }
  }

  return {
    initiateCheckout,
    isLoading,
  }
}
