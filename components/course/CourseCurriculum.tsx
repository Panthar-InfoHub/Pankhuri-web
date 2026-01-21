"use client"

import Link from "next/link"
import { ChevronDown, Lock, PlayCircle, FileText, HelpCircle, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Module, Lesson } from "@/types/course"

interface CourseCurriculumProps {
  curriculum: Module[]
  courseSlug: string
  hasAccess: boolean
}

export function CourseCurriculum({ curriculum, courseSlug, hasAccess }: CourseCurriculumProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([curriculum[0]?.id || ""])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle size={18} className="text-purple-400" />;
      case 'text': return <FileText size={18} className="text-blue-400" />;
      default: return <HelpCircle size={18} className="text-gray-400" />;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Course Curriculum</h2>
        <p className="text-gray-400 text-sm">
          {curriculum.length} Modules • {curriculum.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons
        </p>
      </div>

      <div className="space-y-3">
        {curriculum.map((module) => (
          <div key={module.id} className="group border border-white/5 rounded-2xl overflow-hidden bg-[#0A0A0A] hover:border-white/10 transition-all">
            <button
              onClick={() => toggleSection(module.id)}
              className="w-full px-6 py-5 flex items-center justify-between text-white text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold transition-colors ${expandedSections.includes(module.id) ? 'bg-purple-500 border-purple-500' : 'bg-white/5'}`}>
                  {module.sequence}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{module.title}</h3>
                  <p className="text-gray-500 text-xs">
                    {module.lessons.length} lessons • {module.duration} min
                  </p>
                </div>
              </div>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform duration-300 ${expandedSections.includes(module.id) ? "rotate-180 text-white" : ""}`}
              />
            </button>

            {expandedSections.includes(module.id) && (
              <div className="px-6 pb-6 space-y-2">
                {module.lessons.map((lesson) => {
                  const isLocked = !hasAccess && !lesson.isFree;

                  return (
                    <div key={lesson.id} className={`flex items-center justify-between p-4 rounded-xl border border-white/5 transition-all ${isLocked ? 'opacity-50 grayscale' : 'hover:bg-white/5 hover:border-white/10'}`}>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0">
                          {getLessonIcon(lesson.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-200">{lesson.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">{lesson.duration} min</span>
                            {lesson.isFree && <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded border border-green-500/20 font-bold uppercase">Free Preview</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {isLocked ? (
                          <Lock size={16} className="text-gray-600" />
                        ) : (
                          <Link
                            href={`/course/${courseSlug}/lesson/${lesson.slug || lesson.id}`}
                            className="text-[11px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300 transition-colors"
                          >
                            Start
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
