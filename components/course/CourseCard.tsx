"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Globe, Lock, Play } from "lucide-react";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  hasAccess?: boolean;
}

export function CourseCard({ course, hasAccess = true }: CourseCardProps) {
  const price = course.pricing?.discountedPrice || course.pricing?.price || 0;

  return (
    <Link href={`/course/${course.slug || course.id}`} className="block h-full group">
      <div className="flex flex-col h-full bg-white rounded-[2rem] border border-zinc-100 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2">
        {/* Thumbnail Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={course.thumbnailImage || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Play className="text-white fill-white ml-1" size={24} />
            </div>
          </div>

          {!hasAccess && (
            <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Lock size={20} className="text-white" />
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {course.level && (
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-zinc-900 shadow-sm">
                {course.level}
              </span>
            )}
            {!hasAccess && (
              <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Lock size={10} /> Locked
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-widest">
              {course.category?.name}
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-zinc-900 font-bold text-xs">
                {course.averageRating || course.rating}
              </span>
            </div>
          </div>

          <h3 className="text-zinc-900 font-bold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
            {course.title}
          </h3>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200">
              {course.trainer?.user?.profileImage ? (
                <Image src={course.trainer.user.profileImage} alt="Instructor" width={24} height={24} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-zinc-400">
                  {course.trainer?.user?.displayName?.[0]}
                </div>
              )}
            </div>
            <p className="text-zinc-500 text-xs">
              By <span className="text-zinc-900 font-semibold">{course.trainer?.user?.displayName}</span>
            </p>
          </div>

          <div className="mt-auto pt-5 border-t border-zinc-50 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-zinc-300" /> {Math.floor(course.duration / 60)}h {course.duration % 60}m
              </span>
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <Globe size={12} className="text-zinc-300" /> {course.language}
              </span>
            </div>

            <div className="text-right">
              {price > 0 ? (
                <div className="flex flex-col items-end">
                  <p className="text-zinc-900 font-bold text-xl tracking-tighter italic">₹{price / 100}</p>
                </div>
              ) : course.isPaid ? (
                <p className="text-purple-600 font-bold text-xs uppercase tracking-widest">Premium</p>
              ) : (
                <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest">Free</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

