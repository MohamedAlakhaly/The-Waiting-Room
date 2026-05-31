import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ImpactTracker } from "@/components/home/impact-tracker"
import { LatestVoices } from "@/components/home/latest-voices"
import { HomeCta } from "@/components/home/home-cta"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ImpactTracker />
        <LatestVoices />
        <HomeCta />
      </main>
      <Footer />
    </div>
  )
}
