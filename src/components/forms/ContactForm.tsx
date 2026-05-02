'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldText, FieldTextarea, FieldSelect } from './FormField'

const schema = z.object({
  name: z.string().min(2, 'Required'),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter 10-digit mobile'),
  interest: z.string().min(1, 'Required'),
  district: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, 'Tell us a bit more'),
})

type Values = z.infer<typeof schema>

export function ContactForm() {
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const form = useForm<Values>({ resolver: zodResolver(schema), mode: 'onTouched' })
  const errors = form.formState.errors

  const onSubmit = async (data: Values) => {
    setSubmitting(true)
    setErr(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      setDone(true)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border border-forest-600/40 bg-forest-500/10 p-6 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-forest-600 text-white">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="font-display text-lg font-semibold text-navy-900">Message Sent</p>
        <p className="mt-1 text-sm text-navy-600">We'll get back to you within 1 working day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FieldText label="Full Name" {...form.register('name')} name="name" required error={errors.name?.message} />
        <FieldText label="Email" type="email" {...form.register('email')} name="email" required error={errors.email?.message} />
        <FieldText label="Mobile" {...form.register('phone')} name="phone" required maxLength={10} inputMode="numeric" error={errors.phone?.message} />
        <FieldSelect
          label="I'm interested in"
          {...form.register('interest')}
          name="interest"
          required
          error={errors.interest?.message}
          options={[
            { label: 'District Partner', value: 'district' },
            { label: 'Pump Holder', value: 'pump-holder' },
            { label: 'General Enquiry', value: 'general' },
            { label: 'Media / Press', value: 'media' },
          ]}
        />
        <FieldText label="District" {...form.register('district')} name="district" />
        <FieldText label="Subject" {...form.register('subject')} name="subject" />
      </div>
      <FieldTextarea label="Message" {...form.register('message')} name="message" required error={errors.message?.message} rows={5} />
      {err ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{err}</p> : null}
      <Button type="submit" variant="gold" size="lg" disabled={submitting}>
        {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
        Send Message
      </Button>
    </form>
  )
}
