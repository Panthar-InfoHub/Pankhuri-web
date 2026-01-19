"use client"

// import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AuthButton() {
  // const { isLoggedIn } = useAuth()

  // if (isLoggedIn) {
  //   return (
  //     <Link href="/account">
  //       <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 text-white border-0">
  //         My Account
  //       </Button>
  //     </Link>
  //   )
  // }

  return (
    <Link href="/login">
      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 text-white border-0">
        Sign In
      </Button>
    </Link>
  )
}
