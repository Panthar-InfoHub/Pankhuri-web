"use client"

import { useCourse } from "@/hooks/useCourse"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface BuyCourseButtonProps {
  courseId: string
  courseName: string
}

export function BuyCourseButton({ courseId, courseName }: BuyCourseButtonProps) {
  const { hasPurchased, purchaseCourse } = useCourse()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const isPurchased = hasPurchased(courseId)

  const handlePurchase = async () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setIsProcessing(true)
    // TODO: Replace with Razorpay payment integration from payment.service.ts
    setTimeout(() => {
      purchaseCourse(courseId)
      setIsProcessing(false)
    }, 1000)
  }

  if (isPurchased) {
    return (
      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0" disabled>
        Already Purchased
      </Button>
    )
  }

  return (
    <Button
      onClick={handlePurchase}
      disabled={isProcessing}
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 text-white border-0"
    >
      {isProcessing ? "Processing..." : "Enroll Now"}
    </Button>
  )
}
