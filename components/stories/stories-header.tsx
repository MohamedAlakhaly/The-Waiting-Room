import Link from "next/link"
import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StoriesHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Shared Journeys
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Every voice adds weight to the call for justice. These are the lived experiences 
          of those navigating the Belgian advocacy landscape.
        </p>
      </div>
      <Link href="/stories/new">
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <PenLine className="mr-2 h-4 w-4" />
          Share Your Story
        </Button>
      </Link>
    </div>
  )
}
