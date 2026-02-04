"use client"

import { AlertCircle, ArrowRight, BookOpen, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface ContentPlaceholderProps {
    type: 'video' | 'text' | 'quiz'
    courseSlug: string
    nextLesson?: { slug: string; title: string } | null
}

export function ContentPlaceholder({ type, courseSlug, nextLesson }: ContentPlaceholderProps) {
    const typeLabel = type === 'video' ? 'Video' : type === 'text' ? 'Reading Material' : 'Quiz'

    return (
        <div className="bg-white/5 rounded-2xl border border-white/10 p-12 text-center shadow-2xl backdrop-blur-sm">
            <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
                <AlertCircle className="w-10 h-10 text-purple-400" />
            </div>

            <h2 className="text-2xl font-bold text-black mb-3">
                {typeLabel} Content Coming Soon
            </h2>

            <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                We're currently preparing the {typeLabel.toLowerCase()} content for this lesson.
                It will be available shortly. In the meantime, you can explore other lessons or move to the next topic.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                    href={`/course/${courseSlug}`}
                    className="flex items-center gap-2 px-6 py-3 bg-black/5 hover:bg-black/10 text-black rounded-xl transition-all border border-white/10 group w-full sm:w-auto justify-center"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Course
                </Link>

                {nextLesson && (
                    <Link
                        href={`/course/${courseSlug}/lesson/${nextLesson.slug}`}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all shadow-lg shadow-purple-600/20 group w-full sm:w-auto justify-center"
                    >
                        Next Lesson
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Continuing your learning journey at Panthar
                </p>
            </div>
        </div>
    )
}
