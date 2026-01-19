"use client"

import Link from "next/link"
import { ChevronDown, Lock } from "lucide-react"
import { useState } from "react"
// import { useCourse } from "@/hooks/useCourse"
// import type { Curriculum } from "@/context/types"



export function CourseCurriculum({ curriculum, courseId }: any) {
  const [expandedSections, setExpandedSections] = useState<string[]>([curriculum[0]?.id || ""])
  // const { hasPurchased } = useCourse()
  // const isPurchased = hasPurchased(courseId)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Course Curriculum</h2>
      <div className="space-y-4">
        {curriculum.map((section:any) => (
          <div key={section.id} className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 bg-gray-900 hover:bg-gray-800 transition-colors flex items-center justify-between text-white"
            >
              <span className="font-semibold">{section.title}</span>
              <ChevronDown
                size={20}
                className={`transition-transform ${expandedSections.includes(section.id) ? "rotate-180" : ""}`}
              />
            </button>

            {expandedSections.includes(section.id) && (
              <div className="space-y-2 p-4 bg-gray-950">
                {section.videos.map((video:any) => (
                  <div key={video.id} className="flex items-center gap-4 p-3 hover:bg-gray-900 rounded">
                    {/* {isPurchased ? (
                      <Link
                        href={`/course/${courseId}/video/${video.id}`}
                        className="flex-1 flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                          ▶
                        </div>
                        <div className="flex-1">
                          <p className="text-white group-hover:text-purple-400 transition-colors">{video.title}</p>
                          <p className="text-gray-400 text-sm">{video.duration} min</p>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex-1 flex items-center gap-4 opacity-50">
                        <Lock size={20} className="text-gray-600" />
                        <div>
                          <p className="text-gray-400">{video.title}</p>
                          <p className="text-gray-500 text-sm">{video.duration} min</p>
                        </div>
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
