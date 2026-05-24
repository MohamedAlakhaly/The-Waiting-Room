// components/stories/stories-header.tsx
"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function StoriesHeader() {
  const t = useTranslations('storiesPage')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {t('description')}
        </p>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
        <Link href="/stories/new">
          <Button>
            <PenLine className="mr-2 h-4 w-4" />
            {t('shareStory')}
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}