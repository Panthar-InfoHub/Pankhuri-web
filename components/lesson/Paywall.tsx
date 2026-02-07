"use client"

import { Lock, Crown } from "lucide-react"
import Link from "next/link"

interface PaywallProps {
    title: string
    courseId: string
    slug?: string
    lessonSlug?: string
    mode?: 'auth' | 'subscribe'
}

export function Paywall({ title, courseId, slug, lessonSlug, mode = 'subscribe' }: PaywallProps) {
    const isAuth = mode === 'auth';
    const callbackUrl = slug && lessonSlug ? `/course/${slug}/lesson/${lessonSlug}` : `/course/${courseId}`;

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 md:p-12 text-center bg-card rounded-[2.5rem] border border-border shadow-2xl shadow-primary/5 relative overflow-hidden">
            {/* Decorative background gradients */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />

            <div className="relative mb-8">
                <div className="w-24 h-24 bg-linear-to-tr from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center border border-primary/20 rotate-6 transition-all hover:rotate-0 hover:scale-110 duration-500 group">
                    {isAuth ? (
                        <Lock className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                    ) : (
                        <Crown className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                    )}
                </div>
                {/* Badge for premium */}
                {!isAuth && (
                    <div className="absolute -top-2 -right-2 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-tighter rounded-full shadow-lg border border-white/20">
                        Premium
                    </div>
                )}
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 tracking-tight">
                {isAuth ? "Member Access Required" : "Unlock Your Full Potential"}
            </h2>

            <div className="h-1 w-20 bg-linear-to-r from-primary to-accent rounded-full mb-8 opacity-50" />

            <p className="text-muted-foreground max-w-md mb-10 text-lg leading-relaxed">
                {isAuth
                    ? `Please sign in to access "${title}" and continue your professional growth.`
                    : `"${title}" is one of our exclusive premium lessons. Join thousands of students getting full access today.`
                }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md relative z-10">
                {isAuth ? (
                    <Link
                        href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                        className="w-full px-10 py-4 bg-linear-to-r from-primary to-accent text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 text-lg"
                    >
                        Sign In to Continue
                    </Link>
                ) : (
                    <>
                        <Link
                            href={`/course/${courseId}/checkout`}
                            className="w-full px-10 py-4 bg-linear-to-r from-primary to-accent text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                            <Crown className="w-6 h-6" />
                            Upgrade Now
                        </Link>
                        <Link
                            href="/plans"
                            className="w-full px-10 py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold hover:bg-secondary/80 transition-all border border-border flex items-center justify-center text-lg"
                        >
                            View Plans
                        </Link>
                    </>
                )}
            </div>

            {/* Subtle footer text */}
            <p className="mt-8 text-xs text-muted-foreground/60 font-medium">
                {isAuth ? "Don't have an account? Sign up in seconds." : "7-day money-back guarantee. No questions asked."}
            </p>
        </div>
    )
}
