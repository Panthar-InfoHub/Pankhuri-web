import { Button } from "@/components/ui/button"
import { Sparkles, Play } from "lucide-react"

export function SubscriptionHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100" />
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-medium text-white">
            <Sparkles className="h-4 w-4" />
            Premium Subscription
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Unlock All Courses
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Learn new skills with our expert instructors and transform your career with unlimited access to all courses
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-xl hover:shadow-pink-500/30"
            >
              Get Premium Access
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-pink-200 px-8 py-6 text-lg font-semibold text-foreground hover:bg-pink-50 bg-transparent"
            >
              <Play className="h-5 w-5 fill-pink-500 text-pink-500" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image */}
          <div className="mt-12 w-full max-w-4xl">
            <div className="relative rounded-2xl bg-gradient-to-r from-pink-100 to-purple-100 p-1">
              <div className="overflow-hidden rounded-xl bg-white">
                <img
                  src="/landing/women-learning-online-courses-on-laptop-with-color.jpg"
                  alt="Women learning online courses"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
