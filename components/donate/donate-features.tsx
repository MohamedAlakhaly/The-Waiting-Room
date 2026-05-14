import { Shield, Heart, Eye } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Industry standard encryption protecting your financial data.",
  },
  {
    icon: Heart,
    title: "Direct Impact",
    description: "Every Euro supports the tools that empower citizens' voices.",
  },
  {
    icon: Eye,
    title: "Open Reports",
    description: "Monthly summaries of how funds are used to maintain the site.",
  },
]

export function DonateFeatures() {
  return (
    <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <Card key={feature.title} className="bg-card">
            <CardHeader className="pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
