import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-[600px] md:h-[700px] bg-[#010001] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/makeup-cosmetics-beauty.jpg"
        alt="Featured Course: Professional Makeup Mastery"
        fill
        className="object-cover opacity-40"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#010001] via-[#010001]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 pb-16 md:pb-24">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 max-w-2xl">
            Master{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Professional Makeup
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl">
            Learn advanced makeup techniques from industry professionals. Create stunning looks for any occasion and
            master your craft.
          </p>
          <div className="flex gap-4">
            <Link href="/courses">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-80 text-white border-0 px-8 py-6 text-lg">
                Explore Course
              </Button>
            </Link>
            <Link href="/landing">
              <Button
              variant="outline"
              className="px-8 py-6 text-lg border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
            >
              Learn More
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
