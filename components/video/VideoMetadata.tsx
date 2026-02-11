"use client"

import { useState } from "react"
import { VideoDescriptionDetail } from "@/types/lesson"
import { ShoppingCart, Clock, Info, ExternalLink, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

interface VideoMetadataProps {
    description: VideoDescriptionDetail | null
}

export function VideoMetadata({ description }: VideoMetadataProps) {
    if (!description) return null

    const hasExtraContent = (description.timestamps?.length > 0) || description.disclaimer || description.description

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Extra Info (Accordion) */}
            {hasExtraContent && (
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="extra-info" className="border-none">
                        <AccordionTrigger className="flex items-center gap-2 py-3 px-6 bg-gray-50 hover:bg-gray-100 rounded-2xl text-sm font-bold text-gray-700 transition-all hover:no-underline w-full justify-between">
                            <div className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-purple-600" />
                                <span>Video Content & Resources</span>
                            </div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Expand Details</span>
                        </AccordionTrigger>
                        <AccordionContent className="pt-8">
                            <div className="space-y-12">
                                {/* Products Section - Inside Accordion now */}
                                {description.products && description.products.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                                                <ShoppingCart className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Featured Products</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {description.products.map((product, index) => (
                                                <a
                                                    key={index}
                                                    href={product.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center gap-4 p-3 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300"
                                                >
                                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="min-w-0 pr-2">
                                                        <p className="text-xs font-bold text-gray-900 truncate mb-1">{product.name}</p>
                                                        <p className="text-[9px] text-purple-600 font-black uppercase tracking-widest flex items-center gap-1">
                                                            Shop <ExternalLink className="w-2 h-2" />
                                                        </p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
                                    {/* Left Column: Description & Disclaimer */}
                                    <div className="space-y-8">
                                        {description.description && (
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                                                    About Video
                                                </h4>
                                                <div className="text-gray-600 text-sm leading-relaxed bg-gray-50/50 p-6 rounded-3xl whitespace-pre-wrap border border-gray-50">
                                                    <ReactMarkdown>{description.description}</ReactMarkdown>
                                                </div>
                                            </div>
                                        )}

                                        {description.disclaimer && (
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                                                    Disclaimer
                                                </h4>
                                                <div className="text-gray-500 prose text-[11px] leading-relaxed italic bg-orange-50/30 p-6 rounded-2xl border border-orange-100/50">
                                                    <ReactMarkdown>{description.disclaimer}</ReactMarkdown>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column: Timestamps */}
                                    {description.timestamps && description.timestamps.length > 0 && (
                                        <div className="space-y-6">
                                            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5" />
                                                Key Moments
                                            </h4>
                                            <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                                {description.timestamps.map((ts, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-all group cursor-default border border-transparent hover:border-purple-100"
                                                    >
                                                        <span className="text-sm font-bold text-gray-700 group-hover:text-purple-700">{ts.time_content}</span>
                                                        <span className="text-xs font-black text-purple-600 font-mono bg-white px-3 py-1.5 rounded-lg shadow-sm border border-purple-100">
                                                            {ts.time_interval}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </div>
    )
}
