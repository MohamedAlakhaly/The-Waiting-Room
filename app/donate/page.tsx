// app/donate/page.tsx
"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DonateHero } from "@/components/donate/donate-hero"
import { DonateForm } from "@/components/donate/donate-form"
import { DonateFeatures } from "@/components/donate/donate-features"
import { motion } from "framer-motion"

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-7xl"
        >
          <DonateHero />
          <DonateForm />
          <DonateFeatures />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}