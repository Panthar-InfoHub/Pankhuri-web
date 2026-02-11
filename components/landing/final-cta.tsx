"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm border border-pink-200">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <span className="text-sm font-medium text-pink-600">Join 1 Million+ Women</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-balance">
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Start Your Learning Journey
            </span>
            <br />
            <span className="text-foreground">Today</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Transform your passion into a profession. Learn new skills, build confidence, and join a community of
            empowered women.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full px-10 h-14 text-lg shadow-lg shadow-pink-500/25"
            >
              Subscribe now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="rounded-full px-10 h-14 text-lg border-2 border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
            >
              Download App
            </Button> */}
          </div>

          {/* <div className="flex justify-center">
            <Image
              src="/landing/logo.png"
              alt="Download on App Store or Get it on Google Play"
              width={300}
              height={150}
              className="w-64 h-auto"
            />
          </div> */}
        </div>
      </div>
    </section>
  )
}
