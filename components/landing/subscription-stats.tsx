import { Users, BookOpen, Star } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "4 Lakh+",
    label: "Happy Learners",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: BookOpen,
    value: "1000+",
    label: "Professional Courses",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Star,
    value: "4.5",
    label: "Course Rating",
    color: "from-amber-500 to-orange-500",
  },
]

export function SubscriptionStats() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">Performance Course Features</h2>
          <p className="text-muted-foreground">Join thousands of successful learners</p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-5`}
              />

              <div className="relative flex flex-col items-center text-center">
                <div className={`mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-3`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <span className="mb-1 text-3xl font-extrabold text-foreground md:text-4xl">{stat.value}</span>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
