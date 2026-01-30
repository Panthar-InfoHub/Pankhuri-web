"use client"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
interface CoursePlaylistProps {
  curriculum: any[]
  selectedVideoId: string
  onVideoSelect: (videoId: string) => void
  courseId: string
}

export function CoursePlaylist({ curriculum, selectedVideoId, onVideoSelect, courseId }: CoursePlaylistProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([curriculum[0]?.id || ""])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 h-fit">
      <div className="p-4 border-b border-gray-800">
        <h3 className="font-bold text-white">Course Content</h3>
      </div>
      <div className="divide-y divide-gray-800 max-h-96 overflow-y-auto">
        {curriculum.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-4 text-left hover:bg-gray-800 transition-colors flex items-center justify-between"
            >
              <span className="text-white font-medium text-sm">{section.title}</span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${expandedSections.includes(section.id) ? "rotate-180" : ""
                  }`}
              />
            </button>
            {expandedSections.includes(section.id) && (
              <div className="bg-gray-950 space-y-1 p-2">
                {section.videos.map((video: any) => (
                  <button
                    key={video.id}
                    onClick={() => onVideoSelect(video.id)}
                    className={`w-full text-left p-3 rounded text-sm transition-colors ${selectedVideoId === video.id ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-800"
                      }`}
                  >
                    <p className="font-medium">{video.title}</p>
                    <p className="text-xs opacity-75">{video.duration} min</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
