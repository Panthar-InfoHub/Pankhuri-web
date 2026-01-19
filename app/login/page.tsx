import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleSignIn } from "@/components/auth/google-signin"
import { PhoneSignIn } from "@/components/auth/phone-signin"

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
    const session = await auth()
    const { callbackUrl } = await searchParams

    // Server-side redirect if already authenticated
    if (session) {
        redirect(callbackUrl || "/")
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#010001]">
            {/* Background Glows matching the screenshot */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-900/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md p-6 relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="p-3 bg-white rounded-xl shadow-lg shadow-pink-500/20 border border-white/10">
                        <Image
                            src="/images/logo.webp"
                            alt="Pankhuri Logo"
                            width={32}
                            height={32}
                            className="h-10 w-10 object-contain"
                        />
                    </div>
                </div>

                <Card className="border-white/5 bg-[#1A1A1A]/90 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl border">
                    <CardHeader className="space-y-3 pt-12 pb-8 text-center">
                        <CardTitle className="text-4xl font-bold tracking-tight text-slate-100 font-serif">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-slate-400 text-base font-medium">
                            Enter your details to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 px-10 pb-12">
                        <div className="grid gap-4">
                            <GoogleSignIn />
                        </div>

                        <div className="relative overflow-visible">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase">
                                <span className="bg-white text-black px-3 py-1 rounded font-black tracking-tighter">Or</span>
                            </div>
                        </div>

                        <PhoneSignIn />
                    </CardContent>
                </Card>

                <div className="mt-10 text-center space-y-2">
                    <p className="text-xs text-gray-500 max-w-[280px] mx-auto leading-relaxed">
                        By continuing, you agree to our {" "}
                        <a href="#" className="text-gray-400 underline hover:text-white transition-colors">Terms of Service</a>
                        {" "} and {" "}
                        <a href="#" className="text-gray-400 underline hover:text-white transition-colors">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
