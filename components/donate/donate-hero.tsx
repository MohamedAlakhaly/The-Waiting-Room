// components/donate/donate-hero.tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function DonateHero() {
  const t = useTranslations('donate')

  return (
    <section className="grid items-center gap-8 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-semibold uppercase tracking-wider text-primary"
        >
          {t('badge')}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl"
        >
          {t('heroTitle')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-lg leading-relaxed text-muted-foreground"
        >
          {t('heroDescription')}
        </motion.p>
      </motion.div>

      {/* Visual بدل الصورة */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="overflow-hidden rounded-2xl bg-secondary border border-border"
      >
        <div className="px-8 py-16 flex flex-col items-center justify-center text-center gap-6">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="h-20 w-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
          >
            <Heart className="h-10 w-10 text-primary fill-primary/20" />
          </motion.div>
          <div className="space-y-2">
            <p className="font-serif text-5xl font-bold text-primary">€1+</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('everyEuro')}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}