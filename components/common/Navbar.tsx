"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const { isLoggedIn, logout, user } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#010001]/95 backdrop-blur-md border-b border-gray-800 shadow-sm">
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
              className="text-sm text-gray-200 hover:text-purple-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-sm text-gray-200 hover:text-purple-400 transition-colors duration-200 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/courses"
              className="text-sm text-gray-200 hover:text-purple-400 transition-colors duration-200 font-medium"
            >
              Courses
            </Link>
            {isLoggedIn && (
              <Link
                href="/?section=my-courses"
                className="text-sm text-gray-200 hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                My Courses
              </Link>
            )}
          </div>

          {/* Profile & Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-80 transition-opacity">
                    {user?.name.charAt(0).toUpperCase()}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#010001] border-gray-800 text-white">
                  <DropdownMenuItem
                    onClick={() => router.push("/account")}
                    className="text-gray-200 focus:text-white focus:bg-gray-800"
                  >
                    <span>My Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/help")}
                    className="text-gray-200 focus:text-white focus:bg-gray-800"
                  >
                    <span>Help Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-gray-200 focus:text-white focus:bg-gray-800">
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white border-0">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-800 pt-4">
            <Link href="/" className="block text-sm text-gray-200 hover:text-purple-400 font-medium">
              Home
            </Link>
            <Link href="/categories" className="block text-sm text-gray-200 hover:text-purple-400 font-medium">
              Categories
            </Link>
            <Link href="/courses" className="block text-sm text-gray-200 hover:text-purple-400 font-medium">
              Courses
            </Link>
            {isLoggedIn && (
              <Link
                href="/?section=my-courses"
                className="block text-sm text-gray-200 hover:text-purple-400 font-medium"
              >
                My Courses
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-gray-200 hover:text-purple-400 font-medium"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
