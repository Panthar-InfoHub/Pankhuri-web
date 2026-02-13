"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"


export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()


  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md backdrop-saturate-150">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image src="/landing/logo.jpeg" alt="Pankhuri Logo" width={40} height={40} className="rounded-xl" />
          <span className="text-xl font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Pankhuri
          </span>
        </div>

        {/* <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="#courses"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Courses
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Success Stories
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
        </nav> */}

        <div className="hidden md:flex items-center gap-3">
          <Link href="#pricing">
            <Button className="bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full px-6">
              Start Learning
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
