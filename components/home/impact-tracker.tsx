"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ImpactTracker() {
  const t = useTranslations('impact')
  const currentCount = 1248
  const goalCount = 2000
  const progress = (currentCount / goalCount) * 100

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-2xl bg-secondary p-8 text-secondary-foreground sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Content */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('label')}
              </span>

              <div className="flex items-baseline gap-4">
                <span className="font-serif text-5xl font-bold text-primary sm:text-6xl lg:text-7xl">
                  {currentCount.toLocaleString()}
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-medium">{t('people')}</span>
                  <span className="text-lg font-medium">{t('belgium')}</span>
                  <span className="text-lg font-medium">{t('seeking')}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="max-w-md">
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('goal', { count: goalCount.toLocaleString() })}
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link href="/petitions/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t('startCampaign')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
