"use client"

import type { Video } from "@/context/types"

interface VideoItemProps {
  video: Video
  isSelected: boolean
  onClick: () => void
}

export function VideoItem({ video, isSelected, onClick }: VideoItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded transition-colors ${
        isSelected ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }`}
    >
      <p className="font-medium">{video.title}</p>
      <p className="text-sm opacity-75">{video.duration} min</p>
    </button>
  )
}
