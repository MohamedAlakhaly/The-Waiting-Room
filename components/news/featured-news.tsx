// components/news/featured-news.tsx
"use client"

import { useTranslations } from "next-intl"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export function FeaturedNews() {
  const t = useTranslations('news')

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="group h-full flex flex-col"
    >
      {/* Banner بدل الصورة */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-2xl bg-secondary border border-border"
      >
        <div className="px-8 py-14 flex flex-col items-center justify-center text-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t('featuredOrg')}
          </span>
          <div className="h-px w-16 bg-primary/30" />
          <p className="text-sm text-muted-foreground">{t('featuredDate')}</p>
        </div>
      </motion.div>

      <div className="mt-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t('featuredOrg')}
          </span>
          <span className="text-sm text-muted-foreground">{t('featuredDate')}</span>
        </div>

        <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl leading-tight">
          {t('featuredTitle')}
        </h2>

        <p className="text-muted-foreground leading-relaxed flex-1">
          {t('featuredDesc')}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{t('filterGreece')}</Badge>
          <Badge variant="outline">{t('filterLegal')}</Badge>
        </div>

        <motion.a
          href="https://www.amnesty.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {t('readReport')}
          <ExternalLink className="h-4 w-4" />
        </motion.a>
      </div>
    </motion.article>
  )
}