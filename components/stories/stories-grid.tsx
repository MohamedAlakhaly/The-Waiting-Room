import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight, Calendar, UserX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const stories = [
  {
    id: 1,
    name: "Anonymous",
    isAnonymous: true,
    country: "Bulgaria",
    yearsInBelgium: 4,
    role: "Verified Contributor",
    quote: '"The journey didn\'t end when I crossed the border. In Sofia, I found safety but no path forward. After 2 years there, I came to Belgium seeking a real chance to rebuild..."',
  },
  {
    id: 2,
    name: "Fatima A.",
    isAnonymous: false,
    country: "Greece",
    yearsInBelgium: 1.5,
    role: "Antwerp Community",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    quote: '"In Moria, we felt forgotten. Advocacy groups in Brussels were the first ones to truly listen to our specific legal hurdles regarding Dublin transfers..."',
  },
  {
    id: 3,
    name: "Anonymous",
    isAnonymous: true,
    country: "Greece",
    yearsInBelgium: 3,
    role: "Verified Contributor",
    quote: '"The paperwork is a labyrinth. I speak five languages, but none of them helped me understand the circular logic of the previous protection laws..."',
  },
  {
    id: 4,
    name: "Markos V.",
    isAnonymous: false,
    country: "Bulgaria",
    yearsInBelgium: 5,
    role: "Brussels Sector",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    quote: '"Five years ago, the laws were different. Now, we face retroactive checks that threaten the stability we\'ve built here in Belgium. We need consistency."',
  },
]

export function StoriesGrid() {
  const t = useTranslations('stories')

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {stories.map((story) => (
        <Card key={story.id} className="bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {story.isAnonymous ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <UserX className="h-5 w-5 text-muted-foreground" />
                  </div>
                ) : (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={story.image} alt={story.name} />
                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <p className="font-medium text-foreground">{story.name}</p>
                  <p className="text-xs text-muted-foreground">{story.role}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {story.country}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              {story.quote}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {story.yearsInBelgium} {t('yearsInBE')}
            </div>
            <Link
              href={`/stories/${story.id}`}
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
            >
              {t('readStory')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
