"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Clock, Globe, Shield, Award, PlayCircle } from "lucide-react";
import { BuyCourseButton } from "./BuyCourseButton";
import { Course } from "@/types/course";
import { DemoVideoPlayer } from "@/components/video/DemoVideoPlayer";

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const price = course.pricing?.discountedPrice || course.pricing?.price || 0;

  return (
    <>
      <div className="relative min-h-[50vh] flex items-center bg-[#010001] border-b border-white/5 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Info Section */}
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                    {course.category?.name}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Globe size={12} /> {course.language}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight text-balance">
                  {course.title}
                </h1>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed line-clamp-2">
                  {course.description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-6 border-y border-white/5">
                <div className="flex items-center gap-2 text-white/60">
                  <Clock size={16} className="text-purple-500" />
                  <span className="text-sm font-medium">
                    {Math.floor(course.duration / 60)}h {course.duration % 60}m
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">
                    {course.averageRating || course.rating} ({course.totalReviews})
                  </span>
                </div>
                <div className="text-white/60 text-sm font-medium capitalize">
                  {course.level} Level
                </div>
                {course.hasCertificate && (
                  <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
                    <Award size={16} className="text-purple-400" />
                    <span>Certificate</span>
                  </div>
                )}
              </div>

              {/* Trainer */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shadow-sm">
                  <Image
                    src={course.trainer?.user?.profileImage || "/placeholder.svg"}
                    alt={course.trainer?.user?.displayName || "Instructor"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">
                    Created by
                  </p>
                  <p className="text-white font-bold">{course.trainer?.user?.displayName}</p>
                </div>
              </div>
            </div>

            {/* Enhanced Pricing Panel */}
            <div className="lg:col-span-4 self-start">
              <div className="relative group">
                {/* Subtle Ambient Glow */}
                <div className="absolute -inset-2 bg-purple-500/5 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-linear-to-br from-white/8 to-transparent p-px shadow-2xl">
                  <div className="relative rounded-[2.4rem] bg-[#0A0A0A] p-8 space-y-8 shadow-inner shadow-white/5">
                    {/* Media Preview with Elevated Frame */}
                    <div
                      className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 group/media cursor-pointer"
                      onClick={() =>
                        (course.demoVideo?.playbackUrl || course.demoVideoId) &&
                        setIsPlayingDemo(true)
                      }
                    >
                      <Image
                        src={course.thumbnailImage || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/media:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      {(course.demoVideo?.playbackUrl || course.demoVideoId) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white ring-8 ring-white/5 transition-transform duration-300 group-hover/media:scale-110">
                            <PlayCircle size={36} strokeWidth={1.5} className="fill-white/10" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pricing & Value Prop */}
                    <div className="space-y-6">
                      {!course.hasAccess && (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">
                                  Lifetime Access
                                </span>
                              </div>
                              <div className="flex items-baseline gap-3">
                                <span className="text-5xl font-extrabold text-white tracking-tighter">
                                  ₹{price / 100}
                                </span>
                                {course.pricing?.price && course.pricing?.price > price && (
                                  <span className="text-lg font-light text-white/20 line-through">
                                    ₹{course.pricing.price / 100}
                                  </span>
                                )}
                              </div>
                            </div>

                            {course.pricing?.price && course.pricing?.price > price && (
                              <div className="px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-wider">
                                Save{" "}
                                {Math.round(
                                  ((course.pricing.price - price) / course.pricing.price) * 100,
                                )}
                                %
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      <div className="space-y-4">
                        {course.hasAccess ? (
                          <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
                            <div className="flex items-center justify-center gap-2 text-green-400 font-bold">
                              <Award size={20} />
                              <span>Already Purchased</span>
                            </div>
                            <p className="text-green-400/60 text-xs mt-2">
                              You have full access to this course
                            </p>
                          </div>
                        ) : (
                          <BuyCourseButton
                            courseId={course.id}
                            courseName={course.title}
                            isPurchased={false}
                          />
                        )}

                        {!course.hasAccess && (
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                              <Shield size={16} className="text-purple-400 mb-1" />
                              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                                Secure
                              </span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                              <Globe size={16} className="text-blue-400 mb-1" />
                              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                                Global
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {!course.hasAccess && (
                        <p className="text-center text-[10px] text-white/20 font-medium uppercase tracking-[0.3em]">
                          Enrollment processing in 256-bit AES
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPlayingDemo && course.demoVideo?.playbackUrl && (
        <DemoVideoPlayer
          playbackUrl={course.demoVideo.playbackUrl}
          title={course.title}
          thumbnailUrl={course.thumbnailImage}
          onClose={() => setIsPlayingDemo(false)}
        />
      )}
    </>
  );
}
