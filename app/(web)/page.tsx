// app/(web)/page.tsx

import { HeroSection } from "@/components/home/HeroSection"
import { StatsSection } from "@/components/home/StatsSection"
import { TestimonialSection } from "@/components/home/TestimonialSection"
import { PopularCategories } from "@/components/home/PopularCategories"
import { FeaturedCourses } from "@/components/home/FeaturedCourses"
import { TrendingCourses } from "@/components/home/TrendingCourses"
import { CourseUtilizationGuide } from "@/components/home/CourseUtilizationGuide"
import { ServiceSection } from "@/components/home/ServiceSection"

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-pink-50/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <HeroSection />
      </section>

      {/* Trending Courses Section */}
      <section className="pt-24 md:pt-32 pb-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100/20 to-pink-100/20 blur-[120px] -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <TrendingCourses />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 md:pb-32 pt-12 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-pink-200/20 to-purple-200/20 blur-[100px] -z-10 rounded-full" />

        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-zinc-800 tracking-tight mb-6">
            Explore our{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
            Discover professionally curated courses across various domains to fuel your journey of growth and mastery.
          </p>
        </div>
        <PopularCategories />
      </section>

      {/* Services Section */}
      <ServiceSection />

      {/* Featured Courses Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-white/50 backdrop-blur-sm border-y border-zinc-100/80">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/40 via-transparent to-pink-50/40 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FeaturedCourses />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-zinc-50/30">
        <TestimonialSection />
      </section>

      {/* Course Utilization Guide Section */}
      <CourseUtilizationGuide />
    </main>
  )
}


