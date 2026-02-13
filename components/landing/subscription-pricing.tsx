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
      <main className="bg-zinc-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-zinc-900" />
      </main>
    );
  }

  const monthlyPlan = plans.find((p) => p.subscriptionType === "monthly");
  const yearlyPlan = plans.find((p) => p.subscriptionType === "yearly");

  return (
    <main id="pricing" className="bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-zinc-100 text-zinc-900 border-zinc-200 px-3 py-1">
            <Sparkles className="w-3 h-3 mr-1 text-purple-600" />
            Premium Access
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">Choose Your Plan</h1>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Get unlimited access to all courses and features. Cancel anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          {monthlyPlan && (
            <Card className="flex flex-col bg-white border-zinc-200 rounded-3xl overflow-hidden hover:border-zinc-300 transition-all shadow-sm hover:shadow-md">
              <CardHeader className="border-b border-zinc-100 px-8 py-10">
                <CardTitle className="text-2xl font-bold text-zinc-900">
                  {monthlyPlan.name}
                </CardTitle>
                <CardDescription className="text-zinc-500 mt-2">
                  {monthlyPlan.description}
                </CardDescription>
                <div className="mt-8">
                  <span className="text-5xl font-extrabold text-zinc-900 tracking-tight">
                    {formatPrice(monthlyPlan.price)}
                  </span>
                  <span className="text-zinc-500 text-lg">/month</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-zinc-600">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    Access to all courses
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    HD video quality
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    Cancel anytime
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    Download resources
                  </li>
                </ul>
                <Button
                  onClick={() => handleSubscribe(monthlyPlan)}
                  disabled={processingPlanId === monthlyPlan.id}
                  className="mt-auto w-full bg-zinc-900 text-white hover:bg-zinc-800 h-14 text-lg font-semibold rounded-2xl transition-all shadow-sm"
                >
                  {processingPlanId === monthlyPlan.id ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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
            <Card className="flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50 border-purple-200 rounded-3xl overflow-hidden relative hover:border-purple-300 transition-all shadow-md hover:shadow-xl">
              <div className="absolute top-6 right-6">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1 shadow-sm">
                  Best Value
                </Badge>
              </div>
              <CardHeader className="border-b border-purple-100/50 px-8 py-10">
                <CardTitle className="text-2xl font-bold text-zinc-900">
                  {yearlyPlan.name}
                </CardTitle>
                <CardDescription className="text-zinc-600 mt-2">
                  {yearlyPlan.description}
                </CardDescription>
                <div className="mt-8">
                  <span className="text-5xl font-extrabold text-zinc-900 tracking-tight">
                    {formatPrice(yearlyPlan.price)}
                  </span>
                  <span className="text-zinc-600 text-lg">/year</span>
                  {monthlyPlan && (
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mt-4">
                      <p className="text-sm font-bold text-emerald-700">
                        Save{" "}
                        {Math.round(
                          ((monthlyPlan.price * 12 - yearlyPlan.price) / (monthlyPlan.price * 12)) *
                          100,
                        )}
                        % compared to monthly
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-zinc-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    Access to all courses
                  </li>
                  <li className="flex items-center gap-3 text-zinc-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    HD video quality
                  </li>
                  <li className="flex items-center gap-3 text-zinc-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-3 text-zinc-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    Early access to new courses
                  </li>
                  <li className="flex items-center gap-3 text-zinc-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    Download resources
                  </li>
                </ul>
                <Button
                  onClick={() => handleSubscribe(yearlyPlan)}
                  disabled={processingPlanId === yearlyPlan.id}
                  className="mt-auto w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-95 h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-purple-100 transition-all"
                >
                  {processingPlanId === yearlyPlan.id ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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
        {/* <div className="mt-16 text-center">
          <p className="text-zinc-500 text-sm bg-white border border-zinc-200 inline-block px-6 py-2 rounded-full shadow-sm">
            All plans include a 7-day money-back guarantee. Questions?{" "}
            <a href="#" className="text-purple-600 font-semibold hover:underline">
              Contact support
            </a>
          </p>
        </div> */}
      </div>
    </main>
  );
}
