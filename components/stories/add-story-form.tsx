"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Eye, EyeOff, Send, CheckCircle, User, MapPin, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddStoryForm() {
  const t = useTranslations('addStory')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [story, setStory] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const maxWords = 500
  const wordCount = story.trim() ? story.trim().split(/\s+/).length : 0
  const progress = Math.min((wordCount / maxWords) * 100, 100)

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="rounded-2xl border border-primary/30 bg-card p-12 flex flex-col items-center gap-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="h-16 w-16 text-primary" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-serif text-2xl font-bold text-foreground"
        >
          {t('successTitle')}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground max-w-sm"
        >
          {t('successMessage')}
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >

      {/* Anonymous toggle — clickable card */}
      <motion.div variants={item} className="p-6 border-b border-border">
        <motion.button
          type="button"
          onClick={() => setIsAnonymous(!isAnonymous)}
          animate={{
            backgroundColor: isAnonymous
              ? "rgba(201, 241, 78, 0.05)"
              : "rgba(0, 0, 0, 0)",
            borderColor: isAnonymous
              ? "rgba(201, 241, 78, 0.3)"
              : "rgba(255,255,255,0.1)",
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.3 }}
          className="w-full flex items-center justify-between rounded-xl border p-4 text-left"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isAnonymous ? 0 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {isAnonymous ? (
                  <motion.div
                    key="eyeoff"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EyeOff className="h-5 w-5 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="eye"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div>
              <p className={`font-medium transition-colors ${isAnonymous ? "text-primary" : "text-foreground"}`}>
                {isAnonymous ? t('postAnonymously') : t('postWithName')}
              </p>
              <p className="text-sm text-muted-foreground">
                {isAnonymous ? t('hideIdentity') : t('visiblePublicly')}
              </p>
            </div>
          </div>

          {/* Visual indicator */}
          <div className={`h-5 w-10 rounded-full transition-all duration-300 flex items-center px-0.5 ${isAnonymous ? "bg-primary justify-end" : "bg-muted justify-start"}`}>
            <motion.div
              layout
              className="h-4 w-4 rounded-full bg-white shadow"
            />
          </div>
        </motion.button>
      </motion.div>

      <div className="p-6 space-y-5">

        {/* Identity fields — hidden when anonymous */}
        <AnimatePresence>
          {!isAnonymous && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" as const }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 sm:grid-cols-2 pb-2"
              >
                {/* Full name */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    {t('fullName')}
                  </Label>
                  <Input
                    placeholder={t('namePlaceholder')}
                    className="bg-background border-border focus:border-primary h-11"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    {t('cityBelgium')}
                  </Label>
                  <Input
                    placeholder={t('cityPlaceholder')}
                    className="bg-background border-border focus:border-primary h-11"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dropdowns */}
        <motion.div variants={item} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              {t('previousCountry')}
            </Label>
            <Select>
              <SelectTrigger className="bg-background border-border focus:border-primary h-11">
                <SelectValue placeholder={t('selectOrigin')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="greece">{t('greece')}</SelectItem>
                <SelectItem value="bulgaria">{t('bulgaria')}</SelectItem>
                <SelectItem value="other">{t('other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              {t('yearsInBelgium')}
            </Label>
            <Select>
              <SelectTrigger className="bg-background border-border focus:border-primary h-11">
                <SelectValue placeholder={t('selectDuration')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t('lessThan1Year')}</SelectItem>
                <SelectItem value="1-2">{t('year1to2')}</SelectItem>
                <SelectItem value="2-3">{t('year2to3')}</SelectItem>
                <SelectItem value="3-4">{t('year3to4')}</SelectItem>
                <SelectItem value="4-5">{t('year4to5')}</SelectItem>
                <SelectItem value="5+">{t('year5plus')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Textarea */}
        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">
              {t('yourStory')}
            </Label>
            <span className={`text-xs font-medium tabular-nums ${wordCount >= maxWords ? "text-destructive" : "text-muted-foreground"}`}>
              {wordCount} / {maxWords} {t('words')}
            </span>
          </div>

          <Textarea
            placeholder={t('placeholder')}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="min-h-[200px] resize-none bg-background border-border focus:border-primary transition-colors"
          />

          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${wordCount >= maxWords ? "bg-destructive" : "bg-primary"}`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Guidelines */}
        <motion.div variants={item} className="flex items-start gap-3">
          <Checkbox
            id="guidelines"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v as boolean)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
          />
          <Label htmlFor="guidelines" className="text-sm leading-relaxed text-muted-foreground cursor-pointer">
            {t('agreeGuidelines')}{" "}
            <a href="/community-guidelines" className="font-medium text-primary hover:underline">
              {t('communityGuidelines')}
            </a>
          </Label>
        </motion.div>

        {/* Submit */}
        <motion.div variants={item} className="flex justify-end">
          <motion.div
            whileHover={{ scale: agreed && wordCount > 0 ? 1.03 : 1 }}
            whileTap={{ scale: agreed && wordCount > 0 ? 0.97 : 1 }}
          >
            <Button
              disabled={!agreed || wordCount === 0}
              onClick={() => setSubmitted(true)}
              className="bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full px-6 disabled:opacity-40"
            >
              {t('submit')}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  )
}