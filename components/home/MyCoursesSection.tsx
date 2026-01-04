"use client"

import { CourseRow } from "./CourseRow"
import { useCourse } from "@/hooks/useCourse"
import { courses } from "@/data/courses"

export function MyCoursesSection() {
  const { purchasedCourses } = useCourse()

  const myCourses = courses.filter((course) => purchasedCourses.includes(course.id))

  if (myCourses.length === 0) {
    return null
  }

  return (
    <section className="bg-[#010001] max-w-7xl mx-auto px-4 py-12">
      <CourseRow title="My Courses" courses={myCourses} />
    </section>
  )
}
