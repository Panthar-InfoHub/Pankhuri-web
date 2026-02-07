"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { CategoryPricing } from "@/types/category";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleSubscribe = async (plan: CategoryPricing) => {
    if (hasAccess) return;

    setIsProcessing(true);
    setSelectedPlanId(plan.id);

    try {
      // Call subscription API
      const response = await fetch("/api/subscriptions/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to initiate subscription");
      }

      // Redirect to Razorpay hosted page
      if (result.data?.shortUrl) {
        window.location.href = result.data.shortUrl;
      } else {
        throw new Error("No subscription URL received");
      }
    } catch (error: any) {
      console.error("❌ Subscription Error:", error);
      toast.error(error.message || "Failed to start subscription");
      setIsProcessing(false);
      setSelectedPlanId(null);
    }
  };

  if (hasAccess) {
    return (
      <Card className="bg-emerald-50 border-emerald-200 p-6 shadow-sm">
        <div className="flex items-center justify-center gap-3 text-emerald-700">
          <Check size={24} className="flex-shrink-0" />
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
                ? "bg-gradient-to-br from-purple-50 via-white to-pink-50 border-purple-200 hover:border-purple-300"
                : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-md"
              }`}
          >
            {isYearly && (
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm">
                  <Sparkles size={12} />
                  Best Value
                </div>
              </div>
            )}

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Crown size={20} className={isYearly ? "text-purple-600" : "text-zinc-500"} />
                <h3 className="text-zinc-900 font-bold text-lg capitalize">{plan.subscriptionType}</h3>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-zinc-900">
                    ₹{Math.round(monthlyPrice / 100)}
                  </span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                {isYearly && (
                  <p className="text-zinc-500 text-xs">
                    ₹{Math.round(finalPrice / 100)} billed annually
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
                      <Check size={16} className="text-emerald-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Check size={16} className="text-emerald-600 flex-shrink-0" />
                      <span>Access to all courses in {categoryName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Check size={16} className="text-emerald-600 flex-shrink-0" />
                      <span>Unlimited learning</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Check size={16} className="text-emerald-600 flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </div>
                  </>
                )}
              </div>

              <Button
                onClick={() => handleSubscribe(plan)}
                disabled={isProcessing}
                className={`w-full h-12 font-semibold rounded-xl transition-all ${isYearly
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white shadow-lg shadow-purple-100"
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
