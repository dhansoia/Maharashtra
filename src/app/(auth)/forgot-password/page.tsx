'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const data = new FormData(e.currentTarget)
    await fetch('/api/users/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.get('email') }),
    }).catch(() => null)
    setSubmitting(false)
    setDone(true)
  }

  return (
    <main className="grid min-h-screen place-items-center bg-navy-50/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <h1 className="font-display text-2xl font-bold text-navy-900">Reset Password</h1>
          <p className="mt-1 text-sm text-navy-600">
            Enter your email and we'll send a password-reset link.
          </p>
          {done ? (
            <p className="mt-6 rounded-md bg-forest-500/10 p-4 text-sm text-forest-700">
              If an account exists for that email, a reset link has been sent.
            </p>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Send Reset Link
              </Button>
            </form>
          )}
          <p className="mt-6 text-center text-sm">
            <Link href="/login" className="text-gold-700 hover:underline">
              Back to login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
