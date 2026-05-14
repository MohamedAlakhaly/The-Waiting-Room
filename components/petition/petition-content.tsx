import { useTranslations } from "next-intl"

export function PetitionContent() {
  const t = useTranslations('petition')

  return (
    <div className="space-y-6">
      {/* Addressee */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          {t('addressee')}
        </p>
      </div>

      {/* Petition text */}
      <div className="space-y-4 text-foreground leading-relaxed">
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
      </div>
    </div>
  )
}
