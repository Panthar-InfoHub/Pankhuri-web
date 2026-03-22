"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CourseDescriptionProps {
    description: string
}

export function CourseDescription({ description }: CourseDescriptionProps) {
    if (!description || description.trim() === "") {
        return (
            <div className="p-8 bg-gray-50 border border-gray-100 rounded-3xl text-center">
                <p className="text-gray-500 font-medium">No description available for this course yet. Stay tuned for updates!</p>
            </div>
        )
    }

    const [isExpanded, setIsExpanded] = useState(false)
    const maxLength = 300

    const shouldShowButton = description.length > maxLength

    return (
        <div className="relative">
            <div
                className={`prose prose-slate max-w-none transition-all duration-500 overflow-hidden relative ${!isExpanded && shouldShowButton ? 'max-h-40' : 'max-h-[5000px]'
                    }`}
            >
                <p className="text-gray-800 leading-relaxed text-lg font-normal whitespace-pre-wrap">
                    {description}
                </p>

                {!isExpanded && shouldShowButton && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
                )}
            </div>

            {shouldShowButton && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold text-xs uppercase tracking-[0.2em] transition-colors relative z-20"
                >
                    {isExpanded ? (
                        <>Show Less <ChevronUp size={14} /></>
                    ) : (
                        <>Read More <ChevronDown size={14} /></>
                    )}
                </button>
            )}
        </div>
    )
}
