// components/donate/donate-form.tsx
"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { CreditCard, Wallet, ShieldCheck, Heart, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DonateForm() {
  const t = useTranslations('donate')
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  const [donated, setDonated] = useState(false)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    const val = parseFloat(e.target.value)
    if (e.target.value && (isNaN(val) || val < 1)) {
      setError(t('minError'))
    } else {
      setError("")
    }
  }

  const isValid = amount !== "" && !error && parseFloat(amount) >= 1

  if (donated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="mt-12 rounded-2xl border border-primary/30 bg-card p-12 flex flex-col items-center gap-4 text-center"
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
          Thank you for your support!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground max-w-sm"
        >
          €{amount} — {t('everyEuro')}
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-12"
    >
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Amount */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-foreground">
              {t('enterAmount')}
            </Label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-muted-foreground">
                €
              </span>
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder={t('placeholder')}
                className="pl-8 text-2xl font-semibold h-14 bg-background border-border focus:border-primary"
                min="1"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm text-destructive"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-primary shrink-0" />
              {t('everyEuro')}
            </p>

            {/* Quick amounts */}
            <div className="flex flex-wrap gap-2">
              {[5, 10, 20, 50].map((preset) => (
                <motion.button
                  key={preset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setAmount(String(preset)); setError("") }}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
                    amount === String(preset)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  €{preset}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-foreground">
              Choose payment method
            </Label>

            <div className="space-y-3">
              <motion.div whileHover={{ scale: isValid ? 1.02 : 1 }} whileTap={{ scale: isValid ? 0.98 : 1 }}>
                <Button
                  disabled={!isValid}
                  onClick={() => setDonated(true)}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full font-bold disabled:opacity-40"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  {t('payPal')}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: isValid ? 1.02 : 1 }} whileTap={{ scale: isValid ? 0.98 : 1 }}>
                <Button
                  disabled={!isValid}
                  variant="outline"
                  onClick={() => setDonated(true)}
                  className="w-full h-12 rounded-full disabled:opacity-40"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  {t('payCard')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Transparency */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4"
        >
          <ShieldCheck className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-foreground text-sm">{t('transparencyTitle')}</p>
            <p className="text-sm text-muted-foreground">{t('transparencyNote')}</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}