import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { WhyPankhuri } from "@/components/landing/why-pankhuri"
import { CourseCurriculum } from "@/components/landing/course-curriculum"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CertificateSection } from "@/components/landing/certificate-section"
import { Testimonials } from "@/components/landing/testimonials"
import { FinalCTA } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <WhyPankhuri />
            <CourseCurriculum />
            <HowItWorks />
            <CertificateSection />
            <Testimonials />
            <FinalCTA />
            <Footer />
        </div>

    )
}
