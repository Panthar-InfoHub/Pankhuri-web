"use client"

import { courses } from "@/data/courses"
import { CourseGrid } from "@/components/home/CourseGrid"

export default function CoursesPage() {
  return (
    <main className="bg-black min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">All Courses</h1>
        <p className="text-gray-400 mb-8">Browse our complete collection of courses</p>
        <CourseGrid title="" courses={courses} />
      </section>
    </main>
  )
}
