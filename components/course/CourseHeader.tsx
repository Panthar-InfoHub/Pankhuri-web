"use client"

import Image from "next/image"
import { Star, Clock, Globe, Shield, Award } from "lucide-react"
import { BuyCourseButton } from "./BuyCourseButton"
import { Course } from "@/types/course"

interface CourseHeaderProps {
  course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const price = course.pricing?.discountedPrice || course.pricing?.price || 0;

  return (
    <div className="relative min-h-[60vh] flex items-center bg-[#010001] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
                {course.category?.name}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Globe size={12} /> {course.language}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
              {course.description}
            </p>

            {/* Instructor & Stats */}
            <div className="flex flex-wrap items-center gap-8 py-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/30">
                  <Image
                    src={course.trainer?.user?.profileImage || "/placeholder.svg"}
                    alt={course.trainer?.user?.displayName || "Instructor"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Created by</p>
                  <p className="text-white font-bold text-lg">{course.trainer?.user?.displayName}</p>
                </div>
              </div>

              <div className="h-10 w-px bg-white/10 hidden md:block" />

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Rating</p>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-white font-bold text-xl">{course.averageRating || course.rating}</span>
                    <span className="text-gray-500 text-sm">({course.totalReviews} reviews)</span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Level</p>
                  <p className="text-white font-bold text-lg capitalize">{course.level}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-gray-400 text-sm border-t border-white/5 pt-6">
              <span className="flex items-center gap-2"><Clock size={16} className="text-purple-400" /> {Math.floor(course.duration / 60)}h {course.duration % 60}m content</span>
              <span className="flex items-center gap-2"><Award size={16} className="text-purple-400" /> Certificate of completion</span>
              <span className="flex items-center gap-2"><Shield size={16} className="text-purple-400" /> Lifetime access</span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-4 self-start">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-500">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-white/5">
                <Image src={course.thumbnailImage || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform duration-300">
                    <span className="ml-1 text-2xl">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white text-xs font-bold drop-shadow-lg">Preview this course</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Investment</p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-4xl font-black text-white">₹{price / 100}</p>
                    {course.pricing?.price && course.pricing?.price > price && (
                      <p className="text-gray-500 line-through text-lg">₹{course.pricing.price / 100}</p>
                    )}
                  </div>
                </div>

                <BuyCourseButton courseId={course.id} courseName={course.title} />

                <p className="text-center text-gray-500 text-xs px-4">
                  Full lifetime access • Access on mobile and TV • 30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
