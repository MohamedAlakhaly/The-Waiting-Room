import { useTranslations } from "next-intl"

export function FounderStory() {
  const t = useTranslations('about')

  return (
    <section className="mt-12 grid items-center gap-8 lg:grid-cols-2">
      {/* Image */}
      <div className="relative">
        <div className="absolute -left-3 -top-3 h-full w-full rounded-xl bg-primary/20" />
        <div className="relative overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop"
            alt="Founder"
            className="aspect-4/5 w-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="mb-4 h-1 w-12 bg-primary" />
        <h2 className="font-serif text-2xl font-bold text-foreground">{t('founderSectionTitle')}</h2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>{t('founderP1')}</p>
          <p>{t('founderP2')}</p>
        </div>
        <p className="mt-6 font-medium text-foreground italic">
          {t('founderCredit')}
        </p>
      </div>
    </section>
  )
}
