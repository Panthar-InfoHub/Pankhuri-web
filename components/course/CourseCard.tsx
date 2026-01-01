"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, Clock, Globe } from "lucide-react"
import { Course } from "@/types/course"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const price = course.pricing?.discountedPrice || course.pricing?.price || 0;

  return (
    <Link href={`/course/${course.slug || course.id}`}>
      <div className="group cursor-pointer bg-[#0A0A0A] rounded-xl shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden border border-white/5 hover:border-purple-500/30">
        <div className="relative overflow-hidden aspect-video bg-white/5">
          <Image
            src={course.thumbnailImage || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-xs font-medium px-2 py-1 bg-purple-600 rounded">View Course</span>
          </div>
          {course.level && (
            <div className="absolute top-2 left-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-white px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10">
                {course.level}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-widest">{course.category?.name}</span>
          </div>
          <h3 className="text-white font-bold line-clamp-2 group-hover:text-purple-400 transition-colors text-base leading-snug">
            {course.title}
          </h3>
          <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
            By <span className="text-gray-300">{course.trainer?.user?.displayName}</span>
          </p>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-white font-bold text-sm">{course.averageRating || course.rating}</span>
              <span className="text-gray-500 text-xs">({course.totalReviews})</span>
            </div>
            <div className="text-right">
              {price > 0 ? (
                <p className="text-white font-bold text-lg">₹{price / 100}</p>
              ) : (
                <p className="text-green-400 font-bold text-sm uppercase tracking-tight">Free</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><Clock size={10} /> {Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
            <span className="flex items-center gap-1 uppercase"><Globe size={10} /> {course.language}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
