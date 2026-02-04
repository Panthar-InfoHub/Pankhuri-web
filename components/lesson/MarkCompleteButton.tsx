"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, Play } from "lucide-react"
import { markLessonComplete } from "@/lib/api/progress"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MarkCompleteButtonProps {
    lessonId: string
    courseSlug: string
    nextLessonSlug?: string
}

export function MarkCompleteButton({ lessonId, courseSlug, nextLessonSlug }: MarkCompleteButtonProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleComplete = async () => {
        setLoading(true)
        try {
            const response = await markLessonComplete(lessonId)
            if (response.success) {
                toast.success("Progress saved!")

                if (nextLessonSlug) {
                    router.push(`/course/${courseSlug}/lesson/${nextLessonSlug}`)
                } else {
                    router.push(`/course/${courseSlug}`)
                }
            } else {
                toast.error(response.message || "Failed to mark lesson as complete")
            }
        } catch (error: any) {
            console.error("Mark Complete Error:", error)
            const errorMessage = error.response?.data?.message || "An error occurred while saving progress."
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            onClick={handleComplete}
            disabled={loading}
            className="h-14 px-8 bg-white/10 hover:bg-white/15 text-black border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all min-w-[200px]"
        >
            {loading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    <span className="text-sm">Saving Progress...</span>
                </>
            ) : (
                <>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Mark as Completed</span>
                </>
            )}
        </Button>
    )
}
