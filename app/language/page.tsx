'use client'

import { LANGUAGES, useLanguage } from '@/hooks/use-language'
import type { Locale } from '@/hooks/use-language'
import { motion } from 'framer-motion'

export default function LanguagePage() {
  const { setLanguage } = useLanguage()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <motion.h1
          className="font-serif text-3xl font-bold text-[#C9F14E] sm:text-4xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          The Waiting Room
        </motion.h1>
        <p className="mt-3 text-sm text-[#D1D5DB] leading-relaxed">
          Choose your language / Choisissez votre langue / اختر لغتك
        </p>
      </motion.div>

      {/* Language cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-sm space-y-3"
      >
        {LANGUAGES.map((lang) => (
          <motion.button
            key={lang.code}
            variants={item}
            whileHover={{
              scale: 1.02,
              borderColor: '#C9F14E',
              boxShadow: '0 0 20px rgba(201,241,78,0.15)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLanguage(lang.code as Locale)}
            className="w-full flex items-center gap-4 rounded-2xl border border-[#202020] bg-[#202020] px-6 py-5 text-left transition-colors duration-200"
          >
            <span className="text-3xl">{lang.flag}</span>
            <p className="text-lg font-semibold text-[#F5F4F4]">{lang.label}</p>
            <motion.span
              className="ml-auto text-[#C9F14E] text-xl"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.button>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-center text-xs text-[#D1D5DB]/50 max-w-xs"
      >
        You can change the language at any time from the menu
      </motion.p>

    </div>
  )
}