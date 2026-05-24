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

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const usePayment = () => {

  const [isLoading, setIsLoading] = useState(false)

  // Read token + user from the auth store — same pattern as meService
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
      const razorpayKey =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

      if (!razorpayKey) {
        toast.error(
          "Payment configuration missing. Please contact support."
        )
        setIsLoading(false)
        return
      }

      // 3. Validate session token
      if (!accessToken) {
        toast.error(
          "Session expired. Please log in again."
        )
        setIsLoading(false)
        return
      }

      // 4. Create order on backend
      const orderResponse =
        await paymentService.createOrder(accessToken)

      const orderData = orderResponse?.data?.data

      if (!orderData) {
        throw new Error(
          "Unable to create order. Please try again."
        )
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
        handler: async (
          razorpayResponse: RazorpayPaymentResponse
        ) => {
          try {
            const verifyResponse =
              await paymentService.verifyPayment(
                {
                  razorpay_order_id:
                    razorpayResponse.razorpay_order_id,
                  razorpay_payment_id:
                    razorpayResponse.razorpay_payment_id,
                  razorpay_signature:
                    razorpayResponse.razorpay_signature,
                },
                accessToken
              )

            // Update auth store directly — no page reload needed.
            // setAuth(user, accessToken) keeps the token in memory
            // and patches the user with the new subscription date.
            // Mirrors exactly what the backend sets (30 days from now).
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
            toast.error(
              err?.response?.data?.message ||
              err?.message ||
              "Payment verification failed. Contact support with your payment ID."
            )
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
        },
      }

      const razor = new (window as any).Razorpay(options)

      // Card decline / network failure inside the modal
      razor.on(
        "payment.failed",
        (failureResponse: RazorpayFailureResponse) => {
          setIsLoading(false)
          toast.error(
            failureResponse?.error?.description ??
            "Payment failed. Please try again."
          )
        }
      )

      // Open modal — do NOT setIsLoading(false) here;
      // the modal is still open and loading resets inside its callbacks.
      razor.open()

    } catch (err: any) {
      setIsLoading(false)
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