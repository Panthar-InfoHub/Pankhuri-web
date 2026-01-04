"use client"

import { useParams } from "next/navigation"
import { categories } from "@/data/categories"
import { courses } from "@/data/courses"
import { CourseCard } from "@/components/course/CourseCard"
import Image from "next/image"

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.categoryId as string

  const category = categories.find((c) => c.id === categoryId)
  const categoryCourses = courses.filter((c) => c.categoryId === categoryId)

  if (!category) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <p className="text-gray-400">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 bg-gradient-to-b from-purple-900/30 to-black overflow-hidden">
        <Image
          src={category.thumbnail || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 pb-12 md:pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl">{category.description}</p>
        </div>
      </div>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">
          {categoryCourses.length} Courses in {category.name}
        </h2>
        {categoryCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No courses found in this category yet.</p>
          </div>
        )}
      </section>
    </main>
  )
}
