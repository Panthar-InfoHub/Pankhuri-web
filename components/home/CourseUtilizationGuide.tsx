import React from 'react';
import Link from 'next/link';
import { PlayCircle, Users2, LayoutDashboard, Award, Sparkles, BookOpenCheck } from 'lucide-react';

export function CourseUtilizationGuide() {
    const steps = [
        {
            title: "Structured Learning",
            description: "Follow our professionally curated learning paths designed by industry experts for maximum skill retention.",
            icon: LayoutDashboard,
            color: "from-pink-500 to-rose-500",
            shadow: "shadow-pink-500/20"
        },
        {
            title: "Interactive Live Sessions",
            description: "Participate in real-time Q&A sessions and live demonstrations to clear your doubts instantly.",
            icon: Users2,
            color: "from-purple-500 to-indigo-500",
            shadow: "shadow-purple-500/20"
        },
        {
            title: "Hands-on Projects",
            description: "Apply what you learn with practical assignments and real-world projects to build your professional portfolio.",
            icon: PlayCircle,
            color: "from-blue-500 to-cyan-500",
            shadow: "shadow-blue-500/20"
        },
        {
            title: "Industry Certification",
            description: "Earn recognized certificates upon completion that validate your expertise and boost your career prospects.",
            icon: Award,
            color: "from-emerald-500 to-teal-500",
            shadow: "shadow-emerald-500/20"
        }
    ];

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-zinc-50/50">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl -z-10">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-pink-200/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-200/10 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={14} className="animate-pulse" />
                        Success Protocol
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6">
                        Your Path to{" "}
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                            Mastery
                        </span>
                    </h2>
                    <p className="text-zinc-500 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
                        Follow our proven step-by-step methodology to transform your skills from beginner to professional artist.
                    </p>
                </div>

                <div className="relative">
                    <div className="space-y-12 lg:space-y-0 relative">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex flex-col ${index % 2 === 0 ? 'lg:items-start' : 'lg:items-end'} relative mb-12 lg:mb-10 last:mb-0`}
                            >
                                <div
                                    className={`w-full lg:w-1/2 p-8 md:p-12 rounded-[40px] bg-white border border-zinc-100 hover:border-pink-200/50 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(236,72,153,0.1)] group relative overflow-hidden
                                    ${index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'}
                                    `}
                                >
                                    {/* Number Indicator */}
                                    <div className="absolute -top-4 -right-4 lg:top-8 lg:right-12 text-8xl font-black text-zinc-50 group-hover:text-pink-50 transition-colors duration-500 -z-10 leading-none">
                                        {index + 1}
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} ${step.shadow} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-opacity-30`}>
                                            <step.icon size={32} />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">Step 0{index + 1}</span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 group-hover:text-pink-600 transition-colors duration-300">
                                                    {step.title}
                                                </h3>
                                            </div>

                                            <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-md">
                                                {step.description}
                                            </p>

                                            <div className="flex items-center gap-3 pt-4">
                                                <div className="h-[2px] w-8 bg-zinc-100 group-hover:bg-pink-200 transition-all duration-500" />
                                                <span className="text-xs font-bold text-zinc-400 group-hover:text-pink-400 transition-colors">Phase {index + 1}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Arrow (simplified) */}
                                    <div className="lg:hidden mt-8 flex justify-center text-zinc-200 group-last:hidden">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 5v14M19 12l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Desktop Connecting Arrow */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-48 z-10 pointer-events-none">
                                        {index % 2 === 0 ? (
                                            /* Left to Right Arrow */
                                            <svg className="w-full h-full text-pink-200" viewBox="0 0 200 200" fill="none">
                                                <path
                                                    d="M 60 50 C 100 50 100 120 125 145"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeDasharray="8 8"
                                                    strokeLinecap="round"
                                                    markerEnd="url(#arrowhead-pink)"
                                                />
                                                <defs>
                                                    <marker id="arrowhead-pink" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
                                                        <path d="M 0 0 L 14 7 L 0 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </marker>
                                                </defs>
                                            </svg>
                                        ) : (
                                            /* Right to Left Arrow */
                                            <svg className="w-full h-full text-purple-200" viewBox="0 0 200 200" fill="none">
                                                <path
                                                    d="M 140 50 C 100 50 100 120 75 145"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeDasharray="8 8"
                                                    strokeLinecap="round"
                                                    markerEnd="url(#arrowhead-purple)"
                                                />
                                                <defs>
                                                    <marker id="arrowhead-purple" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
                                                        <path d="M 0 0 L 14 7 L 0 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </marker>
                                                </defs>
                                            </svg>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom CTA */}
                <div className="mt-24 md:mt-32">
                    <div className="p-10 md:p-16 rounded-[48px] bg-zinc-900 text-white flex flex-col items-center text-center gap-10 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-1000" />

                        <div className="relative z-10 max-w-2xl space-y-6">
                            <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4">
                                <Sparkles size={32} className="text-pink-400 animate-pulse" />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                                Ready to Master Your Craft?
                            </h3>
                            <p className="text-zinc-400 text-xl font-medium">
                                Join thousands of successful students who have transformed their passion into professional artistry.
                            </p>
                        </div>

                        <Link href="/courses" className="relative z-10 w-full md:w-auto">
                            <button className="w-full md:w-auto px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-2xl hover:scale-105 hover:shadow-[0_20px_50px_-15px_rgba(236,72,153,0.5)] transition-all duration-300 shadow-2xl">
                                Start Your Journey Now
                            </button>
                        </Link>

                        {/* Decorative Background Circles */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}
