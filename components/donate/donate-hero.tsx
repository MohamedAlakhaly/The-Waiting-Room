import { useTranslations } from "next-intl"

export function DonateHero() {
  const t = useTranslations('donate')

  return (
    <section className="grid items-center gap-8 lg:grid-cols-2">
      {/* Content */}
      <div>
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          {t('badge')}
        </span>
        <h1 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">
          {t('heroTitle')}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {t('heroDescription')}
        </p>
      </div>

      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop"
          alt="Hands joined together"
          className="aspect-3/2 w-full object-cover"
        />
      </div>
    </section>
  )
}
