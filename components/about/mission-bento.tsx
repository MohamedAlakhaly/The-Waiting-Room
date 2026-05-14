import { useTranslations } from "next-intl"
import { Scale, Users } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function MissionBento() {
  const t = useTranslations('about')

  return (
    <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Legal Advocacy - Large card */}
      <Card className="bg-secondary text-secondary-foreground sm:col-span-2 lg:col-span-2 lg:row-span-2">
        <CardHeader className="pb-2">
          <Scale className="h-8 w-8" />
        </CardHeader>
        <CardContent>
          <h3 className="mt-4 font-serif text-2xl font-bold">{t('legalAdvocacy')}</h3>
          <p className="mt-2 text-secondary-foreground/90 leading-relaxed">
            {t('legalDesc')}
          </p>
        </CardContent>
      </Card>

      {/* Inclusion card */}
      <Card className="bg-primary/10 border-primary/20">
        <CardHeader className="pb-2">
          <Users className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold text-primary">{t('inclusion')}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('inclusionDesc')}
          </p>
        </CardContent>
      </Card>

      {/* Impact stats card */}
      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="pt-6">
          <h3 className="font-serif text-xl font-bold text-foreground">{t('ourImpact')}</h3>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('petitionsWon')}</span>
              <span className="font-semibold text-primary">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('voicesActive')}</span>
              <span className="font-semibold text-primary">50k+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('citiesReached')}</span>
              <span className="font-semibold text-primary">28</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community card with image */}
      <Card className="relative overflow-hidden sm:col-span-2 lg:col-span-2">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=300&fit=crop"
            alt="Community gathering"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary/40" />
        </div>
        <CardContent className="relative pt-12 pb-6">
          <h3 className="font-serif text-xl font-bold text-primary-foreground">
            {t('united')}
          </h3>
        </CardContent>
      </Card>
    </section>
  )
}
