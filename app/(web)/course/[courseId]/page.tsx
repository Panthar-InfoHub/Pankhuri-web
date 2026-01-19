"use client"

import { courses } from "@/data/courses"
import { curriculumData } from "@/data/curriculum"
import { CourseHeader } from "@/components/course/CourseHeader"
import { CourseCurriculum } from "@/components/course/CourseCurriculum"
import { CourseRow } from "@/components/home/CourseRow"
import { useParams } from "next/navigation"

export default function CoursePage() {
  const params = useParams()
  const courseId = params.courseId as string

  const course = courses.find((c) => c.id === courseId)
  const curriculum = curriculumData[courseId] || []

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Course Not Found</h1>
          <p className="text-gray-400">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => c.categoryId === course.categoryId && c.id !== courseId).slice(0, 6)

  return (
    <main className="bg-black min-h-screen">
      <CourseHeader course={course} />
      <CourseCurriculum curriculum={curriculum} courseId={courseId} />

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <CourseRow title="Related Courses" courses={relatedCourses} />
        </section>
      )}
    </main>
  )
}
