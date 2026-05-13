import { Share2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function SharePetition() {
  return (
    <Card className="bg-muted/50">
      <CardHeader className="pb-3">
        <p className="text-sm text-muted-foreground">Share this petition with your network:</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-[#25D366] text-white hover:bg-[#25D366]/90">
            <Share2 className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
          <Button className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90">
            <Share2 className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
