import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react"
import GoogleAnalyticsWrpper from "@/components/google-analytics"
import Script from "next/script"
import MetaPixelTracker from "@/components/metaPixelTracker";
import { Suspense } from "react"
import { ExitIntentWrapper } from "@/components/common/ExitIntentWrapper"


export const metadata: Metadata = {
    title: "Pankhuri - Online Learning Platform",
    description: "Learn world-class courses from expert instructors on Pankhuri.",
    generator: "v0.app",
    icons: {
        icon: [
            {
                url: "/images/logo.webp",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/images/logo-dark.webp",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/images/logo.webp",
                type: "image/svg+xml",
            },
        ],
        apple: "/images/logo.webp.png",
    },
}

const outfit = Outfit({
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
            <head>
                <Script
                    id="meta-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                                `,
                    }}
                />
            </head>
            <body className={`antialiased ${outfit.variable} font-sans`}>
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
                        alt=""
                    />
                </noscript>
                <Suspense fallback={null}>
                    <MetaPixelTracker />
                </Suspense>
                <SessionProvider>
                    {children}
                </SessionProvider>
                <ExitIntentWrapper />
                <Toaster />
                <Analytics />
                <GoogleAnalyticsWrpper />
            </body>
        </html>
    )
}

