import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative h-[85vh] min-h-[600px] md:min-h-[750px] bg-zinc-950 overflow-hidden">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 scale-105">
        <Image
          src="/makeup-cosmetics-beauty.jpg"
          alt="Featured Course: Professional Makeup Mastery"
          fill
          className="object-cover opacity-50 transition-opacity duration-1000"
          priority
        />
      </div>

      {/* Modern Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-500/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center items-center text-center">
        <div className="w-full max-w-5xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[9px] sm:text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.2em] mb-6 sm:mb-10 uppercase shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
            The Expert Learning Platform for Women
          </div>

          <h1 className="w-full text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 sm:mb-8 leading-[1.2] sm:leading-[1.1] md:leading-[0.95] tracking-tight px-2 sm:px-0">
            Where Women Learn,{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Create & Grow
            </span>
          </h1>

          <p className="w-full text-zinc-300/90 text-base sm:text-lg md:text-2xl mb-10 sm:mb-12 max-w-xl leading-relaxed font-normal mx-auto px-4 sm:px-0">
            Master professional techniques from industry icons. Join the community where passion meets perfection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto">
            <Link href="/courses" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 text-white border-0 px-8 py-6 sm:px-10 sm:py-7 text-base sm:text-lg font-bold rounded-2xl shadow-2xl shadow-pink-500/20">
                Explore Courses
              </Button>
            </Link>
            <Link href="/landing" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 sm:px-10 sm:py-7 text-base sm:text-lg font-bold border-white/10 text-white hover:bg-white/10 bg-white/5 backdrop-blur-md rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Our Plans <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-zinc-400 font-medium justify-center">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-zinc-950 overflow-hidden shadow-xl ring-2 ring-white/5">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 24}`} alt="User" width={48} height={48} />
                </div>
              ))}
            </div>
            <div className="space-y-0.5 text-center sm:text-left">
              <p className="text-white font-bold text-base sm:text-lg">10k+ Students</p>
              <p className="text-xs sm:text-sm">Learning & growing daily</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
    </div>
  )
}


