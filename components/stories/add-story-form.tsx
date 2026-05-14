"use client"

import { useState } from "react"
import { EyeOff, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AddStoryForm() {
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [story, setStory] = useState("")
  const maxWords = 500

  const wordCount = story.trim() ? story.trim().split(/\s+/).length : 0

  return (
    <Card>
      <CardHeader>
        {/* Anonymous toggle */}
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <EyeOff className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Post Anonymously</p>
              <p className="text-sm text-muted-foreground">
                Hide your name and profile photo from this story
              </p>
            </div>
          </div>
          <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Dropdowns */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="country">Previous Country</Label>
            <Select>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select your origin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="greece">Greece</SelectItem>
                <SelectItem value="bulgaria">Bulgaria</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="years">Years in Belgium</Label>
            <Select>
              <SelectTrigger id="years">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Less than 1 year</SelectItem>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="2-3">2-3 years</SelectItem>
                <SelectItem value="3-4">3-4 years</SelectItem>
                <SelectItem value="4-5">4-5 years</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Story textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="story">Your Story</Label>
            <span className="text-sm text-muted-foreground">
              {wordCount} / {maxWords} words
            </span>
          </div>
          <Textarea
            id="story"
            placeholder="Tell us about your experience with civic advocacy, local integration, or community support..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="min-h-[200px] resize-none"
          />
        </div>

        {/* Guidelines checkbox */}
        <div className="flex items-start gap-3">
          <Checkbox id="guidelines" />
          <Label htmlFor="guidelines" className="text-sm leading-relaxed text-muted-foreground">
            I agree to the{" "}
            <a href="/community-guidelines" className="font-medium text-foreground underline">
              Community Guidelines
            </a>
          </Label>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Submit Story
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
