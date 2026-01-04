"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { BuyCourseButton } from "./BuyCourseButton"
import type { Course } from "@/context/types"

interface CourseHeaderProps {
  course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="relative min-h-[500px] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-gray-300 text-lg mb-6">{course.description}</p>

            {/* Instructor */}
            <div className="flex items-center gap-4 mb-8">
              <Image
                src={course.instructor.avatar || "/placeholder.svg"}
                alt={course.instructor.name}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <p className="text-white font-semibold">Instructor</p>
                <p className="text-gray-400">{course.instructor.name}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 flex-wrap">
              <div>
                <p className="text-gray-400 text-sm">Rating</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-bold">{course.rating}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Students</p>
                <p className="text-white font-bold mt-1">{(course.studentCount / 1000).toFixed(1)}K+</p>
              </div>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Price</p>
            <p className="text-4xl font-bold text-white mb-6">₹{course.price}</p>
            <BuyCourseButton courseId={course.id} courseName={course.title} />
          </div>
        </div>
      </div>
    </div>
  )
}
