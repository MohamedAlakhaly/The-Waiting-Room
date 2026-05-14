import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"

export function PetitionHeader() {
  const t = useTranslations('petition')

  return (
    <div>
      <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
        {t('active')}
      </Badge>
      <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
        {t('title')}
      </h1>
      <div className="mt-6 overflow-hidden rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop"
          alt="Community gathering for petition"
          className="aspect-2/1 w-full object-cover"
        />
      </div>
    </div>
  )
}
