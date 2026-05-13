import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function FeaturedNews() {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop"
          alt="Border realities report"
          className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Amnesty International
          </span>
          <span className="text-sm text-muted-foreground">May 15, 2024</span>
        </div>
        
        <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
          Border Realities: Human Rights Assessment on the Greece-Turkey Frontier
        </h2>
        
        <p className="mt-3 text-muted-foreground leading-relaxed">
          A comprehensive study examining the procedural challenges and legal protections for 
          displaced individuals at the border regions of Greece. The report highlights critical gaps 
          in immediate medical care and legal representation.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline">Greece</Badge>
          <Badge variant="outline">Legal</Badge>
        </div>

        <Link 
          href="/news/border-realities" 
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Read Full Report
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
