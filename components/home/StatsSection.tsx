import React from 'react';
import { Users, BookOpen, Star, Award, TrendingUp } from 'lucide-react';

export function StatsSection() {
    const stats = [
        {
            label: "Global Students",
            value: "15k+",
            icon: Users,
            color: "text-pink-500",
            bg: "bg-pink-500/10"
        },
        {
            label: "Elite Mentors",
            value: "120+",
            icon: Star,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            label: "Masterclasses",
            value: "450+",
            icon: BookOpen,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10"
        },
        {
            label: "Satisfaction",
            value: "99%",
            icon: TrendingUp,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        }
    ];

    return (
        <section className="relative pt-12 pb-16 px-6 overflow-hidden bg-white/40">
            {/* Architectural Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="max-w-7xl mx-auto relative px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center w-full">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`group relative flex flex-col items-center justify-center p-8 md:p-12 transition-all duration-700 
                                ${index !== stats.length - 1 ? 'lg:border-r border-zinc-100' : ''} 
                                ${index % 2 === 0 && index !== stats.length - 1 ? 'md:border-r lg:border-r-0' : ''}
                                ${index < 2 ? 'border-b md:border-b-0' : ''}`}
                        >
                            {/* Hover Backdrop Glow */}
                            <div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10`} />

                            {/* Icon Marker */}
                            <div className="mb-6 flex items-center justify-center">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-all duration-500 group-hover:scale-110 shadow-sm`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>

                            {/* Stat Value */}
                            <div className="text-center space-y-2">
                                <h3 className="text-4xl md:text-5xl font-semibold text-zinc-800 tracking-tight transition-all duration-500 group-hover:scale-105">
                                    {stat.value}
                                </h3>
                                <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] leading-none">
                                    {stat.label}
                                </p>
                            </div>

                            {/* Bottom Pulse Dot */}
                            <div className="mt-8 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                                <div className={`w-1.5 h-1.5 rounded-full ${stat.color.replace('text', 'bg')} animate-pulse`} />
                                <div className="h-[1px] w-8 bg-zinc-200" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </section>
    );
}

