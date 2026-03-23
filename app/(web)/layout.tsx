import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/common/Navbar"
import { AnnouncementBarWrapper } from "@/components/common/AnnouncementBar"

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <div className="sticky top-0 z-50">
        <AnnouncementBarWrapper />
        <Navbar />
      </div>
      {children}
      <Footer />
    </main>
  )
}


