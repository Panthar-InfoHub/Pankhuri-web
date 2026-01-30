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
      <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-[200px] h-[200px] bg-pink-600/10 blur-[100px] rounded-full pointer-events-none" />

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

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/60 leading-[1.1] tracking-tight">
              {course.title}
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed line-clamp-3">
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
              {course.hasCertificate && (
                <span className="flex items-center gap-2"><Award size={16} className="text-purple-400" /> Certificate of completion</span>
              )}
              <span className="flex items-center gap-2"><Shield size={16} className="text-purple-400" /> Lifetime access</span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-4 self-start">
            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-4xl p-8 shadow-[0_20px_50px_rgba(168,85,247,0.15)] hover:border-purple-500/30 transition-all duration-500 group/card">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-white/5 shadow-inner">
                <Image src={course.thumbnailImage || "/placeholder.svg"} alt={course.title} fill className="object-cover group-hover/card:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/10">
                    <span className="ml-1 text-2xl group-hover:text-purple-400 transition-colors">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-lg opacity-80">Preview this course</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Pricing & Enrollment</p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-5xl font-black text-white tracking-tighter">₹{price / 100}</p>
                    {course.pricing?.price && course.pricing?.price > price && (
                      <p className="text-gray-500 line-through text-xl font-light">₹{course.pricing.price / 100}</p>
                    )}
                  </div>
                </div>

                <BuyCourseButton courseId={course.id} courseName={course.title} />

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-center gap-3 text-green-400 text-[11px] font-bold uppercase tracking-widest">
                    <Shield className="w-4 h-4" />
                    <span>100% Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
