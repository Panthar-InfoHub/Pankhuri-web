import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
    title: "Pankhuri - Online Learning Platform",
    description: "Learn world-class courses from expert instructors on Pankhuri.",
    generator: "v0.app",
    icons: {
        icon: [
            {
                url: "/icon-light-32x32.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon-dark-32x32.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
    },
}

const poppins = Poppins({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})




export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`antialiased ${poppins.variable} font-sans`}>
                <SessionProvider>
                    {children}
                </SessionProvider>
                <Toaster />
                <Analytics />
            </body>
        </html>
    )
}
