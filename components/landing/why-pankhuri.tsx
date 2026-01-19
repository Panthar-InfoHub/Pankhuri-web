import { MessageCircle, Award, Users, Wallet } from "lucide-react"

const features = [
  {
    icon: MessageCircle,
    title: "Instant Doubt Solving",
    description: "Get your questions answered instantly with our dedicated support and expert guidance.",
  },
  {
    icon: Award,
    title: "Certification on Completion",
    description: "Earn recognized certificates to showcase your new skills and boost your career.",
  },
  {
    icon: Users,
    title: "Community of Learners",
    description: "Connect with like-minded women, share experiences, and grow together.",
  },
  {
    icon: Wallet,
    title: "Earn While Learning",
    description: "Discover opportunities to monetize your skills and start your entrepreneurial journey.",
  },
]

export function WhyPankhuri() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Pankhuri?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Empowering women with skills that matter. Here&apos;s what makes us different.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
