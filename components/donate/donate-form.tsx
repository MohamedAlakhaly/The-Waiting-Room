"use client"

import { useState } from "react"
import { CreditCard, Wallet, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const presetAmounts = [10, 25, 50, 100]

export function DonateForm() {
  const [amount, setAmount] = useState("25")
  const [selectedPreset, setSelectedPreset] = useState(25)

  const handlePresetClick = (value: number) => {
    setSelectedPreset(value)
    setAmount(value.toString())
  }

  return (
    <section className="mt-12">
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Amount section */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Enter any amount in € (minimum €1)
              </Label>
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-muted-foreground">
                  €
                </span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    setSelectedPreset(0)
                  }}
                  className="pl-8 text-2xl font-semibold h-14"
                  min="1"
                />
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                      selectedPreset === preset
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    €{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment section */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Select payment method</Label>
              
              <div className="space-y-3">
                <Button 
                  className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Pay with PayPal
                </Button>
                
                <Button 
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay with Card (Stripe)
                </Button>
              </div>
            </div>
          </div>

          {/* Transparency note */}
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
            <ShieldCheck className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Transparency Note</p>
              <p className="text-sm text-muted-foreground">
                100% goes to platform maintenance and development. No organizational affiliation. 
                We are committed to remaining an independent voice for all.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
