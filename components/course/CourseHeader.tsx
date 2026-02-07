"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      <div className="relative min-h-[50vh] flex items-center bg-white border-b border-gray-200 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Info Section */}
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-[10px] font-bold uppercase tracking-widest">
                    {course.category?.name}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Globe size={12} /> {course.language}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight text-balance">
                  {course.title}
                </h1>

                <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed line-clamp-2">
                  {course.description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-6 border-y border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} className="text-purple-600" />
                  <span className="text-sm font-medium">
                    {Math.floor(course.duration / 60)}h {course.duration % 60}m
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">
                    {course.averageRating || course.rating} ({course.totalReviews})
                  </span>
                </div>
                <div className="text-gray-600 text-sm font-medium capitalize">
                  {course.level} Level
                </div>
                {course.hasCertificate && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <Award size={16} className="text-purple-600" />
                    <span>Certificate</span>
                  </div>
                )}
              </div>

              {/* Trainer */}
              <Link
                href={`/trainer/${course.trainer.id}`}
                className="group/trainer flex items-center gap-4 w-fit"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 shadow-sm transition-transform duration-300 group-hover/trainer:scale-110 group-hover/trainer:border-purple-500">
                  <Image
                    src={course.trainer?.user?.profileImage || "/placeholder.svg"}
                    alt={course.trainer?.user?.displayName || "Instructor"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest leading-none mb-1 group-hover/trainer:text-purple-600 transition-colors">
                    Created by
                  </p>
                  <p className="text-gray-900 font-bold group-hover/trainer:text-purple-600 transition-colors">{course.trainer?.user?.displayName}</p>
                </div>
              </Link>
            </div>

            {/* Enhanced Pricing Panel */}
            <div className="lg:col-span-4 self-start">
              <div className="relative group">
                {/* Subtle Ambient Glow */}
                <div className="absolute -inset-2 bg-purple-500/5 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-300 bg-white p-px shadow-lg">
                  <div className="relative rounded-[2.4rem] bg-gray-50 p-8 space-y-8 shadow-sm">
                    {/* Media Preview with Elevated Frame */}
                    <div
                      className="relative aspect-video rounded-2xl overflow-hidden border border-gray-300 group/media cursor-pointer"
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
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                      {(course.demoVideo?.playbackUrl || course.demoVideoId) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gray-900/20 backdrop-blur-xl border border-gray-900/30 flex items-center justify-center text-gray-900 ring-8 ring-gray-900/10 transition-transform duration-300 group-hover/media:scale-110">
                            <PlayCircle size={36} strokeWidth={1.5} className="fill-gray-900/20" /> 
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
                                <span className="w-2 h-2 rounded-full bg-green-600" />
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600">
                                  Lifetime Access
                                </span>
                              </div>
                              <div className="flex items-baseline gap-3">
                                <span className="text-5xl font-extrabold text-gray-900 tracking-tighter">
                                  ₹{price / 100}
                                </span>
                                {course.pricing?.price && course.pricing?.price > price && (
                                  <span className="text-lg font-light text-gray-400 line-through">
                                    ₹{course.pricing.price / 100}
                                  </span>
                                )}
                              </div>
                            </div>

                            {course.pricing?.price && course.pricing?.price > price && (
                              <div className="px-3 py-1 rounded-lg bg-green-100 border border-green-300 text-green-700 text-[10px] font-black uppercase tracking-wider">
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
                          <div className="p-4 rounded-2xl bg-green-100 border border-green-300 text-center">
                            <div className="flex items-center justify-center gap-2 text-green-700 font-bold">
                              <Award size={20} />
                              <span>Already Purchased</span>
                            </div>
                            <p className="text-green-600 text-xs mt-2">
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
                            <div className="p-3 rounded-xl bg-gray-100 border border-gray-300 flex flex-col items-center justify-center text-center">
                              <Shield size={16} className="text-purple-600 mb-1" />
                              <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">
                                Secure
                              </span>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-100 border border-gray-300 flex flex-col items-center justify-center text-center">
                              <Globe size={16} className="text-blue-600 mb-1" />
                              <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">
                                Global
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {!course.hasAccess && (
                        <p className="text-center text-[10px] text-gray-500 font-medium uppercase tracking-[0.3em]">
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
