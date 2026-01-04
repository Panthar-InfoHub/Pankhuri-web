"use client"

import { useCourse as useCourseContext } from "@/context/CourseContext"

export function useCourse() {
  return useCourseContext()
}
