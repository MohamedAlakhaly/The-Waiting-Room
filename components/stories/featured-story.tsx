import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeaturedStory() {
  return (
    <div className="overflow-hidden rounded-xl bg-secondary text-secondary-foreground">
      {/* Image */}
      <div className="aspect-[4/3]">
        <img
          src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=300&fit=crop"
          alt="Featured story"
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-secondary-foreground/80">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Featured Story
          </span>
        </div>
        
        <h3 className="font-serif text-xl font-bold leading-tight">
          The Bridge Between Laws: A Syrian Scholar&apos;s View from Ghent
        </h3>
        
        <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/90">
          &quot;The transition from Bulgaria&apos;s temporary system to Belgium&apos;s permanent residency 
          track is fraught with administrative ghosts. We are advocating for a &apos;clearance&apos; 
          period that respects our previous years of residency...&quot;
        </p>

        <Link href="/stories/featured" className="mt-6 block">
          <Button 
            variant="outline" 
            className="w-full border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
          >
            Read Full Insight
          </Button>
        </Link>
      </div>
    </div>
  )
}
