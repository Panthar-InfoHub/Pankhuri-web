"use client"

import { useState } from "react"
import { ChevronDown, Lock, PlayCircle, FileText, HelpCircle, CheckCircle } from "lucide-react"
import { Module, Lesson } from "@/types/course"
import Link from "next/link"

interface CourseCurriculumProps {
  curriculum: (Module | Lesson)[]
  courseSlug: string
  hasAccess: boolean
  completedLessonIds?: string[]
}

export function CourseCurriculum({ curriculum, courseSlug, hasAccess, completedLessonIds = [] }: CourseCurriculumProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([curriculum[0]?.id || ""])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle size={18} className="text-purple-600" />;
      case 'text': return <FileText size={18} className="text-blue-600" />;
      default: return <HelpCircle size={18} className="text-gray-300" />;
    }
  }

  const renderLessonCard = (lesson: Lesson) => {
    const isLocked = !hasAccess && !lesson.isFree;
    const isCompleted = completedLessonIds.includes(lesson.id);
    const lessonLink = `/course/${courseSlug}/lesson/${lesson.slug || lesson.id}`;

    const content = (
      <div
        className={`flex items-center justify-between p-4 rounded-xl border border-transparent transition-all duration-200 ${isLocked ? 'opacity-40 grayscale' : 'hover:bg-gray-100 hover:border-gray-300 cursor-pointer'}`}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="shrink-0 text-gray-500">
            {getLessonIcon(lesson.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-medium truncate ${isCompleted ? 'text-gray-500' : 'text-gray-900'}`}>{lesson.title}</p>
              {isCompleted && (
                <CheckCircle size={14} className="text-green-500 shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {lesson.duration > 0 && (
                <span className="text-[10px] text-gray-600 font-medium uppercase tracking-tighter">{lesson.duration}m</span>
              )}
              {lesson.isFree && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 border border-green-300 font-bold uppercase">Preview</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center ml-4">
          {isLocked ? (
            <Lock size={14} className="text-gray-400" />
          ) : (
            <div className={`hidden md:block text-[11px] font-bold uppercase tracking-widest transition-colors ${isCompleted ? 'text-green-600 hover:text-green-700' : 'text-purple-600 hover:text-purple-700'}`}>
              {isCompleted ? 'Review' : 'Start'}
            </div>
          )}
        </div>
      </div>
    );

    return isLocked ? (
      <div key={lesson.id}>{content}</div>
    ) : (
      <Link key={lesson.id} href={lessonLink}>
        {content}
      </Link>
    );
  }

  return (
    <div className="space-y-4">
      {curriculum.map((item) => {
        // Handle Discriminator
        const isModule = item.itemType === 'module' || (item as Module).type === 'module' || 'lessons' in item;

        if (!isModule) {
          return renderLessonCard(item as Lesson);
        }

        // Handle Module
        const module = item as Module;
        const isExpanded = expandedSections.includes(module.id);

        return (
          <div
            key={module.id}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isExpanded ? 'bg-gray-50 border-gray-300' : 'bg-white border-gray-200 hover:border-gray-300'}`}
          >
            <button
              onClick={() => toggleSection(module.id)}
              className="w-full px-6 py-5 flex items-center justify-between text-gray-900 text-left group"
            >
              <div className="flex items-center gap-5">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${isExpanded ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'}`}>
                  {module.sequence}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{module.title}</h3>
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-1">
                    {module.lessons?.length || 0} Lessons {module.duration > 0 ? `• ${module.duration} min` : ''}
                  </p>
                </div>
              </div>

              <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-gray-600 group-hover:text-gray-900" />
              </div>
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
              <div className="overflow-hidden">
                <div className="px-6 pb-6 space-y-2">
                  {module.lessons && module.lessons.length > 0 ? (
                    module.lessons.map((lesson) => renderLessonCard(lesson))
                  ) : (
                    <div className="text-center py-6 text-gray-600 text-sm border border-gray-300 rounded-xl bg-gray-100 italic">
                      No lessons available in this module
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
