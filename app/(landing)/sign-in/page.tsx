"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    type ConfirmationResult,
} from "firebase/auth"
import { FirebaseAuth } from "@/config/firebase"
// import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier | undefined
    }
}

export default function LoginPage() {
    const router = useRouter()
    // const { isLoggedIn, loading: authLoading } = useAuth()

    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [verificationId, setVerificationId] = useState<ConfirmationResult | null>(null)
    const [step, setStep] = useState<"phone" | "otp">("phone")
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     if (!authLoading && isLoggedIn) {
    //         router.push("/dashboard") // or home
    //     }
    // }, [isLoggedIn, authLoading, router])

    const setupRecaptcha = () => {
        if (window.recaptchaVerifier) return

        window.recaptchaVerifier = new RecaptchaVerifier(FirebaseAuth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        })
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(FirebaseAuth, provider)
            toast.success("Logged in successfully!")
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Failed to login with Google")
        } finally {
            setLoading(false)
        }
    }

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!phoneNumber) return toast.error("Please enter a phone number")

        setLoading(true)
        try {
            setupRecaptcha()
            const appVerifier = window.recaptchaVerifier
            const formatPhone = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`
            const confirmationResult = await signInWithPhoneNumber(FirebaseAuth, formatPhone, appVerifier!)
            setVerificationId(confirmationResult)
            setStep("otp")
            toast.success("OTP sent to your phone!")
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
            await verificationId?.confirm(otp)
            toast.success("Logged in successfully!")
        } catch (error: any) {
            console.error(error)
            toast.error("Invalid OTP. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // if (authLoading) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen bg-slate-50">
    //             <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
    //         </div>
    //     )
    // }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-rose-50 via-white to-orange-50">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/20 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md p-4 relative z-10">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/images/logo.webp"
                        alt="Pankhuri Logo"
                        width={180}
                        height={60}
                        className="h-12 w-auto object-contain"
                    />
                </div>

                <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
                    <CardHeader className="space-y-1 pt-8 pb-4 text-center">
                        <CardTitle className="text-3xl font-bold tracking-tight text-slate-800">
                            {step === "phone" ? "Welcome Back" : "Verify OTP"}
                        </CardTitle>
                        <CardDescription className="text-slate-500 font-medium">
                            {step === "phone"
                                ? "Enter your details to access your account"
                                : `Enter the code sent to ${phoneNumber}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 px-8 pb-10">
                        {step === "phone" ? (
                            <>
                                <div className="grid gap-4">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        disabled={loading}
                                        onClick={handleGoogleLogin}
                                        className="h-12 rounded-xl border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 group"
                                    >
                                        {loading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
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
                                        )}
                                        Continue with Google
                                    </Button>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-100" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-4 text-slate-400 font-semibold tracking-wider">Or</span>
                                    </div>
                                </div>

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
                                </form>
                            </>
                        ) : (
                            <form onSubmit={handleVerifyOtp} className="space-y-6">
                                <div className="space-y-2 text-center">
                                    <div className="flex justify-center gap-2">
                                        <Input
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            disabled={loading}
                                            maxLength={6}
                                            className="h-14 text-center text-2xl tracking-[0.5em] font-bold rounded-xl border-slate-200 focus:ring-pink-500 bg-slate-50/30"
                                        />
                                    </div>
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
                        )}
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-sm text-slate-400">
                    By continuing, you agree to our {" "}
                    <a href="#" className="underline font-medium hover:text-slate-600">Terms of Service</a>
                    {" "} and {" "}
                    <a href="#" className="underline font-medium hover:text-slate-600">Privacy Policy</a>
                </p>
            </div>

            <div id="recaptcha-container"></div>
        </div>
    )
}
