// app/(web)/page.tsx

import { HeroSection } from "@/components/home/HeroSection"
import { TestimonialSection } from "@/components/home/TestimonialSection"
import { PopularCategories } from "@/components/home/PopularCategories"
import { FeaturedCourses } from "@/components/home/FeaturedCourses"
import { TrendingCourses } from "@/components/home/TrendingCourses"

export const dynamic = 'force-dynamic'


export default function HomePage() {
  return (
    <main className="bg-[#010001] min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="bg-[#010001] max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-2">Explore Categories</h2>
        <p className="text-gray-400 mb-8 max-w-2xl">Discover courses across various domains to fuel your journey of growth and learning.</p>
        <PopularCategories />
      </section>

      {/* Featured Courses Section */}
      <section className="bg-[#010001] max-w-7xl mx-auto px-4 py-16 border-t border-white/5">
        <FeaturedCourses />
      </section>

      {/* Trending Courses Section */}
      <section className="bg-gradient-to-b from-[#010001] to-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <TrendingCourses />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />
    </main>
  )
}
