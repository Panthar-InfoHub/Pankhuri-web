// app/(web)/page.tsx

import { HeroSection } from "@/components/home/HeroSection"
import { TestimonialSection } from "@/components/home/TestimonialSection"
import { PopularCategories } from "@/components/home/PopularCategories"
import { FeaturedCourses } from "@/components/home/FeaturedCourses"
import { TrendingCourses } from "@/components/home/TrendingCourses"

export const dynamic = 'force-dynamic'


export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className=" max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-muted-foreground mb-2">Explore our{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Category
            </span></h2>
        <p className="text-muted-foreground  mb-8 max-w-2xl">Discover courses across various domains to fuel your journey of growth and learning.</p>
        <PopularCategories />
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t ">
        <FeaturedCourses />
      </section>

      {/* Trending Courses Section */}
      <section className="bg-gradient-to-b  py-16">
        <div className="max-w-7xl mx-auto px-4">
          <TrendingCourses />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />
    </main>
  )
}
