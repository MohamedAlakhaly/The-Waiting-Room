"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { CreditCard, ShieldCheck, Heart, Wallet } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// فورم الدفع الداخلي
function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError("")

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate/success`,
      },
    })

    if (error) {
      setError(error.message || "Payment failed")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full font-bold disabled:opacity-40"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
            />
          ) : (
            <CreditCard className="mr-2 h-5 w-5" />
          )}
          {loading ? 'Processing...' : `Pay €${amount}`}
        </Button>
      </motion.div>
    </form>
  )
}

export function DonateForm() {
  const t = useTranslations('donate')
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"amount" | "payment">("amount")

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

  const handleProceed = async () => {
    if (!isValid) return
    setLoading(true)

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      })
      const data = await res.json()

      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }

      setClientSecret(data.clientSecret)
      setStep("payment")
    } catch {
      setError("Something went wrong")
    }
    setLoading(false)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-12"
    >
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">

        <AnimatePresence mode="wait">

          {/* Step 1 — اختيار المبلغ */}
          {step === "amount" && (
            <motion.div
              key="amount"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <div className="space-y-4">
                <Label className="text-base font-medium text-foreground">
                  {t('enterAmount')}
                </Label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-muted-foreground">€</span>
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

              <div className="space-y-4">
                <Label className="text-base font-medium text-foreground">
                  Choose payment method
                </Label>

                <div className="space-y-3">
                  <motion.div whileHover={{ scale: isValid ? 1.02 : 1 }} whileTap={{ scale: isValid ? 0.98 : 1 }}>
                    <Button
                      disabled={!isValid || loading}
                      onClick={handleProceed}
                      className="w-full h-12 bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full font-bold disabled:opacity-40"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <CreditCard className="mr-2 h-5 w-5" />
                      )}
                      {loading ? '...' : t('payCard')}
                    </Button>
                  </motion.div>

                  
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2 — فورم الدفع */}
          {step === "payment" && clientSecret && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  Complete Payment — €{amount}
                </h3>
                <button
                  onClick={() => setStep("amount")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              </div>

              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'night',
                    variables: {
                      colorPrimary: '#C9F14E',
                      colorBackground: '#161616',
                      colorText: '#F5F4F4',
                      colorDanger: '#ef4444',
                      borderRadius: '12px',
                    },
                  },
                }}
              >
                <CheckoutForm amount={parseFloat(amount)} />
              </Elements>
            </motion.div>
          )}

        </AnimatePresence>

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