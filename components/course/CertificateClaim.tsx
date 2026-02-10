"use client"

import { useState } from "react"
import { Award, Loader2, Phone, ArrowRight, ExternalLink } from "lucide-react"
import { createCertificate } from "@/lib/api/certificate"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface CertificateClaimProps {
    courseId: string
    courseTitle: string
    certificateInfo?: {
        hasCertificate: boolean;
        isClaimable: boolean;
        isCompleted: boolean;
        certificateUrl: string | null;
    };
}

export function CertificateClaim({ courseId, courseTitle, certificateInfo }: CertificateClaimProps) {
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleClaim = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!phone || phone.length < 10) {
            toast.error("Invalid Phone Number", {
                description: "Please enter a valid 10-digit WhatsApp number."
            })
            return
        }

        setLoading(true)

        try {
            const response = await createCertificate(courseId, phone)

            if (response.success) {
                toast.success("Certificate Generated!", {
                    description: "Redirecting you to your achievements..."
                })
                setOpen(false)
                setTimeout(() => {
                    router.push("/certificates")
                }, 2000)
            } else {
                toast.error("Failed to Generate", {
                    description: response.message || "Ensure you have completed all lessons in this course."
                })
            }
        } catch (error: any) {
            console.error("Certificate Claim Error:", error)
            const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again."
            toast.error("Error", {
                description: errorMessage
            })
        } finally {
            setLoading(false)
        }
    }

    if (!certificateInfo?.hasCertificate) return null;

    const { isClaimable, certificateUrl } = certificateInfo;

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-black tracking-tight">Certification</h2>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-black text-sm">Official Course Certificate</h3>
                        <p className="text-xs text-gray-500">Verified completion certificate for your records.</p>
                    </div>
                </div>

                {certificateUrl ? (
                    <Button
                        asChild
                        className="bg-purple-600 text-white hover:bg-purple-700 rounded-xl px-6 font-bold flex items-center gap-2"
                    >
                        <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
                            View Certificate
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </Button>
                ) : (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                disabled={!isClaimable}
                                className="bg-white text-black hover:bg-gray-200 rounded-xl px-6 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Claim Certificate
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0A0A0A] border-white/10 text-white sm:max-w-md rounded-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black">Claim Achievement</DialogTitle>
                                <DialogDescription className="text-gray-500">
                                    Enter your WhatsApp number to receive your certificate for <strong>{courseTitle}</strong>.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleClaim} className="space-y-6 py-4">
                                <div className="space-y-2">
                                    <div className="relative group/input">
                                        <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within/input:text-purple-400 transition-colors">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <Input
                                            type="tel"
                                            placeholder="WhatsApp Number (e.g. 7268854798)"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            disabled={loading}
                                            className="bg-white/5 border-white/10 rounded-xl py-6 pl-12 h-12 text-white placeholder:text-gray-600 focus-visible:ring-purple-500/50"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-6 bg-linear-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all rounded-xl font-bold flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Generate Certificate
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest pt-2 border-t border-white/5">
                                <span>Instant Generation</span>
                                <span className="w-1 h-1 rounded-full bg-gray-800" />
                                <span>Verified Link</span>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </section>
    )
}
