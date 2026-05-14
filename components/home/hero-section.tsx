import Link from "next/link"
import { FileText, MessageSquarePlus, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              For migrants in Belgium with Greek or Bulgarian protection
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-balance">
                Stuck in the gap between two countries.{" "}
                <span className="text-primary">You are not alone.</span>
              </span>
            </h1>

            <p className="text-lg leading-relaxed text-muted-foreground">
              If you hold protection status from Greece or Bulgaria and are living in
              Belgium without the right to stay — this platform exists for you.
              Share your story, join the petition to CGVS, and help make the
              invisible visible.
            </p>

            {/* CTAs — primary / ghost / outline hierarchy */}
            <div className="flex flex-wrap gap-3">
              <Link href="/petitions">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Sign the CGVS Petition
                </Button>
              </Link>
              <Link href="/stories/new">
                <Button variant="ghost">
                  <MessageSquarePlus className="mr-2 h-4 w-4" />
                  Share Your Story
                </Button>
              </Link>
              <Link href="/donate">
                <Button variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Support This Work
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop"
                alt="People standing together in solidarity"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card p-4 shadow-xl hidden sm:block">
              <p className="text-2xl font-bold text-primary">1,248+</p>
              <p className="text-xs text-muted-foreground mt-0.5">people affected in Belgium</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
