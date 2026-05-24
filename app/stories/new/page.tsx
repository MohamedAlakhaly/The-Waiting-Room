// app/stories/new/page.tsx
"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AddStoryForm } from "@/components/stories/add-story-form"
import { PrivacyCard } from "@/components/stories/privacy-card"
import { WordsOfImpact } from "@/components/stories/words-of-impact"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export default function AddStoryPage() {
  const t = useTranslations('addStoryPage')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {t('description')}
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Sidebar — on mobile goes below form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 lg:col-span-1 order-2 lg:order-1"
            >
              <PrivacyCard />
              <WordsOfImpact />
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 order-1 lg:order-2"
            >
              <AddStoryForm />
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}