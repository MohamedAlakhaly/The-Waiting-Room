"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Eye, EyeOff, Send, CheckCircle, User, MapPin, Calendar, PenLine } from "lucide-react"
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
import { addStory, getUserStory, updateStory } from '@/lib/stories'


export function AddStoryForm() {



  const t = useTranslations('addStory')

  const [isAnonymous, setIsAnonymous] = useState(false)
  const [story, setStory] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [years, setYears] = useState("")

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  // هل المستخدم عنده قصة موجودة
  const [existingStory, setExistingStory] = useState<any>(null)
  const [loadingExisting, setLoadingExisting] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const maxWords = 500
  const wordCount = story.trim() ? story.trim().split(/\s+/).length : 0
  const progress = Math.min((wordCount / maxWords) * 100, 100)

  // تحقق إذا المستخدم عنده قصة عند فتح الصفحة
  useEffect(() => {
    const checkExistingStory = async () => {
      const { data } = await getUserStory()
      if (data) {
        setExistingStory(data)
        // ملء الفورم ببيانات القصة الموجودة
        setStory(data.content || "")
        setIsAnonymous(data.is_anonymous || false)
        setDisplayName(data.display_name || "")
        setCountry(data.previous_country || "")
        setYears(data.years_in_belgium || "")
        setAgreed(true)
      }
      setLoadingExisting(false)
    }
    checkExistingStory()
  }, [])

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const handleSubmit = async () => {
    if (!agreed || wordCount === 0) return
    setLoading(true)
    setError("")

    let result

    if (existingStory && isEditing) {
      // تعديل القصة الموجودة
      result = await updateStory({
        id: existingStory.id,
        content: story,
        previousCountry: country,
        yearsInBelgium: years,
        isAnonymous,
        displayName: isAnonymous ? undefined : displayName || undefined,
      })
    } else if (!existingStory) {
      // إضافة قصة جديدة
      result = await addStory({
        content: story,
        previousCountry: country,
        yearsInBelgium: years,
        isAnonymous,
        displayName: isAnonymous ? undefined : displayName || undefined,
      })
    }

    if (result?.error) {
      setError(result.error.message)
      setLoading(false)
    } else {
      setSubmitted(true)
      setIsEditing(false)
    }
  }

  // شاشة التحميل
  if (loadingExisting) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  // شاشة النجاح
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

  // شاشة "عندك قصة موجودة" — إذا ما يريد يعدل
  if (existingStory && !isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card p-8 flex flex-col gap-6"
      >
        {/* Badge حالة القصة */}
        <div className="flex items-center gap-2">
          {existingStory.is_approved ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <CheckCircle className="h-3.5 w-3.5" />
              Published
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Under Review
            </span>
          )}
        </div>

        {/* القصة */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Your Story</h3>
          <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 rounded-xl p-4 border border-border">
            {existingStory.content}
          </p>
        </div>

        {/* معلومات إضافية */}
        <div className="flex flex-wrap gap-3">
          {existingStory.previous_country && (
            <span className="text-xs bg-muted px-3 py-1 rounded-full border border-border text-muted-foreground">
              {existingStory.previous_country} → BE
            </span>
          )}
          {existingStory.years_in_belgium && (
            <span className="text-xs bg-muted px-3 py-1 rounded-full border border-border text-muted-foreground">
              {existingStory.years_in_belgium} years
            </span>
          )}
          {existingStory.is_anonymous && (
            <span className="text-xs bg-muted px-3 py-1 rounded-full border border-border text-muted-foreground">
              Anonymous
            </span>
          )}
        </div>

        {/* زر التعديل */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full font-bold"
          >
            <PenLine className="mr-2 h-4 w-4" />
            Edit My Story
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  // فورم الإضافة أو التعديل
  return (
    <motion.div
      key={isEditing ? "editing" : "new"}
      variants={container}
      initial="hidden"
      animate="show"
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* إذا كان تعديل — أظهر header */}
      {isEditing && (
        <div className="px-6 pt-4 pb-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <PenLine className="h-4 w-4 text-primary" />
            <span>Editing your story</span>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Anonymous toggle */}
      <motion.div variants={item} className="p-6 border-b border-border">
        <motion.button
          type="button"
          onClick={() => setIsAnonymous(!isAnonymous)}
          animate={{
            backgroundColor: isAnonymous ? "rgba(201, 241, 78, 0.05)" : "rgba(0, 0, 0, 0)",
            borderColor: isAnonymous ? "rgba(201, 241, 78, 0.3)" : "rgba(255,255,255,0.1)",
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.3 }}
          className="w-full flex items-center justify-between rounded-xl border p-4 text-left"
        >
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {isAnonymous ? (
                <motion.div key="eyeoff" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
                  <EyeOff className="h-5 w-5 text-primary" />
                </motion.div>
              ) : (
                <motion.div key="eye" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
                  <Eye className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <p className={`font-medium transition-colors ${isAnonymous ? "text-primary" : "text-foreground"}`}>
                {isAnonymous ? t('postAnonymously') : t('postWithName')}
              </p>
              <p className="text-sm text-muted-foreground">
                {isAnonymous ? t('hideIdentity') : t('visiblePublicly')}
              </p>
            </div>
          </div>
          <div className={`h-5 w-10 rounded-full transition-all duration-300 flex items-center px-0.5 ${isAnonymous ? "bg-primary justify-end" : "bg-muted justify-start"}`}>
            <motion.div layout className="h-4 w-4 rounded-full bg-white shadow" />
          </div>
        </motion.button>
      </motion.div>

      <div className="p-6 space-y-5">

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3"
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
  {!isAnonymous && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" as const }}
      className="overflow-hidden"
    >
      <div className="grid gap-4 sm:grid-cols-2 pb-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            {t('fullName')}
          </Label>
          <Input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder={t('namePlaceholder')}
            className="bg-background border-border focus:border-primary h-11"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            {t('cityBelgium')}
          </Label>
          <Input
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder={t('cityPlaceholder')}
            className="bg-background border-border focus:border-primary h-11"
          />
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
        <motion.div variants={item} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              {t('previousCountry')}
            </Label>
            <Select onValueChange={setCountry} value={country}>
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
            <Select onValueChange={setYears} value={years}>
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

        <motion.div variants={item} className="flex justify-end">
          <motion.div
            whileHover={{ scale: agreed && wordCount > 0 ? 1.03 : 1 }}
            whileTap={{ scale: agreed && wordCount > 0 ? 0.97 : 1 }}
          >
            <Button
              disabled={!agreed || wordCount === 0 || loading}
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full px-6 disabled:opacity-40"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Send className="ml-2 h-4 w-4" />
              )}
              {loading ? '...' : isEditing ? 'Update Story' : t('submit')}
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  )
}