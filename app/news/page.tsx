"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { NewsHeader } from "@/components/news/news-header"
import { NewsFilter } from "@/components/news/news-filter"
import { FeaturedNews } from "@/components/news/featured-news"
import { NewsGrid } from "@/components/news/news-grid"
import { WhyTheyLeft } from "@/components/home/why-they-left"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export default function NewsPage() {
  const t = useTranslations('news')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Section 1 — Why They Left */}
          <WhyTheyLeft />

          {/* Divider */}
          <div className="my-12 h-px bg-border" />

          {/* Section 2 — Reports */}
          <NewsHeader />
          <NewsFilter />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 grid gap-6 lg:grid-cols-3"
          >
            <div className="lg:col-span-2">
              <FeaturedNews />
            </div>
            <div className="lg:col-span-1">
              <SideArticle />
            </div>
          </motion.div>

          <NewsGrid />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 border-t border-border pt-8 text-center"
          >
            <p className="text-sm italic text-muted-foreground">
              "{t('footerNote')}"
            </p>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

function SideArticle() {
  const t = useTranslations('news')

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "rgba(201,241,78,0.3)" }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-border bg-card p-5 h-full flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {t('sideOrg')}
        </span>
        <span className="text-xs text-muted-foreground">{t('sideDate')}</span>
      </div>
      <h3 className="font-semibold text-foreground leading-snug">
        {t('sideTitle')}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {t('sideDesc')}
      </p>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground border border-border">
          {t('filterBelgium')}
        </span>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground border border-border">
          {t('filterMentalHealth')}
        </span>
      </div>
        <a
        href="https://www.unhcr.org"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary hover:underline"
      >
        {t('readReport')}
      </a>
    </motion.div>
  )
}