import Link from "next/link"
import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const articles = [
  {
    id: 1,
    source: "Human Rights Watch",
    date: "April 28, 2024",
    title: "Policy Shift: New Legal Frameworks in Bulgaria",
    excerpt: "Analyzing the implications of recent legislative changes on asylum processing times and transparency.",
    tags: ["Bulgaria", "Legal"],
  },
  {
    id: 2,
    source: "UNHCR",
    date: "April 22, 2024",
    title: "Education Access for Displaced Youth",
    excerpt: "A survey of secondary education enrollment across three European transit hubs.",
    tags: ["Greece", "Legal"],
  },
  {
    id: 3,
    source: "Amnesty",
    date: "April 15, 2024",
    title: "Digital Surveillance and Privacy Rights",
    excerpt: "Examining the use of biometric tracking in modern border management systems.",
    tags: ["Legal", "Global"],
  },
]

export function NewsGrid() {
  const t = useTranslations('news')

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id} className="bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary">{article.source}</span>
              <span className="text-xs text-muted-foreground">{article.date}</span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <h3 className="font-semibold text-foreground">{article.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <Link
              href={`/news/${article.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t('readReport')}
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
