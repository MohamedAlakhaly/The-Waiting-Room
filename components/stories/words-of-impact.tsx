import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function WordsOfImpact() {
  return (
    <Card className="bg-secondary text-secondary-foreground">
      <CardHeader className="pb-2">
        <div className="flex flex-col">
          <span className="font-serif text-4xl font-bold">500</span>
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary-foreground/70">
            Words of Impact
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-secondary-foreground/90">
          Brief stories often carry the strongest emotional resonance. Aim for clarity 
          and focus on a specific moment of civic engagement.
        </p>
        <div className="mt-4 text-6xl font-serif text-secondary-foreground/20">
          &ldquo;&rdquo;
        </div>
      </CardContent>
    </Card>
  )
}
