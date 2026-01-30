"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CourseDescriptionProps {
    description: string
}

export function CourseDescription({ description }: CourseDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const maxLength = 300 // Character limit before showing "Read More"

    const shouldShowButton = description.length > maxLength

    return (
        <div className="relative">
            <div className={`prose prose-invert prose-purple max-w-3xl transition-all duration-500 overflow-hidden ${!isExpanded && shouldShowButton ? 'max-h-[150px]' : 'max-h-[2000px]'}`}>
                <p className="text-gray-400 leading-relaxed text-xl font-light whitespace-pre-wrap">
                    {description}
                </p>

                {!isExpanded && shouldShowButton && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#010001] to-transparent pointer-events-none" />
                )}
            </div>

            {shouldShowButton && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold text-sm uppercase tracking-widest transition-colors"
                >
                    {isExpanded ? (
                        <>Show Less <ChevronUp size={16} /></>
                    ) : (
                        <>Read More <ChevronDown size={16} /></>
                    )}
                </button>
            )}
        </div>
    )
}
