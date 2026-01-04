"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { AuthContextType, User } from "./types"

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string) => {
    // TODO: Replace with API call from auth.service.ts
    const mockUser: User = {
      id: "1",
      name: email.split("@")[0],
      email: email,
      avatar: "/diverse-user-avatars.png",
    }
    setUser(mockUser)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  return <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
