"use client"

import { useState } from "react"
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth"
import { FirebaseAuth } from "@/config/firebase"
import { signIn as nextAuthSignIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"

export function PhoneSignIn() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
    const [step, setStep] = useState<"phone" | "otp">("phone")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")

    const setupRecaptcha = () => {
        if ((window as any).recaptchaVerifier) return
        (window as any).recaptchaVerifier = new RecaptchaVerifier(FirebaseAuth, 'recaptcha-container', {
            'size': 'invisible',
        })
    }

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!phoneNumber) return toast.error("Please enter a phone number")

        setLoading(true)
        try {
            setupRecaptcha()
            const appVerifier = (window as any).recaptchaVerifier
            const formatPhone = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`
            const result = await signInWithPhoneNumber(FirebaseAuth, formatPhone, appVerifier)
            setConfirmationResult(result)
            setStep("otp")
            toast.success("OTP sent!")
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Failed to send OTP")
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!otp) return toast.error("Please enter the OTP")

        setLoading(true)
        try {
            const firebaseUser = await confirmationResult?.confirm(otp)
            const idToken = await firebaseUser?.user.getIdToken()

            if (idToken) {
                const result = await nextAuthSignIn("credentials", {
                    idToken,
                    method: "phone",
                    redirect: false,
                })

                if (result?.error) {
                    toast.error("Backend authentication failed")
                } else {
                    toast.success("Logged in successfully!")
                    router.push(callbackUrl || "/")
                    router.refresh()
                }
            }
        } catch (error: any) {
            console.error(error)
            toast.error("Invalid OTP. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (step === "otp") {
        return (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2 text-center">
                    <Input
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={loading}
                        maxLength={6}
                        className="h-16 text-center text-3xl tracking-[0.5em] font-bold rounded-2xl border-zinc-200 focus:ring-rose-500 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 transition-all focus:bg-white"
                    />
                    <p className="text-sm text-gray-500 mt-4">
                        Didn't receive code? {" "}
                        <button
                            type="button"
                            onClick={() => setStep("phone")}
                            className="text-rose-500 font-bold hover:text-rose-400 transition-colors"
                        >
                            Resend
                        </button>
                    </p>
                </div>
                <Button
                    type="submit"
                    disabled={loading || otp.length < 6}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-lg font-bold shadow-xl shadow-pink-500/20 transition-all duration-300 transform active:scale-[0.98]"
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Continue"}
                    {!loading && <CheckCircle2 className="ml-2 h-5 w-5" />}
                </Button>
            </form>
        )
    }

    return (
        <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-3">
                <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    Phone Number
                </Label>
                <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-rose-500 transition-colors" />
                    <Input
                        id="phone"
                        placeholder="Enter 10-digit number"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={loading}
                        className="pl-12 h-14 rounded-2xl border-zinc-200 focus:ring-rose-500 focus:border-rose-500 transition-all bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:bg-white"
                    />
                </div>
            </div>
            <Button
                type="submit"
                disabled={loading || !phoneNumber}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-lg font-bold shadow-lg shadow-pink-500/10 transition-all duration-300 transform active:scale-[0.98]"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Request OTP"}
                {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
            <div id="recaptcha-container"></div>
        </form>
    )
}
