import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleSignIn } from "@/components/auth/google-signin"
import { PhoneSignIn } from "@/components/auth/phone-signin"

export default async function LoginPage() {
    const session = await auth()

    // Server-side redirect if already authenticated
    if (session) {
        redirect("/")
    }

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
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-slate-500 font-medium">
                            Enter your details to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 px-8 pb-10">
                        <div className="grid gap-4">
                            <GoogleSignIn />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-slate-400 font-semibold tracking-wider">Or</span>
                            </div>
                        </div>

                        <PhoneSignIn />
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-sm text-slate-400">
                    By continuing, you agree to our {" "}
                    <a href="#" className="underline font-medium hover:text-slate-600">Terms of Service</a>
                    {" "} and {" "}
                    <a href="#" className="underline font-medium hover:text-slate-600">Privacy Policy</a>
                </p>
            </div>
        </div>
    )
}
