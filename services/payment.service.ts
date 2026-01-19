// Payment Service - Razorpay Integration


import { getRazorpayKeyId } from "@/app/(web)/actions/payment"

interface PaymentDetails {
  courseId: string
  amount: number
  email: string
  userId: string
}

interface RazorpayOrder {
  id: string
  amount: number
  currency: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export const paymentService = {
  async initiatePayment(details: PaymentDetails): Promise<RazorpayOrder> {
    try {
      const response = await fetch(`http://localhost:3001/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          courseId: details.courseId,
          amount: details.amount,
          email: details.email,
          userId: details.userId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create payment order")
      }

      const order = await response.json()
      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency || "INR",
      }
    } catch (error) {
      console.error("Payment initiation failed:", error)
      throw error
    }
  },

  async verifyPayment(orderId: string, paymentId: string, signature: string): Promise<boolean> {
    try {
      const response = await fetch(`/payment/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          orderId,
          paymentId,
          signature,
        }),
      })

      if (!response.ok) {
        throw new Error("Payment verification failed")
      }

      return true
    } catch (error) {
      console.error("Payment verification error:", error)
      return false
    }
  },

  // Helper function to open Razorpay payment modal
  // Fetches the key ID securely from server action
  async openRazorpayModal(order: RazorpayOrder, userEmail: string): Promise<{ paymentId: string; signature: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const keyId = await getRazorpayKeyId()

        const options = {
          key: keyId,
          amount: order.amount,
          currency: order.currency || "INR",
          order_id: order.id,
          handler: (response: any) => {
            resolve({
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            })
          },
          prefill: {
            email: userEmail,
          },
          theme: {
            color: "#9945FF",
          },
          modal: {
            ondismiss: () => {
              reject(new Error("Payment modal closed"))
            },
          },
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } catch (error) {
        reject(error)
      }
    })
  },
}
