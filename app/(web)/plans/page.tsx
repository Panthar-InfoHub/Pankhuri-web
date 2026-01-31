"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getPlans, initiateSubscription, Plan } from "@/lib/api/plan";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/razorpay";

export default function PlansPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await getPlans("whole_app");
        setPlans(data.filter((plan) => plan.isActive));
      } catch (error) {
        console.error("Failed to fetch plans", error);
        toast.error("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (plan: Plan) => {
    if (status === "unauthenticated") {
      toast.error("Please login to subscribe");
      router.push("/login?callbackUrl=/plans");
      return;
    }

    setProcessingPlanId(plan.id);

    try {
      const { data } = await initiateSubscription(plan.id);

      toast.success("Redirecting to payment...");

      // Redirect to Razorpay short URL
      window.location.href = data.shortUrl;
    } catch (error: any) {
      console.error("❌ [Subscription] Failed:", error);
      toast.error(error?.response?.data?.message || "Failed to initiate subscription");
    } finally {
      setProcessingPlanId(null);
    }
  };

  if (loading) {
    return (
      <main className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-white" />
      </main>
    );
  }

  const monthlyPlan = plans.find((p) => p.subscriptionType === "monthly");
  const yearlyPlan = plans.find((p) => p.subscriptionType === "yearly");

  return (
    <main className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-white/10 text-white border-white/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Premium Access
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Get unlimited access to all courses and features. Cancel anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          {monthlyPlan && (
            <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-white/20 transition-all">
              <CardHeader className="border-b border-white/5 px-6 py-8">
                <CardTitle className="text-2xl font-semibold text-white">
                  {monthlyPlan.name}
                </CardTitle>
                <CardDescription className="text-zinc-400 mt-2">
                  {monthlyPlan.description}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">
                    {formatPrice(monthlyPlan.price)}
                  </span>
                  <span className="text-zinc-400 text-lg">/month</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    Access to all courses
                  </li>
                  <li className="flex items-center gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    HD video quality
                  </li>
                  <li className="flex items-center gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    Cancel anytime
                  </li>
                  <li className="flex items-center gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    Download resources
                  </li>
                </ul>
                <Button
                  onClick={() => handleSubscribe(monthlyPlan)}
                  disabled={processingPlanId === monthlyPlan.id}
                  className="w-full bg-white text-black hover:bg-white/90 h-12 font-medium rounded-xl"
                >
                  {processingPlanId === monthlyPlan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Subscribe Monthly"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Yearly Plan */}
          {yearlyPlan && (
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm rounded-2xl overflow-hidden relative hover:border-purple-500/50 transition-all">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  Best Value
                </Badge>
              </div>
              <CardHeader className="border-b border-white/5 px-6 py-8">
                <CardTitle className="text-2xl font-semibold text-white">
                  {yearlyPlan.name}
                </CardTitle>
                <CardDescription className="text-zinc-300 mt-2">
                  {yearlyPlan.description}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">
                    {formatPrice(yearlyPlan.price)}
                  </span>
                  <span className="text-zinc-300 text-lg">/year</span>
                  {monthlyPlan && (
                    <p className="text-sm text-emerald-400 mt-2">
                      Save{" "}
                      {Math.round(
                        ((monthlyPlan.price * 12 - yearlyPlan.price) / (monthlyPlan.price * 12)) *
                          100,
                      )}
                      % compared to monthly
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-emerald-400" />
                    Access to all courses
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-emerald-400" />
                    HD video quality
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-emerald-400" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-emerald-400" />
                    Early access to new courses
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-emerald-400" />
                    Download resources
                  </li>
                </ul>
                <Button
                  onClick={() => handleSubscribe(yearlyPlan)}
                  disabled={processingPlanId === yearlyPlan.id}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 h-12 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {processingPlanId === yearlyPlan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Subscribe Yearly"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 text-sm">
            All plans include a 7-day money-back guarantee. Questions?{" "}
            <a href="#" className="text-white hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
