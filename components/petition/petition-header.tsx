// components/petition/petition-header.tsx
"use client"

import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export function PetitionHeader() {
  const t = useTranslations('petition')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse mr-2" />
          {t('active')}
        </Badge>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-serif text-2xl font-bold text-foreground sm:text-3xl"
      >
        {t('title')}
      </motion.h1>

      {/* Banner بدل الصورة */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 overflow-hidden rounded-2xl bg-secondary border border-border"
      >
        <div className="px-8 py-12 flex flex-col items-center justify-center text-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
          >
            <FileText className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg font-medium text-foreground max-w-md"
          >
            {t('addressee')}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}