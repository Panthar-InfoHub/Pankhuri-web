import { Footer } from "@/components/common/Footer"
import { Navbar } from "@/components/common/Navbar"


export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>

      <Navbar />
      {children}
      <Footer />

    </main>
  )
}
