// components/stories/featured-story.tsx
"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function FeaturedStory() {
  const t = useTranslations('storiesPage')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-2xl bg-secondary text-secondary-foreground h-full flex flex-col"
    >
      {/* Avatar header بدل الصورة */}
      <div className="bg-[#161616] px-6 pt-8 pb-6 flex flex-col items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="h-20 w-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
        >
          <User className="h-10 w-10 text-primary" />
        </motion.div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Anonymous</p>
          <p className="text-xs text-muted-foreground">Bulgaria → Belgium · 3 years</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3 flex items-center gap-2 text-primary"
        >
          <Star className="h-4 w-4 fill-current" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            {t('featuredLabel')}
          </span>
        </motion.div>

        <h3 className="font-serif text-xl font-bold leading-tight text-foreground">
          {t('featuredTitle')}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">
          &quot;{t('featuredQuote')}&quot;
        </p>

        <Link href="/stories/featured" className="mt-6 block">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" className="w-full">
              {t('readInsight')}
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}