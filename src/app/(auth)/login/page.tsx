'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Fuel, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.message || 'Invalid credentials')
      }
      window.location.href = '/dashboard'
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-navy-50/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <Link href="/" className="mb-6 flex items-center justify-center gap-2 font-display text-lg font-bold text-navy-900">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-navy-900 text-gold-400">
              <Fuel className="h-5 w-5" />
            </span>
            AIVC iFuel <span className="text-gold-700">Maharashtra</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-navy-900">Partner Login</h1>
          <p className="mt-1 text-sm text-navy-600">
            Sign in to your dashboard.
          </p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-gold-700 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required autoComplete="current-password" />
            </div>
            {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-navy-600">
            Want to apply as a District Partner?{' '}
            <Link href="/district-partner/apply" className="font-medium text-gold-700 hover:underline">
              Apply here
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
