"use client"

import { X, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ExitIntentPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ExitIntentPopup({ isOpen, onClose }: ExitIntentPopupProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-card rounded-[2.5rem] shadow-2xl p-8 md:p-10 animate-in zoom-in-95 duration-300 overflow-hidden border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Decorative Blurs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl opacity-50" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative text-center space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white p-1 rounded-2xl shadow-sm border border-border">
                <Image 
                  src="/landing/logo.jpeg" 
                  alt="Pankhuri Logo" 
                  width={80} 
                  height={80} 
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/10">
              <Sparkles className="h-3.5 w-3.5 text-primary fill-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Wait! Don't Miss Out</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Think one more time
              </span>
              <br />
              <span className="text-foreground">before leaving</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
              Unlock your potential with <span className="font-semibold text-primary">250+ world-class courses</span> curated to help you shine.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/courses" onClick={onClose} className="block">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-full h-14 text-lg font-bold shadow-lg shadow-primary/25 transition-all"
              >
                Explore Best Courses
              </Button>
            </Link>
            
            <button 
              onClick={onClose}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              Maybe later, take me back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
