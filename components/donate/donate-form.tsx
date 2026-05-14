"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { CreditCard, Wallet, ShieldCheck, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function DonateForm() {
  const t = useTranslations('donate')
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    const val = parseFloat(e.target.value)
    if (e.target.value && (isNaN(val) || val < 1)) {
      setError(t('minError'))
    } else {
      setError("")
    }
  }

  const isValid = amount !== "" && !error && parseFloat(amount) >= 1

  return (
    <section className="mt-12">
      <Card>
        <CardContent className="p-6 sm:p-8">
          {/* Amount input */}
          <div className="space-y-3 mb-8">
            <Label className="text-base font-medium">{t('enterAmount')}</Label>

            <div className="relative max-w-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-muted-foreground">
                €
              </span>
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder={t('placeholder')}
                className="pl-8 text-2xl font-semibold h-14"
                min="1"
                step="1"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-secondary shrink-0" />
              {t('everyEuro')}
            </p>
          </div>

          {/* Payment buttons */}
          <div className="space-y-3 max-w-xs">
            <Button
              disabled={!isValid}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Wallet className="mr-2 h-5 w-5" />
              {t('payPal')}
            </Button>

            <Button
              disabled={!isValid}
              variant="outline"
              className="w-full h-12"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              {t('payCard')}
            </Button>
          </div>

          {/* Transparency note */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4">
            <ShieldCheck className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-foreground text-sm">{t('transparencyTitle')}</p>
              <p className="text-sm text-muted-foreground">
                {t('transparencyNote')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
