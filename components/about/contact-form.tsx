"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  return (
    <section className="mt-12">
      <Card>
        <CardHeader className="text-center">
          <p className="text-sm text-muted-foreground">Let&apos;s Collaborate</p>
          <CardTitle className="text-lg">
            Are you an NGO, legal expert, or community leader? We want to hear from you.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="jane@advocacy.org" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="How can we work together?"
                className="min-h-[120px] resize-none"
              />
            </div>
            <div className="flex justify-center">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Send Message
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
