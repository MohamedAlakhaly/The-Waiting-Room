"use client"

import { useState } from "react"
import { CreditCard, Wallet, ShieldCheck, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function DonateForm() {
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    const val = parseFloat(e.target.value)
    if (e.target.value && (isNaN(val) || val < 1)) {
      setError("Minimum donation is €1")
    } else {
      setError("")
    }
  }

  const isValid = amount !== "" && !error && parseFloat(amount) >= 1

  return (
    <section className="mt-12">
      <Card>
        <CardContent className="p-6 sm:p-8">
          {/* Amount input */}
          <div className="space-y-3 mb-8">
            <Label className="text-base font-medium">Enter amount in €</Label>

            <div className="relative max-w-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-muted-foreground">
                €
              </span>
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="e.g. 1, 5, 20..."
                className="pl-8 text-2xl font-semibold h-14"
                min="1"
                step="1"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-secondary shrink-0" />
              Every euro helps keep this platform running
            </p>
          </div>

          {/* Payment buttons */}
          <div className="space-y-3 max-w-xs">
            <Label className="text-base font-medium">Choose how to pay</Label>

            <Button
              disabled={!isValid}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Pay with PayPal
            </Button>

            <Button
              disabled={!isValid}
              variant="outline"
              className="w-full h-12"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Pay with Card
            </Button>
          </div>

          {/* Transparency note */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4">
            <ShieldCheck className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-foreground text-sm">Transparency</p>
              <p className="text-sm text-muted-foreground">
                100% of donations go to platform maintenance. This is an independent
                personal project — built by one person, for migrants who deserve to be heard.
                No organization. No overhead.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
