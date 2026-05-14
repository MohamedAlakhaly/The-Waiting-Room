"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { EyeOff, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AddStoryForm() {
  const t = useTranslations('stories')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [story, setStory] = useState("")
  const maxWords = 500

  const wordCount = story.trim() ? story.trim().split(/\s+/).length : 0

  return (
    <Card>
      <CardHeader>
        {/* Anonymous toggle */}
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <EyeOff className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{t('postAnonymously')}</p>
              <p className="text-sm text-muted-foreground">
                {t('hideIdentity')}
              </p>
            </div>
          </div>
          <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Dropdowns */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="country">{t('previousCountry')}</Label>
            <Select>
              <SelectTrigger id="country">
                <SelectValue placeholder={t('selectOrigin')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="greece">{t('filterGreece')}</SelectItem>
                <SelectItem value="bulgaria">{t('filterBulgaria')}</SelectItem>
                <SelectItem value="other">{t('other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">{t('yearsInBelgium')}</Label>
            <Select>
              <SelectTrigger id="years">
                <SelectValue placeholder={t('selectDuration')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t('lessThan1Year')}</SelectItem>
                <SelectItem value="1-2">{t('year1to2')}</SelectItem>
                <SelectItem value="2-3">{t('year2to3')}</SelectItem>
                <SelectItem value="3-4">{t('year3to4')}</SelectItem>
                <SelectItem value="4-5">{t('year4to5')}</SelectItem>
                <SelectItem value="5+">{t('year5plus')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Story textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="story">{t('yourStory')}</Label>
            <span className="text-sm text-muted-foreground">
              {wordCount} / {maxWords} {t('words')}
            </span>
          </div>
          <Textarea
            id="story"
            placeholder={t('storyPlaceholder')}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="min-h-[200px] resize-none"
          />
        </div>

        {/* Guidelines checkbox */}
        <div className="flex items-start gap-3">
          <Checkbox id="guidelines" />
          <Label htmlFor="guidelines" className="text-sm leading-relaxed text-muted-foreground">
            {t('agreeGuidelines')}{" "}
            <a href="/community-guidelines" className="font-medium text-foreground underline">
              {t('communityGuidelines')}
            </a>
          </Label>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            {t('submitStory')}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
