import { Search, MessageCircle, Award, Sparkles } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Get Membership",
    description: "Browse our curated collection of skill-based courses designed for women.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Explore and learn",
    description: "Accurie Knowledge from 1000+ courses and learn everything",
  },
  {
    icon: Award,
    step: "03",
    title: "Complete & Get Certified",
    description: "Finish your course and receive a recognized certificate.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Earn, Teach & Inspire",
    description: "Monetize your skills and inspire other women on their journey.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-gradient-to-br from-pink-500 to-purple-600 text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-white/80">Your journey to success in just 4 simple steps.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-white/20" />
              )}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl font-extrabold text-white/20 mb-4">{step.step}</div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <step.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-white/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
