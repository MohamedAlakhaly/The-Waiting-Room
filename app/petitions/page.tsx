import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PetitionHeader } from "@/components/petition/petition-header"
import { PetitionContent } from "@/components/petition/petition-content"
import { PetitionSignForm } from "@/components/petition/petition-sign-form"
import { RecentSupporters } from "@/components/petition/recent-supporters"
import { SharePetition } from "@/components/petition/share-petition"

export default function PetitionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left content */}
            <div className="lg:col-span-3 space-y-8">
              <PetitionHeader />
              <PetitionContent />
              <SharePetition />
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <PetitionSignForm />
              <RecentSupporters />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
