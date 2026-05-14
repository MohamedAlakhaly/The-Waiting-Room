import { useTranslations } from "next-intl"
import { Shield, Heart, Eye, LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DonateFeatures() {
  const t = useTranslations('donate')

  const features: { icon: LucideIcon; title: string; description: string }[] = [
    {
      icon: Shield,
      title: t('securePayment'),
      description: t('secureDesc'),
    },
    {
      icon: Heart,
      title: t('directImpact'),
      description: t('directDesc'),
    },
    {
      icon: Eye,
      title: t('openReports'),
      description: t('openDesc'),
    },
  ]

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
