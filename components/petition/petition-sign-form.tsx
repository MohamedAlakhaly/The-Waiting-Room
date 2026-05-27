"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { TrendingUp, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signPetition, hasUserSigned, getSignaturesCount } from "@/lib/petition"

export function PetitionSignForm() {
  const t = useTranslations('petition')

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [signed, setSigned] = useState(false)
  const [alreadySigned, setAlreadySigned] = useState(false)
  const [signaturesCount, setSignaturesCount] = useState(0)
  const [loadingData, setLoadingData] = useState(true)

  const goalSignatures = 10000

  useEffect(() => {
    const loadData = async () => {
      const [count, hasSigned] = await Promise.all([
        getSignaturesCount(),
        hasUserSigned(),
      ])
      setSignaturesCount(count)
      setAlreadySigned(hasSigned)
      if (hasSigned) setSigned(true)
      setLoadingData(false)
    }
    loadData()
  }, [])

  const progress = (signaturesCount / goalSignatures) * 100

  const handleSign = async () => {
    if (!email) { setError('Email is required'); return }
    setLoading(true)
    setError("")

    const { error } = await signPetition({ displayName: name, email, isAnonymous })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSignaturesCount(prev => prev + 1)
      setSigned(true)
    }
  }

  // شاشة النجاح أو "وقّعت مسبقاً"
  if (signed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="rounded-2xl border border-primary/30 bg-card p-10 flex flex-col items-center gap-4 text-center"
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
          className="font-serif text-xl font-bold text-foreground"
        >
          {alreadySigned && !loading ? "Already Signed!" : t('successTitle')}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground"
        >
          {alreadySigned && !loading
            ? "You have already signed this petition. Thank you for your support!"
            : t('successMessage')
          }
        </motion.p>

        {/* العداد */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-center"
        >
          <p className="font-serif text-3xl font-bold text-primary">
            {signaturesCount.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t('signaturesOf')} {goalSignatures.toLocaleString()} {t('goal')}
          </p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Counter */}
      <div className="p-6 border-b border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex items-baseline justify-between mb-3"
        >
          <span className="font-serif text-4xl font-bold text-primary">
            {loadingData ? '...' : signaturesCount.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">
            {t('signaturesOf')} {goalSignatures.toLocaleString()} {t('goal')}
          </span>
        </motion.div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span>
            <strong>{t('nextMilestone')}</strong> {goalSignatures.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        <h3 className="font-medium text-foreground">{t('sign')}</h3>

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-foreground">{t('yourName')}</Label>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t('namePlaceholder')}
            disabled={isAnonymous}
            className="bg-background border-border focus:border-primary h-11 disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">{t('privateEmail')}</Label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="bg-background border-border focus:border-primary h-11"
          />
          <p className="text-xs text-muted-foreground">{t('emailNote')}</p>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="display"
            checked={isAnonymous}
            onCheckedChange={(v) => setIsAnonymous(v as boolean)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
          />
          <Label htmlFor="display" className="text-sm text-muted-foreground cursor-pointer">
            {t('displayName')}
          </Label>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full font-bold disabled:opacity-40"
            onClick={handleSign}
            disabled={loading || !email}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
              />
            ) : null}
            {loading ? '...' : t('signButton')}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
} 