import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Sparkles } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-600 border-pink-200 rounded-full px-4 py-1.5">
                <Star className="h-3.5 w-3.5 mr-1.5 fill-pink-500 text-pink-500" />
                4.9 Rating
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 border-purple-200 rounded-full px-4 py-1.5">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                Trusted by 1M+ Women
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-balance">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Learn. Grow. Shine.
              </span>
              <br />
              <span className="text-foreground">With Pankhuri</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              1000+ Courses, 18+ Categories, ₹2.5 Lakh worth Courses. 
            </p>

            <div className="space-y-4 max-w-md">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl" />

                <div className="relative space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-pink-500 fill-pink-500" />
                    <span className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
                      Choose Your Plan
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border-2 border-pink-200">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Monthly</p>
                      <p className="text-3xl font-extrabold text-foreground">₹349</p>
                      <p className="text-xs text-muted-foreground mt-1">per month</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200 relative">
                      <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        SAVE 52%
                      </div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Yearly</p>
                      <p className="text-3xl font-extrabold text-foreground">₹1,999</p>
                      <p className="text-xs text-muted-foreground mt-1">₹166/month</p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full h-14 text-lg font-bold shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all"
                  >
                    Subscribe now
                  </Button>
                </div>
              </div>
            </div>
            {/* End of redesigned pricing section */}

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="pt-4">
              <Image
                src="/landing/logo.png"
                alt="Download on App Store or Get it on Google Play"
                width={300}
                height={150}
                className="w-64 h-auto"
              />
            </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-3xl blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/landing/hero-images/indian-woman-learning-makeup-beauty-course.jpg"
                    alt="Woman learning makeup"
                    width={220}
                    height={280}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/landing/hero-images/indian-woman-crafting-handmade-jewelry.jpg"
                    alt="Woman crafting jewelry"
                    width={220}
                    height={200}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/landing/hero-images/indian-woman-fitness-yoga-instructor.jpg"
                    alt="Woman doing yoga"
                    width={220}
                    height={200}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/landing/hero-images/indian-woman-cooking-baking-class.jpg"
                    alt="Woman in cooking class"
                    width={220}
                    height={280}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
