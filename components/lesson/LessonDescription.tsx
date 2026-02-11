"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Info, Sparkles } from "lucide-react"

interface LessonDescriptionProps {
    content: string
}

export function LessonDescription({ content }: LessonDescriptionProps) {
    return (
        <div className="w-full">
            <Accordion type="single" collapsible defaultValue="description" className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <AccordionItem value="description" className="border-none">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                                <Info className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-gray-900 leading-none">Lesson Overview</h3>
                                <p className="text-[11px] text-gray-500 mt-1 font-medium uppercase tracking-wider">Expand to read full details</p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-8 mt-2">
                        <div className="prose prose-slate wrap-break-word overflow-hidden">
                            <ReactMarkdown  remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] animate-pulse">
                                <Sparkles className="w-3 h-3" />
                                Happy Learning
                                <Sparkles className="w-3 h-3" />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
