"use client"

import Link from "next/link"
import { ChevronDown, Lock, PlayCircle, FileText, HelpCircle } from "lucide-react"
import { useState } from "react"
import { Module } from "@/types/course"

interface LessonCurriculumSidebarProps {
    curriculum: Module[]
    courseSlug: string
    currentLessonSlug: string
    hasAccess: boolean
}

const getLessonIcon = (type: string) => {
    switch (type) {
        case 'video': return <PlayCircle size={14} className="text-purple-400" />;
        case 'text': return <FileText size={14} className="text-blue-400" />;
        default: return <HelpCircle size={14} className="text-gray-400" />;
    }
}

export function LessonCurriculumSidebar({ curriculum, courseSlug, currentLessonSlug, hasAccess }: LessonCurriculumSidebarProps) {
    const [expandedSections, setExpandedSections] = useState<string[]>([
        curriculum.find(m => m.lessons?.some(l => l.slug === currentLessonSlug))?.id || curriculum[0]?.id || ""
    ])

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
        )
    }

    return (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5">
                <h3 className="font-bold text-white text-sm">Course Curriculum</h3>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
                {curriculum.map((module) => (
                    <div key={module.id} className="border-b border-white/5 last:border-0">
                        <button
                            onClick={() => toggleSection(module.id)}
                            className="w-full px-4 py-3 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-gray-500 w-4">{module.sequence}</span>
                                <span className="font-semibold text-xs truncate max-w-[150px]">{module.title}</span>
                            </div>
                            <ChevronDown
                                size={14}
                                className={`text-gray-500 transition-transform ${expandedSections.includes(module.id) ? "rotate-180" : ""}`}
                            />
                        </button>

                        {expandedSections.includes(module.id) ? (
                            <div className="bg-black/20">
                                {module.lessons && module.lessons.length > 0 ? (
                                    module.lessons.map((lesson) => {
                                        const isLocked = !hasAccess && !lesson.isFree;
                                        const isActive = lesson.slug === currentLessonSlug;

                                        return (
                                            <Link
                                                key={lesson.id}
                                                href={isLocked ? "#" : `/course/${courseSlug}/lesson/${lesson.slug}`}
                                                className={`flex items-center gap-3 px-8 py-2.5 text-xs transition-colors ${isActive
                                                    ? 'bg-purple-500/10 text-purple-400 border-l-2 border-purple-500'
                                                    : isLocked
                                                        ? 'text-gray-600 cursor-not-allowed'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {getLessonIcon(lesson.type)}
                                                <span className="truncate flex-1">{lesson.title}</span>
                                                {!lesson.videoLesson && !lesson.textLesson && lesson.type !== 'quiz' && (
                                                    <span className="text-[8px] bg-white/5 text-gray-600 px-1 py-0.5 rounded border border-white/5 font-bold uppercase ml-auto">Soon</span>
                                                )}
                                                {isLocked ? <Lock size={10} className="text-gray-700" /> : null}
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <div className="px-8 py-4 text-[10px] text-gray-500 italic">
                                        No lessons available
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    )
}
