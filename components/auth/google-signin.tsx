"use client"

import { useState } from "react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { FirebaseAuth } from "@/config/firebase"
import { signIn as nextAuthSignIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"

export function GoogleSignIn() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")

    const handleLogin = async () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })

        try {
            const firebaseResult = await signInWithPopup(FirebaseAuth, provider)
            const idToken = await firebaseResult.user.getIdToken()

            const result = await nextAuthSignIn("credentials", {
                idToken,
                method: "google",
                redirect: false,
            })

            if (result?.error) {
                toast.error("Backend authentication failed")
            } else {
                toast.success("Welcome back!")
                router.push(callbackUrl || "/")
                router.refresh()
            }
        } catch (error: any) {
            // Fix: Reset loading state if user closes the popup
            if (error.code === "auth/popup-closed-by-user") {
                toast.info("Login cancelled")
            } else {
                console.error("Google Auth Error:", error)
                toast.error(error.message || "Google login failed")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            type="button"
            disabled={loading}
            onClick={handleLogin}
            className="h-14 w-full rounded-2xl bg-black border-white/10 text-white hover:bg-neutral-900 hover:border-white/20 transition-all duration-300 group flex items-center justify-center gap-3 text-lg font-medium"
        >
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <div className="bg-white p-1.5 rounded-full">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                </div>
            )}
            Continue with Google
        </Button>
    )
}
