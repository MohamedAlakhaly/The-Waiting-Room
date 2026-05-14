import { Shield, Lock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function PrivacyCard() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-primary">
          <Shield className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Privacy & Safety
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground">
          We prioritize your safety above all else. Your story can be shared entirely 
          anonymously, and we never share your personal data with third-party institutions.
        </p>
        <div className="flex items-center gap-2 text-primary">
          <Lock className="h-4 w-4" />
          <span className="text-sm font-medium">End-to-end encrypted submission</span>
        </div>
      </CardContent>
    </Card>
  )
}
