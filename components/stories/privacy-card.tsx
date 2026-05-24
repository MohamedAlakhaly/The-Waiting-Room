// components/stories/privacy-card.tsx
"use client"

import { useTranslations } from "next-intl"
import { Shield, Lock } from "lucide-react"
import { motion } from "framer-motion"

export function PrivacyCard() {
  const t = useTranslations('addStoryPage')

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-primary/20 bg-primary/5 p-6"
    >
      <div className="flex items-center gap-2 text-primary mb-3">
        <Shield className="h-5 w-5" />
        <span className="text-xs font-semibold uppercase tracking-widest">
          {t('privacyTitle')}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foreground">
        {t('privacyDescription')}
      </p>
      <div className="mt-4 flex items-center gap-2 text-primary">
        <Lock className="h-4 w-4" />
        <span className="text-xs font-medium">{t('encrypted')}</span>
      </div>
    </motion.div>
  )
}