"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import type { Course } from "@/context/types"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/course/${course.id}`}>
      <div className="group cursor-pointer bg-[#1a1a1a] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-800">
        <div className="relative overflow-hidden rounded-t-lg aspect-video bg-gray-100">
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-bold ml-1">▶</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-white font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{course.instructor.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-gray-300 text-sm">{course.rating}</span>
            </div>
            <span className="text-gray-500 text-sm">({course.studentCount.toLocaleString()})</span>
          </div>
          <p className="text-purple-400 font-bold mt-2">₹{course.price}</p>
        </div>
      </div>
    </Link>
  )
}
