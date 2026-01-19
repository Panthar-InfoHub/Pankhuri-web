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
import { useRouter } from "next/navigation"

export function PhoneSignIn() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
    const [step, setStep] = useState<"phone" | "otp">("phone")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

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
                    router.push("/")
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
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={loading}
                        maxLength={6}
                        className="h-14 text-center text-2xl tracking-[0.5em] font-bold rounded-xl border-slate-200 focus:ring-pink-500 bg-slate-50/30"
                    />
                    <p className="text-xs text-slate-500 mt-4">
                        Didn't receive code? {" "}
                        <button
                            type="button"
                            onClick={() => setStep("phone")}
                            className="text-pink-600 font-bold hover:underline"
                        >
                            Resend
                        </button>
                    </p>
                </div>
                <Button
                    type="submit"
                    disabled={loading || otp.length < 6}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold shadow-lg shadow-pink-200/50 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify & Continue"}
                    {!loading && <CheckCircle2 className="ml-2 h-4 w-4" />}
                </Button>
            </form>
        )
    }

    return (
        <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</Label>
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        id="phone"
                        placeholder="Enter 10-digit number"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={loading}
                        className="pl-11 h-12 rounded-xl border-slate-200 focus:ring-pink-500 focus:border-pink-500 transition-all bg-slate-50/30"
                    />
                </div>
            </div>
            <Button
                type="submit"
                disabled={loading || !phoneNumber}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold shadow-lg shadow-pink-200/50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Request OTP"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            <div id="recaptcha-container"></div>
        </form>
    )
}
