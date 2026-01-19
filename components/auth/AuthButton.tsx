"use client"

import { useSession, signOut } from "next-auth/react"
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
import { User, LogOut, BookOpen } from "lucide-react"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="h-9 w-24 animate-pulse bg-slate-200 rounded-md" />
  }

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9 border-2 border-pink-500 hover:opacity-80 transition-all cursor-pointer ring-offset-2 hover:ring-2 ring-pink-100">
            <AvatarImage src={session.user?.image || ""} />
            <AvatarFallback className="bg-linear-to-r from-purple-500 to-pink-500 text-white">
              {session.user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 rounded-xl" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none text-slate-900">{session.user?.name}</p>
              <p className="text-xs leading-none text-slate-500">{session.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/account">
            <DropdownMenuItem className="cursor-pointer gap-2 py-2">
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/?section=my-courses">
            <DropdownMenuItem className="cursor-pointer gap-2 py-2">
              <BookOpen className="h-4 w-4" />
              <span>My Courses</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer gap-2 py-2 text-rose-600 focus:text-rose-600 focus:bg-rose-50"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Link href="/login">
      <Button className="bg-linear-to-r from-purple-500 to-pink-500 hover:opacity-80 text-white border-0 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pink-200 px-6 font-semibold">
        Sign In
      </Button>
    </Link>
  )
}
