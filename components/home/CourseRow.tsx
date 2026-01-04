"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { CourseCard } from "@/components/course/CourseCard"
import type { Course } from "@/context/types"

interface CourseRowProps {
  title: string
  courses: Course[]
}

export function CourseRow({ title, courses }: CourseRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute -left-12 top-1/3 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={32} className="text-white hover:text-purple-400" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {courses.map((course) => (
            <div key={course.id} className="flex-shrink-0 w-64">
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute -right-12 top-1/3 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={32} className="text-white hover:text-purple-400" />
        </button>
      </div>
    </div>
  )
}
