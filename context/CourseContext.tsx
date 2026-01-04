"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CourseContextType } from "./types"

export const CourseContext = createContext<CourseContextType | undefined>(undefined)

export function CourseProvider({ children }: { children: ReactNode }) {
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>(["1"])

  const purchaseCourse = (courseId: string) => {
    if (!purchasedCourses.includes(courseId)) {
      setPurchasedCourses([...purchasedCourses, courseId])
    }
  }

  const hasPurchased = (courseId: string) => {
    return purchasedCourses.includes(courseId)
  }

  return (
    <CourseContext.Provider value={{ purchasedCourses, purchaseCourse, hasPurchased }}>
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse(): CourseContextType {
  const context = useContext(CourseContext)
  if (!context) {
    throw new Error("useCourse must be used within CourseProvider")
  }
  return context
}
