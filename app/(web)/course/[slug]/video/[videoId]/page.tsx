"use client"

import { useParams, useRouter } from "next/navigation"
import { courses } from "@/data/courses"
import { curriculumData } from "@/data/curriculum"
import { VideoPlayer } from "@/components/video/VideoPlayer"
import { CoursePlaylist } from "@/components/video/CoursePlaylist"
// import { useCourse } from "@/hooks/useCourse"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { VideoDescription } from "@/components/course/VideoDescription"

export default function VideoPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const videoId = params.videoId as string

  const course = courses.find((c) => c.id === courseId)
  const curriculum = curriculumData[courseId] || []
  // const { hasPurchased } = useCourse()
  const [selectedVideoId, setSelectedVideoId] = useState(videoId)

  // Find the video from curriculum
  let selectedVideo = null
  for (const section of curriculum) {
    const video = section.videos.find((v: any) => v.id === selectedVideoId)
    if (video) {
      selectedVideo = video
      break
    }
  }

  // useEffect(() => {
  //   // Check if user has purchased the course
  //   if (!hasPurchased(courseId)) {
  //     router.push(`/course/${courseId}`)
  //   }
  // }, [courseId, hasPurchased, router])

  if (!course || !selectedVideo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Video Not Found</h1>
          <p className="text-gray-400 mb-8">The video you're looking for doesn't exist.</p>
          <Button
            onClick={() => router.push("/")}
            className="bg-linear-to-r from-purple-500 to-pink-500 text-white border-0"
          >
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Player */}
          <div className="lg:col-span-3">
            <VideoPlayer
              videoId={selectedVideo.id}
              title={selectedVideo.title}
              thumbnailUrl={selectedVideo.thumbnailUrl}
            />

            {/* Video Info */}
            <VideoDescription video={selectedVideo} course={course} />
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-1">
            <CoursePlaylist
              curriculum={curriculum}
              selectedVideoId={selectedVideoId}
              onVideoSelect={setSelectedVideoId}
              courseId={courseId}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
