"use client"

import { useState } from "react"
import { HeroSection } from "@/components/home/HeroSection"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { CourseGrid } from "@/components/home/CourseGrid"
import { TestimonialSection } from "@/components/home/TestimonialSection"
import { MyCoursesSection } from "@/components/home/MyCoursesSection"
import { useAuth } from "@/hooks/useAuth"
import { categories } from "@/data/categories"
import { courses } from "@/data/courses"

export default function HomePage() {
  const { isLoggedIn } = useAuth()
  const [activeSection, setActiveSection] = useState("home")

  return (
    <main className="bg-[#010001] min-h-screen">
      <HeroSection />

      {/* Categories Section */}
      <section className="bg-[#010001] max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Categories</h2>
        <CategoryGrid categories={categories} />
      </section>

      {/* My Courses Section - Only show if logged in */}
      {isLoggedIn && <MyCoursesSection />}

      {/* Featured Courses */}
      <section className="bg-[#010001] max-w-7xl mx-auto px-4 py-12">
        <CourseGrid title="Featured Courses" courses={courses.slice(0, 6)} />
      </section>

      {/* Trending Courses */}
      <section className="bg-[#010001] max-w-7xl mx-auto px-4 py-12">
        <CourseGrid title="Trending Now" courses={courses.slice(0, 6).reverse()} />
      </section>

      {/* Testimonials */}
      <TestimonialSection />
    </main>
  )
}
