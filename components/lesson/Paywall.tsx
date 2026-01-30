"use client"

import { Lock, Crown } from "lucide-react"
import Link from "next/link"

interface PaywallProps {
    title: string
    courseId: string
}

export function Paywall({ title, courseId }: PaywallProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 border border-purple-500/20">
                <Lock className="w-10 h-10 text-purple-400" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">Unlock This Lesson</h2>
            <p className="text-gray-400 max-w-md mb-8">
                "{title}" is only available to subscribers. Join our community to get full access to all lessons, resources, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href={`/course/${courseId}/checkout`}
                    className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2"
                >
                    <Crown className="w-5 h-5" />
                    Subscribe Now
                </Link>
                <Link
                    href="/pricing"
                    className="px-8 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all border border-white/10"
                >
                    View Plans
                </Link>
            </div>
        </div>
    )
}
