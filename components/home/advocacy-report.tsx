import Link from "next/link"
import { Newspaper, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const reportFeatures = [
  "Data-driven analysis of 500+ local petitions",
  "Interviews with 50 leading policy experts",
  "Actionable steps for grassroots advocacy",
]

export function AdvocacyReport() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-primary">
              <Newspaper className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Advocacy Updates
              </span>
            </div>
            
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Civic Insight Report 2024
            </h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Our latest comprehensive report highlights the critical areas where 
              Belgian policy is falling behind citizen expectations. Download the 
              research and learn about our proposed legislative frameworks.
            </p>

            {/* Features list */}
            <ul className="space-y-3">
              {reportFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/reports/civic-insight-2024">
              <Button className="w-fit bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Download Full Report (PDF)
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
                alt="Report documentation"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
