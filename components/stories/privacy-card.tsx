import { useTranslations } from "next-intl"
import { Shield, Lock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function PrivacyCard() {
  const t = useTranslations('stories')

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-primary">
          <Shield className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            {t('privacyTitle')}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground">
          {t('privacySafety')}
        </p>
        <div className="flex items-center gap-2 text-primary">
          <Lock className="h-4 w-4" />
          <span className="text-sm font-medium">{t('encrypted')}</span>
        </div>
      </CardContent>
    </Card>
  )
}
