"use client"

import Link from "next/link"
import { ChevronDown, Lock, PlayCircle, FileText, HelpCircle, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Module } from "@/types/course"

interface LessonCurriculumSidebarProps {
    curriculum: any[]
    courseSlug: string
    currentLessonSlug: string
    hasAccess: boolean
    completedLessonIds?: string[]
}

const getLessonIcon = (type: string, isActive: boolean) => {
    const iconClass = isActive ? "text-white" : type === 'video' ? "text-purple-600" : type === 'text' ? "text-blue-600" : "text-gray-500";

    switch (type) {
        case 'video': return <PlayCircle size={14} className={iconClass} />;
        case 'text': return <FileText size={14} className={iconClass} />;
        default: return <HelpCircle size={14} className={iconClass} />;
    }
}

export function LessonCurriculumSidebar({ curriculum, courseSlug, currentLessonSlug, hasAccess, completedLessonIds = [] }: LessonCurriculumSidebarProps) {
    const [expandedSections, setExpandedSections] = useState<string[]>([
        curriculum.find(m => m.lessons?.some((l: any) => l.slug === currentLessonSlug))?.id || curriculum[0]?.id || ""
    ])

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
        )
    }

    return (
        <div className="w-full">
            {curriculum.map((module) => (
                <div key={module.id} className="mb-2">
                    <button
                        onClick={() => toggleSection(module.id)}
                        className={`w-full px-4 py-4 flex items-center justify-between text-gray-900 rounded-2xl transition-all ${expandedSections.includes(module.id) ? "bg-gray-50 shadow-sm" : "hover:bg-gray-50"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            
                            <span className="font-bold capitalize text-[13px] tracking-tight text-gray-900 text-left">{module.title}</span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-300 ${expandedSections.includes(module.id) ? "rotate-180" : ""}`}
                        />
                    </button>

                    {expandedSections.includes(module.id) ? (
                        <div className="mt-1 space-y-1">
                            {module.lessons && module.lessons.length > 0 ? (
                                module.lessons.map((lesson: any) => {
                                    const isLocked = !hasAccess && !lesson.isFree;
                                    const isActive = lesson.slug === currentLessonSlug;
                                    const isCompleted = completedLessonIds.includes(lesson.id);

                                    return (
                                        <Link
                                            key={lesson.id}
                                            href={isLocked ? "#" : `/course/${courseSlug}/lesson/${lesson.slug}`}
                                            className={`flex items-center gap-3 px-4 py-3 text-[13px] rounded-xl transition-all group ${isActive
                                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 font-bold'
                                                : isLocked
                                                    ? 'text-gray-400 cursor-not-allowed grayscale'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white transition-colors'}`}>
                                                {getLessonIcon(lesson.type, isActive)}
                                            </div>
                                            <span className="truncate flex-1">{lesson.title}</span>
                                            {isCompleted && (
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-white/20' : 'bg-green-50'}`}>
                                                    <CheckCircle className={`w-3 h-3 ${isActive ? 'text-white' : 'text-green-500'}`} />
                                                </div>
                                            )}
                                            {!lesson.videoLesson && !lesson.textLesson && lesson.type !== 'quiz' && (
                                                <span className="text-[8px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full border border-purple-200 font-black uppercase ml-auto">Soon</span>
                                            )}
                                            {isLocked ? <Lock size={12} className="text-gray-400" /> : null}
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="px-8 py-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest italic opacity-50">
                                    No lessons
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    )
}
