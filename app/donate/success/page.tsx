// app/donate/success/page.tsx
"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, Home, Share2, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Suspense } from "react"

function SuccessContent() {
  const t = useTranslations('donateSuccess')
  const searchParams = useSearchParams()

  // Stripe يرجع payment_intent في الـ URL
  const paymentIntent = searchParams.get('payment_intent')

  const shareUrl = "https://v0-the-waiting-room.vercel.app"
  const shareText = "I just supported The Waiting Room — a platform for migrants and refugees in Belgium. Join me!"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* Success card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="rounded-2xl border border-primary/30 bg-card p-10 flex flex-col items-center gap-6 text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="h-24 w-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                <Heart className="h-12 w-12 text-primary fill-primary/30" />
              </div>
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-primary/30"
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <h1 className="font-serif text-3xl font-bold text-foreground">
                {t('title')}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {t('message')}
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full h-px bg-border"
            />

            {/* Share section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full space-y-3"
            >
              <p className="text-sm font-medium text-foreground">{t('shareTitle')}</p>
              <p className="text-xs text-muted-foreground">{t('shareMessage')}</p>

              <div className="flex gap-2 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] border border-[#1DA1F2]/20 text-sm font-medium hover:bg-[#1DA1F2]/20 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  WhatsApp
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20 text-sm font-medium hover:bg-[#1877F2]/20 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </motion.a>
              </div>
            </motion.div>

            {/* Back home */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full"
            >
              <Link href="/">
                <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full font-bold">
                  <Home className="mr-2 h-4 w-4" />
                  {t('backHome')}
                </Button>
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function DonateSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}