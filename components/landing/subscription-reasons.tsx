import { ShieldCheck, Award, Video, Users } from "lucide-react"

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified & Trusted Mentors",
    description: "Learn from industry experts with proven track records and verified credentials",
  },
  {
    icon: Award,
    title: "Get Certificate of Completion",
    description: "Earn recognized certificates to showcase your skills and boost your career",
  },
  {
    icon: Video,
    title: "Access to Recordings",
    description: "Lifetime access to all course recordings - learn at your own pace, anytime",
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Join our exclusive community of learners and mentors for networking and support",
  },
]

export function SubscriptionReasons() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-pink-50/50 py-20">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-100/50 blur-3xl" />
      <div className="absolute right-0 top-1/4 h-48 w-48 rounded-full bg-pink-100/50 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">More Reasons to Join</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group flex gap-5 rounded-2xl border border-pink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg shadow-pink-500/20">
                <reason.icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
