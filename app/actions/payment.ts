"use server"

// This prevents exposing the key directly in client-side config

export async function getRazorpayKeyId(): Promise<string> {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ""

  if (!keyId) {
    throw new Error("Razorpay Key ID is not configured. Add NEXT_PUBLIC_RAZORPAY_KEY_ID to your environment variables.")
  }

  return keyId
}
