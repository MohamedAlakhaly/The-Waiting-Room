import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AddStoryForm } from "@/components/stories/add-story-form"
import { PrivacyCard } from "@/components/stories/privacy-card"
import { WordsOfImpact } from "@/components/stories/words-of-impact"

export default function AddStoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground">
              Share Your Story
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Your experiences shape the path for others. By sharing your journey, you help 
              build a more inclusive civic community in Belgium.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left sidebar */}
            <div className="space-y-6 lg:col-span-1">
              <PrivacyCard />
              <WordsOfImpact />
            </div>

            {/* Main form */}
            <div className="lg:col-span-2">
              <AddStoryForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
