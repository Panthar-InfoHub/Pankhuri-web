"use client"

import Link from "next/link"
import Image from "next/image"
// import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X } from "lucide-react"
import { AuthButton } from "../auth/AuthButton"

export function Navbar() {
  // const { isLoggedIn, logout, user } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)



  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.webp" alt="Pankhuri Logo" width={40} height={40} className="h-10 w-10" />
            <div className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Pankhuri
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/courses"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Courses
            </Link>

            <Link
              href="/plans"
              className="text-sm text-muted-foreground hover:text-primarytransition-colors duration-200 font-medium"
            >
              Plans
            </Link>
            {/* {isLoggedIn && (
              <Link
                href="/?section=my-courses"
                className="text-sm text-gray-200 hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                My Courses
              </Link>
            )} */}
          </div>

          {/* Profile & Auth */}
          <div className="hidden md:flex items-center gap-4">
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-800 pt-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-muted-foreground hover:text-primary font-medium"
            >
              Home
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-muted-foreground hover:text-primary font-medium"
            >
              Categories
            </Link>
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-muted-foreground hover:text-primary font-medium"
            >
              Courses
            </Link>
            <Link
              href="/landing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-muted-foreground hover:text-primary font-medium"
            >
              Premium 
            </Link>
            <div className="pt-2">
              <AuthButton /> 
            </div>
          </div>  
        )}
      </div>
    </nav>
  )
}
