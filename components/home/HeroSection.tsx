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
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
        <div className="max-w-5xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] mb-10 uppercase shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
            Empowering Your Creative Journey
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[0.95] tracking-tight">
            Elevate Your{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Artistry
            </span>
          </h1>

          <p className="text-zinc-300/90 text-xl md:text-2xl mb-12 max-w-xl leading-relaxed font-normal mx-auto">
            Master professional techniques from industry icons. Join the community where passion meets perfection.
          </p>

          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/courses">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 text-white border-0 px-10 py-7 text-lg font-bold rounded-2xl shadow-2xl shadow-pink-500/20">
                Explore Courses
              </Button>
            </Link>
            <Link href="/landing">
              <Button
                variant="outline"
                className="px-10 py-7 text-lg font-bold border-white/10 text-white hover:bg-white/10 bg-white/5 backdrop-blur-md rounded-2xl transition-all duration-300 flex items-center gap-2 group"
              >
                Our Plans <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="mt-20 flex items-center gap-8 text-zinc-400 font-medium justify-center">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-zinc-950 overflow-hidden shadow-xl ring-2 ring-white/5">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 24}`} alt="User" width={48} height={48} />
                </div>
              ))}
            </div>
            <div className="space-y-0.5 text-left">
              <p className="text-white font-bold text-lg">10k+ Students</p>
              <p className="text-sm">Learning & growing daily</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
    </div>
  )
}


