import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DonateHero } from "@/components/donate/donate-hero"
import { DonateForm } from "@/components/donate/donate-form"
import { DonateFeatures } from "@/components/donate/donate-features"

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DonateHero />
          <DonateForm />
          <DonateFeatures />
        </div>
      </main>
      <Footer />
    </div>
  )
}
