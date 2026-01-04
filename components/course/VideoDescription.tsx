"use client"

import type { Video } from "@/context/types"
import type { Course } from "@/context/types"
import { Clock, User, Tag } from "lucide-react"

interface VideoDescriptionProps {
  video: Video
  course: Course
}

export function VideoDescription({ video, course }: VideoDescriptionProps) {
  // TODO: Replace mock video description data with API call from course.service.ts

  // Mock tags - will be replaced with actual data from backend
  const tags = ["React", "Web Development", "JavaScript"]

  return (
    <div className="mt-8 bg-gradient-to-b from-gray-900 to-black rounded-lg p-6 border border-gray-800">
      {/* Video Title */}
      <h2 className="text-2xl font-bold text-white mb-3">{video.title}</h2>

      {/* Video Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">{video.description}</p>

      {/* Metadata Row */}
      <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-700">
        {/* Duration */}
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-purple-400" />
          <div>
            <p className="text-xs text-gray-500 uppercase">Duration</p>
            <p className="text-white font-medium">{video.duration} minutes</p>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <User size={18} className="text-pink-400" />
          <div>
            <p className="text-xs text-gray-500 uppercase">Instructor</p>
            <p className="text-white font-medium">{course.instructor.name}</p>
          </div>
        </div>

        {/* Course Name */}
        <div>
          <p className="text-xs text-gray-500 uppercase">Course</p>
          <p className="text-white font-medium truncate max-w-xs">{course.title}</p>
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <p className="text-xs text-gray-500 uppercase mb-3 flex items-center gap-2">
          <Tag size={14} />
          Topics
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30 hover:border-purple-500/60 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
