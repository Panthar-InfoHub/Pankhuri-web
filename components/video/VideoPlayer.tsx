"use client"

import { useRef, useState } from "react"

interface VideoPlayerProps {
  videoUrl: string
  title: string
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen()
        }
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        }
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  // Check if it's a YouTube embed
  const isYouTube = videoUrl.includes("youtube.com")

  return (
    <div ref={containerRef} className="w-full bg-black rounded-lg overflow-hidden">
      {isYouTube ? (
        <div className="relative w-full pt-[56.25%] h-0 overflow-hidden bg-black">
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full"
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="relative w-full bg-black">
          <video className="w-full h-auto max-h-[70vh]" controls controlsList="nodownload" src={videoUrl} />
        </div>
      )}
    </div>
  )
}
