import { Button } from "@/components/ui/button"
import { Check, Crown, Zap } from "lucide-react"

const plans = [
  {
    name: "Monthly",
    price: "₹499",
    period: "/month",
    description: "Perfect for trying out",
    features: ["Access to all courses", "Certificates included", "Recording access", "Community access"],
    popular: false,
  },
  {
    name: "Yearly",
    price: "₹2,999",
    period: "/year",
    description: "Best value - Save 50%",
    features: [
      "Everything in Monthly",
      "Priority mentor support",
      "Exclusive workshops",
      "Early access to new courses",
      "1-on-1 career guidance",
    ],
    popular: true,
  },
  {
    name: "Lifetime",
    price: "₹4,999",
    period: "one-time",
    description: "Pay once, learn forever",
    features: [
      "Everything in Yearly",
      "Lifetime updates",
      "VIP community badge",
      "Free future courses",
      "Premium support forever",
    ],
    popular: false,
  },
]

export function SubscriptionPricing() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700">
            <Zap className="h-4 w-4" />
            Choose Your Plan
          </div>
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Start Learning Today</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Select the plan that works best for you and unlock your potential
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl border-2 p-6 transition-all hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-pink-500 bg-gradient-to-b from-pink-50 to-white shadow-lg shadow-pink-500/10"
                  : "border-pink-100 bg-white shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                    <Crown className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6 text-center">
                <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6 text-center">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-6 font-semibold ${
                  plan.popular
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30"
                    : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            Secure payment
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            7-day money back guarantee
          </div>
        </div>
      </div>
    </section>
  )
}
