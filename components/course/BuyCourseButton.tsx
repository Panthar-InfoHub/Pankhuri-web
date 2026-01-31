"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { purchaseCourse, verifyCoursePurchase } from "@/lib/api/course.client";
import { initiateRazorpayPayment, formatPrice } from "@/lib/razorpay";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface BuyCourseButtonProps {
  courseId: string;
  courseName: string;
  isPurchased?: boolean;
}

export function BuyCourseButton({
  courseId,
  courseName,
  isPurchased = false,
}: BuyCourseButtonProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    if (status === "unauthenticated") {
      toast.error("Please login to purchase this course");
      router.push("/login?callbackUrl=" + window.location.pathname);
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Initiate purchase and get order details

      const { data: orderData } = await purchaseCourse(courseId);



      // Step 2: Open Razorpay payment
      await initiateRazorpayPayment({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Pankhuri",
        description: orderData.planName,
        order_id: orderData.orderId,
        prefill: {
          name: (session?.user as any)?.name || "",
          email: (session?.user as any)?.email || "",
        },
        theme: {
          color: "#8B5CF6",
        },
        handler: async (response) => {
          try {
         

            // Step 3: Verify payment
            const verifyResult = await verifyCoursePurchase({
              orderId: response.razorpay_order_id || orderData.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature || "",
            });

            toast.success("Course purchased successfully!");

            // Reset processing state
            setIsProcessing(false);

            // Reload the page to reflect purchase
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } catch (error) {
            console.error("❌ [Payment] Verification failed:", error);
            toast.error("Payment verification failed. Please contact support.");
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
        
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      });
    } catch (error: any) {
      console.error("❌ [Purchase] Failed:", error);
      toast.error(error?.response?.data?.message || "Failed to initiate purchase");
      setIsProcessing(false);
    }
  };

  if (isPurchased) {
    return (
      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled>
        Already Purchased
      </Button>
    );
  }

  return (
    <Button
      onClick={handlePurchase}
      disabled={isProcessing}
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white transition-all shadow-lg hover:shadow-xl"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        "Enroll Now"
      )}
    </Button>
  );
}
