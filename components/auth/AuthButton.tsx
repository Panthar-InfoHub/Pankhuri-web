"use client"

import { useSession, signOut } from "next-auth/react"
import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, BookOpen, Award } from "lucide-react"
import { usePathname } from "next/navigation"


export function AuthButton() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }


  if (status === "loading") {
    return <div className="h-9 w-24 animate-pulse bg-slate-200 rounded-md" />
  }

  if (session) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
          <DropdownMenuTrigger asChild onPointerDown={(e) => e.preventDefault()} onClick={(e) => e.preventDefault()}>
            <Avatar className="h-9 w-9 border-2 border-pink-500 hover:opacity-80 transition-all cursor-pointer ring-offset-2 hover:ring-2 ring-pink-100">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback className="bg-linear-to-r from-purple-500 to-pink-500 text-white">
                {session.user?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-xl"
            align="end"
            sideOffset={4}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-slate-900">{session.user?.name}</p>
                <p className="text-xs leading-none text-slate-500">{session.user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/account">
              <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                <User className="h-4 w-4 text-current" />
                <span>My Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/?section=my-courses">
              <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                <BookOpen className="h-4 w-4 text-current" />
                <span>My Courses</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/certificates">
              <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                <Award className="h-4 w-4 text-current" />
                <span>My Certificates</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer gap-2 py-2 text-rose-600 focus:text-rose-600 focus:bg-rose-50"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4 text-current" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}>

      <Button className="bg-linear-to-r from-purple-500 to-pink-500 hover:opacity-80 text-white border-0 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pink-200 px-6 font-semibold">
        Sign In
      </Button>
    </Link>
  )
}
