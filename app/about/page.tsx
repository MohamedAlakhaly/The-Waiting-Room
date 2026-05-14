import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Sidebar } from "@/components/layout/sidebar"
import { AboutHero } from "@/components/about/about-hero"
import { FounderStory } from "@/components/about/founder-story"
import { MissionBento } from "@/components/about/mission-bento"
import { ContactForm } from "@/components/about/contact-form"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar - hidden on mobile */}
        <Sidebar className="hidden lg:flex" />
        
        {/* Main content */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <AboutHero />
            <FounderStory />
            <MissionBento />
            <ContactForm />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
