"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"

export function HomeCta() {
  const t = useTranslations('homeCta')

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The Waiting Room',
        text: t('shareText'),
        url: 'https://waitroom.be',
      })
    } else {
      navigator.clipboard.writeText('https://waitroom.be')
    }
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-10 sm:p-14 text-center"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(201,241,78,0.07), transparent 70%)"
            }}
          />

          {/* Corner accents */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute top-0 left-0 h-10 w-10"
          >
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
            <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-0 right-0 h-10 w-10"
          >
            <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-primary/50 to-transparent" />
            <div className="absolute bottom-0 right-0 h-px w-full bg-gradient-to-l from-primary/50 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
            >
              <Heart className="h-7 w-7 text-primary" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-serif text-2xl sm:text-3xl font-bold text-foreground"
            >
              {t('title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground leading-relaxed max-w-lg"
            >
              {t('description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              <Link href="/donate">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button className="rounded-full font-bold px-8 h-12">
                    <Heart className="mr-2 h-4 w-4" />
                    {t('donateBtn')}
                  </Button>
                </motion.div>
              </Link>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  className="rounded-full px-8 h-12 border-primary/20 text-primary hover:bg-primary/10"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {t('shareBtn')}
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-xs text-muted-foreground"
            >
              {t('note')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}