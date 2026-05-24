// app/about/page.tsx
"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { FounderStory } from "@/components/about/founder-story"
import { MissionBento } from "@/components/about/mission-bento"
import { ContactForm } from "@/components/about/contact-form"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-4xl space-y-0"
        >
          <AboutHero />
          <FounderStory />
          <MissionBento />
          <ContactForm />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}