// components/petition/share-petition.tsx
"use client"

import { useTranslations } from "next-intl"
import { Share2, Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

export function SharePetition() {
  const t = useTranslations('petition')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl border border-border bg-muted/30 p-5"
    >
      <p className="text-sm text-muted-foreground mb-4">{t('shareTitle')}</p>
      <div className="flex flex-wrap gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Button
            className="bg-[#25D366] text-white hover:bg-[#25D366]/90 rounded-full"
            onClick={() => window.open(`https://wa.me/?text=${window.location.href}`)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Button
            className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 rounded-full"
            onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleCopy}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-primary">Copied!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {t('copyLink')}
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}