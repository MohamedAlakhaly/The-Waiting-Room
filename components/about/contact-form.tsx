"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  const t = useTranslations('about')

  return (
    <section className="mt-12">
      <Card>
        <CardHeader className="text-center">
          <p className="text-sm text-muted-foreground">{t('collaborate')}</p>
          <CardTitle className="text-lg">
            {t('contactSubtitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('fullName')}</Label>
                <Input id="fullName" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('emailAddress')}</Label>
                <Input id="email" type="email" placeholder="jane@advocacy.org" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t('message')}</Label>
              <Textarea
                id="message"
                placeholder={t('messagePlaceholder')}
                className="min-h-30 resize-none"
              />
            </div>
            <div className="flex justify-center">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                {t('sendMessage')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
