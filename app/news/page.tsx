"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhyTheyLeft } from "@/components/home/why-they-left"
import { motion } from "framer-motion"

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <WhyTheyLeft />
        </div>
      </main>
      <Footer />
    </div>
  )
}