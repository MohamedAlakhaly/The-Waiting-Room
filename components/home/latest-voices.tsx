import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const stories = [
  {
    id: 1,
    title: '"The struggle for a stable home in Ghent"',
    excerpt: "How the local housing crisis shifted my perspective on civic engagement and what we can do to change the policy...",
    category: "Housing Rights",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Navigating the digital divide in local services",
    excerpt: "For the elderly in our community, the shift to 100% digital service centers has created a barrier that we must...",
    category: "Public Services",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Reclaiming green spaces in our neighborhood",
    excerpt: "The story of how three neighbors turned a vacant lot into a community garden and changed local zoning law...",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
  },
]

export function LatestVoices() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Latest Voices
            </h2>
            <p className="mt-2 text-muted-foreground">
              Real stories from individuals in our community.
            </p>
          </div>
          <Link 
            href="/stories" 
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 sm:flex"
          >
            View all stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden bg-card">
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
                  {story.category}
                </Badge>
              </CardHeader>
              <CardContent className="pb-2">
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {story.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <Link 
                  href={`/stories/${story.id}`}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Read Full Story
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-6 text-center sm:hidden">
          <Link 
            href="/stories" 
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            View all stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
