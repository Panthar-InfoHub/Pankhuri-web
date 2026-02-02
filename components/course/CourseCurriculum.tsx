"use client"

import { useState } from "react"
import { ChevronDown, Lock, PlayCircle, FileText, HelpCircle } from "lucide-react"
import { Module, Lesson } from "@/types/course"
import Link from "next/link"

interface CourseCurriculumProps {
  curriculum: (Module | Lesson)[]
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
      default: return <HelpCircle size={18} className="text-white/20" />;
    }
  }

  const renderLessonCard = (lesson: Lesson) => {
    const isLocked = !hasAccess && !lesson.isFree;
    const lessonLink = `/course/${courseSlug}/lesson/${lesson.slug || lesson.id}`;

    const content = (
      <div
        className={`flex items-center justify-between p-4 rounded-xl border border-transparent transition-all duration-200 ${isLocked ? 'opacity-40 grayscale' : 'hover:bg-white/5 hover:border-white/5 cursor-pointer'}`}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="shrink-0 text-gray-500">
            {getLessonIcon(lesson.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-200 truncate">{lesson.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">{lesson.duration}m</span>
              {lesson.isFree && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-bold uppercase">Preview</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center ml-4">
          {isLocked ? (
            <Lock size={14} className="text-gray-600" />
          ) : (
            <div className="hidden md:block text-[11px] font-bold text-purple-400 uppercase tracking-widest hover:text-white transition-colors">
              Start
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
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isExpanded ? 'bg-[#0A0A0A] border-white/10' : 'bg-transparent border-white/5 hover:border-white/10'}`}
          >
            <button
              onClick={() => toggleSection(module.id)}
              className="w-full px-6 py-5 flex items-center justify-between text-white text-left group"
            >
              <div className="flex items-center gap-5">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${isExpanded ? 'bg-purple-600' : 'bg-white/5 text-white/40 group-hover:bg-white/10'}`}>
                  {module.sequence}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{module.title}</h3>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                    {module.lessons?.length || 0} Lessons • {module.duration} min
                  </p>
                </div>
              </div>

              <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-gray-500 group-hover:text-white" />
              </div>
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
              <div className="overflow-hidden">
                <div className="px-6 pb-6 space-y-2">
                  {module.lessons && module.lessons.length > 0 ? (
                    module.lessons.map((lesson) => renderLessonCard(lesson))
                  ) : (
                    <div className="text-center py-6 text-gray-500 text-sm border border-white/5 rounded-xl bg-white/5 italic">
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
