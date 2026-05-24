// components/about/contact-form.tsx
"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Send } from "lucide-react"

export function ContactForm() {
  const t = useTranslations('about')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="mt-16 rounded-2xl border border-primary/30 bg-card p-12 flex flex-col items-center gap-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="h-14 w-14 text-primary" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-2xl font-bold text-foreground"
        >
          {t('messageSent')}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground"
        >
          {t('messageSentNote')}
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-6 border-b border-border text-center">
          <p className="text-sm text-muted-foreground">{t('collaborate')}</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-foreground">
            {t('contactSubtitle')}
          </h2>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label className="text-foreground">{t('fullName')}</Label>
              <Input
                placeholder="Jane Doe"
                className="bg-background border-border focus:border-primary h-11"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-2"
            >
              <Label className="text-foreground">{t('emailAddress')}</Label>
              <Input
                type="email"
                placeholder="jane@example.com"
                className="bg-background border-border focus:border-primary h-11"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <Label className="text-foreground">{t('message')}</Label>
            <Textarea
              placeholder={t('messagePlaceholder')}
              className="min-h-32 resize-none bg-background border-border focus:border-primary"
            />
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={() => setSent(true)}
                className="bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full px-8 h-12 font-bold"
              >
                {t('sendMessage')}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}