"use client"

// import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { type ReactNode, useEffect } from "react"
import { Loader } from "./Loader"

export function ProtectedClient({
  children,
  redirectTo = "/login",
}: {
  children: ReactNode
  redirectTo?: string
}) {
  // const { isLoggedIn } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push(redirectTo)
  //   }
  // }, [isLoggedIn, redirectTo, router])

  // if (!isLoggedIn) {
  //   return <Loader />
  // }

  return children
}
