import { useTranslations } from "next-intl"

export function NewsHeader() {
  const t = useTranslations('news')

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        {t('description')}
      </p>
    </div>
  )
}
