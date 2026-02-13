import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/category";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="group relative block"
        >
          {/* Decorative halo glow behind card */}
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-100" />

          <div className="relative aspect-[4/5] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-4">

            {/* Image Layer with Zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={category.icon || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Refined Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent transition-opacity duration-700" />
            </div>

            {/* Floating "Studio" Label */}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <Sparkles size={10} className="text-pink-400" />
              Studio
            </div>

            {/* Content Section */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 flex flex-col items-center text-center">
              <div className="w-full relative">
                <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-tight transition-all duration-500 transform group-hover:-translate-y-2">
                  {category.name}
                </h3>

                <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-pink-300 text-[10px] font-bold uppercase tracking-[0.2em]">Explore</span>
                  <ArrowUpRight size={14} className="text-pink-300" />
                </div>
              </div>
            </div>

            {/* Animated Gradient Border Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </div>
        </Link>
      ))}
    </div>
  );
}


