"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { CategoryPricing } from "@/types/category";
import { initiateSubscription, verifySubscription } from "@/lib/api/plan";
import { event } from "@/lib/metaPixel"; // Meta Pixel tracking

interface CategorySubscriptionButtonProps {

  categoryName: string;
  pricing: CategoryPricing[];
  hasAccess: boolean;
}

export function CategorySubscriptionButton({
  categoryName,
  pricing,
  hasAccess,
}: CategorySubscriptionButtonProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleSubscribe = async (plan: CategoryPricing) => {
    if (hasAccess) return;

    if (status === "unauthenticated") {
      toast.error("Please login to subscribe");
      router.push("/login?callbackUrl=" + window.location.pathname);
      return;
    }

    setIsProcessing(true);
    setSelectedPlanId(plan.id);

    try {
      const result = await initiateSubscription(plan.id);

      if (!result.success) {
        throw new Error(result.message || "Failed to initiate subscription");
      }

      const { data } = result;

      const options = {
        key: data.keyId,
        subscription_id: data.subscriptionId,
        amount: data.amount,
        currency: data.currency,
        name: "Pankhuri",
        description: data.planName,
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        handler: async (response: any) => {
          try {
            toast.loading("Verifying payment...");
            await verifySubscription({
              subscriptionId: data.subscriptionId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            toast.dismiss();
            toast.success("Subscription activated successfully!");
            router.push("/account");
          } catch (error) {
            toast.dismiss();
            console.error("Verification failed:", error);
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setIsProcessing(false);
            setSelectedPlanId(null);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setSelectedPlanId(null);
          },
        },
      };

      // Track InitiateCheckout in Meta Pixel
      event("InitiateCheckout", {
        content_name: `${categoryName} - ${plan.name || plan.subscriptionType}`,
        content_ids: [plan.id],
        content_type: "product",
        value: data.amount / 100, // Razorpay amount is in paise
        currency: data.currency || "INR",
      });

      const { initiateRazorpayPayment } = await import("@/lib/razorpay");
      await initiateRazorpayPayment(options);

    } catch (error: any) {
      console.error("❌ Subscription Error:", error);
      toast.error(error?.response?.data?.message || "Failed to initiate subscription");
      setIsProcessing(false);
      setSelectedPlanId(null);
    }
  };

  if (hasAccess) {
    return (
      <Card className="bg-emerald-50 border-emerald-200 p-6 shadow-sm">
        <div className="flex items-center justify-center gap-3 text-emerald-700">
          <Check size={24} className="shrink-0" />
          <div className="text-center">
            <p className="font-bold text-lg">Subscribed</p>
            <p className="text-sm text-emerald-600/80">You have full access to this category</p>
          </div>
        </div>
      </Card>
    );
  }

  if (pricing.length === 0) {
    return null;
  }

  // Sort pricing: yearly first (best value), then monthly
  const sortedPricing = [...pricing].sort((a, b) => {
    if (a.subscriptionType === "yearly") return -1;
    if (b.subscriptionType === "yearly") return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sortedPricing.map((plan) => {
        const isYearly = plan.subscriptionType === "yearly";
        const finalPrice = plan.discountedPrice || plan.price;
        const monthlyPrice = isYearly ? Math.round(finalPrice / 12) : finalPrice;
        const savings = plan.discountedPrice ? plan.price - plan.discountedPrice : 0;
        const savingsPercent = savings > 0 ? Math.round((savings / plan.price) * 100) : 0;

        return (
          <Card
            key={plan.id}
            className={`relative overflow-hidden transition-all shadow-sm ${isYearly
              ? "bg-linear-to-br from-purple-50 via-white to-pink-50 border-purple-200 hover:border-purple-300"
              : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-md"
              }`}
          >
            {isYearly && (
              <div className="absolute top-0 right-0">
                <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm">
                  <Sparkles size={12} />
                  Best Value
                </div>
              </div>
            )}

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Crown size={20} className={isYearly ? "text-purple-600" : "text-zinc-500"} />
                <h3 className="text-zinc-900 font-bold text-lg">{plan.name || plan.subscriptionType}</h3>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-zinc-900">
                    ₹{Math.round(finalPrice / 100)}
                  </span>
                  <span className="text-zinc-500 text-sm">
                    /{plan.subscriptionType === 'yearly' ? 'year' : plan.subscriptionType === 'monthly' ? 'month' : 'lifetime'}
                  </span>
                </div>
                {isYearly && (
                  <p className="text-purple-600 text-xs font-semibold">
                    Just ₹{Math.round((finalPrice / 12) / 100)} per month
                  </p>
                )}
                {savings > 0 && (
                  <div className="inline-block px-2 py-1 rounded bg-emerald-50 border border-emerald-100">
                    <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">Save {savingsPercent}%</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {plan.features && Array.isArray(plan.features) && plan.features.length > 0 ? (
                  plan.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-zinc-600">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Access to all courses in {categoryName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Unlimited learning</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Certificate of completion</span>
                    </div>
                  </>
                )}
              </div>

              <Button
                onClick={() => handleSubscribe(plan)}
                disabled={isProcessing}
                className={`w-full h-12 font-semibold rounded-xl transition-all ${isYearly
                  ? "bg-linear-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white shadow-lg shadow-purple-100"
                  : "bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm"
                  }`}
              >
                {isProcessing && selectedPlanId === plan.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Subscribe ${isYearly ? "Yearly" : "Monthly"}`
                )}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
