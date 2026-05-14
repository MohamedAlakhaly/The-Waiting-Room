"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function PetitionSignForm() {
  const t = useTranslations('petition')
  const [displayName, setDisplayName] = useState(false)
  const currentSignatures = 8432
  const goalSignatures = 10000
  const progress = (currentSignatures / goalSignatures) * 100

  return (
    <Card>
      <CardHeader className="pb-4">
        {/* Counter */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-4xl font-bold text-foreground">
              {currentSignatures.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              {t('signaturesOf')} {goalSignatures.toLocaleString()} {t('goal')}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span><strong>{t('nextMilestone')}</strong> {goalSignatures.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <h3 className="font-medium text-foreground">{t('sign')}</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">{t('yourName')}</Label>
            <Input
              id="name"
              placeholder="Full name or 'Anonymous'"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('privateEmail')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
            />
            <p className="text-xs text-muted-foreground">
              {t('emailNote')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="display"
            checked={displayName}
            onCheckedChange={(checked) => setDisplayName(checked as boolean)}
          />
          <Label htmlFor="display" className="text-sm text-muted-foreground">
            {t('displayName')}
          </Label>
        </div>

        <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
          {t('signButton')}
        </Button>
      </CardContent>
    </Card>
  )
}
