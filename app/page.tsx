import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ImpactTracker } from "@/components/home/impact-tracker"
import { LatestVoices } from "@/components/home/latest-voices"
import { AdvocacyReport } from "@/components/home/advocacy-report"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ImpactTracker />
        <LatestVoices />
        <AdvocacyReport />
      </main>
      <Footer />
    </div>
  )
}
