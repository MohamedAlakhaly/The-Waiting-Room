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
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-balance">Every voice is a seed of change in our community.</span>
            </h1>
            
            <p className="text-lg leading-relaxed text-muted-foreground">
              This platform is a personal initiative dedicated to amplifying the unheard 
              concerns of citizens. Together, we can transform shared grievances into 
              collective action and local policy impact.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/petitions">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <FileText className="mr-2 h-4 w-4" />
                  Sign Petition
                </Button>
              </Link>
              <Link href="/stories/new">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <MessageSquarePlus className="mr-2 h-4 w-4" />
                  Share Story
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
            <div className="overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop"
                alt="Community gathering"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
