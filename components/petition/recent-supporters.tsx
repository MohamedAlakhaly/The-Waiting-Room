import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const supporters = [
  { initials: "MK", name: "M. K.", time: "4 minutes ago" },
  { initials: "A", name: "Anonymous", time: "12 minutes ago" },
]

export function RecentSupporters() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Supporters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {supporters.map((supporter, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              {supporter.initials}
            </div>
            <div>
              <p className="text-sm">
                <strong className="font-medium text-foreground">{supporter.name}</strong>
                {" "}signed {supporter.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
