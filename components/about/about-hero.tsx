import { useTranslations } from "next-intl"

export function AboutHero() {
  const t = useTranslations('about')

  return (
    <section className="text-center">
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">
        {t('purpose')}
      </span>
      <h1 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">
        <span className="text-balance">{t('heroTitle')}</span>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        {t('heroDescription')}
      </p>
    </section>
  )
}
