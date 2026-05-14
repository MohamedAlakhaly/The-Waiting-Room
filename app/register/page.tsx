'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function RegisterPage() {
  const router = useRouter()
  const [anonymous, setAnonymous] = useState(false)

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/">
            <h1 className="font-serif text-2xl font-bold text-[#C9F14E]">
              The Waiting Room
            </h1>
          </Link>
          <p className="mt-2 text-sm text-[#D1D5DB]">Join our community</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#202020] bg-[#161616] p-6 space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-[#F5F4F4]">Full Name</Label>
            <Input
              type="text"
              placeholder="Your name"
              className="bg-[#0F0F0F] border-[#202020] text-[#F5F4F4] focus:border-[#C9F14E] h-12"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-[#F5F4F4]">Email</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              className="bg-[#0F0F0F] border-[#202020] text-[#F5F4F4] focus:border-[#C9F14E] h-12"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-[#F5F4F4]">Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-[#0F0F0F] border-[#202020] text-[#F5F4F4] focus:border-[#C9F14E] h-12"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label className="text-[#F5F4F4]">Confirm Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-[#0F0F0F] border-[#202020] text-[#F5F4F4] focus:border-[#C9F14E] h-12"
            />
          </div>

          {/* Anonymous toggle */}
          <div className="flex items-center justify-between rounded-xl border border-[#202020] bg-[#0F0F0F] p-4">
            <div className="flex items-center gap-3">
              <EyeOff className="h-4 w-4 text-[#D1D5DB]" />
              <div>
                <p className="text-sm font-medium text-[#F5F4F4]">Keep my identity private</p>
                <p className="text-xs text-[#D1D5DB]">Your name won't appear publicly</p>
              </div>
            </div>
            <Switch
              checked={anonymous}
              onCheckedChange={setAnonymous}
              className="data-[state=checked]:bg-[#C9F14E]"
            />
          </div>

          {/* Submit */}
          <Button
            className="w-full h-12 bg-[#C9F14E] text-[#0F0F0F] font-bold hover:bg-[#D9F87E] rounded-full"
            onClick={() => router.push('/')}
          >
            Create Account
          </Button>
        </div>

        {/* Login link */}
        <p className="mt-4 text-center text-sm text-[#D1D5DB]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#C9F14E] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}