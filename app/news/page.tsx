import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { NewsHeader } from "@/components/news/news-header"
import { NewsFilter } from "@/components/news/news-filter"
import { FeaturedNews } from "@/components/news/featured-news"
import { NewsGrid } from "@/components/news/news-grid"

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <NewsHeader />
          <NewsFilter />
          
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Featured article */}
            <div className="lg:col-span-2">
              <FeaturedNews />
            </div>
            
            {/* Side article */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-border bg-card p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  UNHCR
                </span>
                <span className="ml-auto text-xs text-muted-foreground float-right">May 12, 2024</span>
                <h3 className="mt-2 font-semibold text-foreground">
                  Mental Health Support Gaps in Belgian Integration Centers
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  New data reveals the urgent need for psychological services in urban reception facilities.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Belgium</span>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Mental Health</span>
                </div>
                <a href="#" className="mt-4 block text-sm font-medium text-primary hover:underline">
                  Read Full Report
                </a>
              </div>
            </div>
          </div>

          {/* More articles grid */}
          <NewsGrid />

          {/* Footer note */}
          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-sm italic text-muted-foreground">
              &quot;Reports from UNHCR, Amnesty International, Human Rights Watch and others.&quot;
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
