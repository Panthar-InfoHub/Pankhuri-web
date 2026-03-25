import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { WhyPankhuri } from "@/components/landing/why-pankhuri"
import { CourseCurriculum } from "@/components/landing/course-curriculum"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CertificateSection } from "@/components/landing/certificate-section"
import { Testimonials } from "@/components/landing/testimonials"
// import { SubscriptionPricing } from "@/components/landing/subscription-pricing"
import PlansPage from "@/components/landing/subscription-pricing"
import { FinalCTA } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"
import { AnnouncementBarWrapper } from "@/components/common/AnnouncementBar"

export default function Home() {
    return (
        <div className="min-h-screen">
            <div className="sticky top-0 z-50">
                <AnnouncementBarWrapper />
                <Header />
            </div>
            <HeroSection />
            <WhyPankhuri />

            <CourseCurriculum />

            <HowItWorks />
            <CertificateSection />
            {/* <SubscriptionPricing /> */}
            <PlansPage />
            <Testimonials />
            <FinalCTA />
            <Footer />
        </div>

    )
}

