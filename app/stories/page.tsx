"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { StoriesHeader } from "@/components/stories/stories-header"
import { StoriesFilter } from "@/components/stories/stories-filter"
import { StoriesGrid } from "@/components/stories/stories-grid"
import { FeaturedStory } from "@/components/stories/featured-story"

export default function StoriesPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StoriesHeader />
          <StoriesFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <StoriesGrid activeFilter={activeFilter} />
            </div>
            <div className="lg:col-span-1">
              <FeaturedStory />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}