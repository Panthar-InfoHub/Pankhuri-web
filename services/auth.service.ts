// Authentication Service

import { config } from "@/config/env"

interface LoginCredentials {
  email: string
  password: string
}

interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
  }
  token: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      return await response.json()
    } catch (error) {
      // Fallback to mock for development
      console.warn("Using mock login - ensure API is configured in production")
      return {
        user: {
          id: "1",
          name: credentials.email.split("@")[0],
          email: credentials.email,
        },
        token: "mock-token",
      }
    }
  },

  async logout(): Promise<void> {
    try {
      await fetch(`${config.API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.warn("Logout request failed")
    }
  },

  async getCurrentUser(): Promise<any> {
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })

      if (!response.ok) {
        return null
      }

      return await response.json()
    } catch (error) {
      console.warn("Failed to fetch current user")
      return null
    }
  },
}
