'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldText, FieldTextarea, FieldSelect } from './FormField'
import { StepIndicator } from './StepIndicator'
import { Card, CardContent } from '@/components/ui/card'
import { MAHARASHTRA_DISTRICTS } from '@/lib/maharashtra-districts'

const STEPS = ['Identity', 'Business', 'Territory', 'Investment', 'Submit']

const schema = z.object({
  // Step 1
  entityName: z.string().min(2, 'Required'),
  entityType: z.string().min(1, 'Required'),
  cin: z.string().optional(),
  pan: z
    .string()
    .min(10, 'Enter valid PAN')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/i, 'Invalid PAN format'),
  gst: z.string().optional(),
  contactPerson: z.string().min(2, 'Required'),
  designation: z.string().optional(),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter 10-digit Indian mobile'),
  email: z.string().email('Enter a valid email'),
  address: z.string().min(5, 'Required'),
  city: z.string().min(2, 'Required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter 6-digit pincode'),
  // Step 2
  businessNature: z.string().optional(),
  yearsInBusiness: z.string().optional(),
  annualTurnover: z.string().optional(),
  experience: z.string().optional(),
  // Step 3
  preferredDistrict: z.string().min(1, 'Select a district'),
  secondPreference: z.string().optional(),
  blocksOfInterest: z.string().optional(),
  operationalReadiness: z.string().min(1, 'Required'),
  // Step 4 (acknowledge)
  ackInvestment: z.literal('on', { errorMap: () => ({ message: 'Please acknowledge' }) }),
  ackMOU: z.literal('on', { errorMap: () => ({ message: 'Please acknowledge' }) }),
})

type FormValues = z.infer<typeof schema>

export function DistrictPartnerForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState<{ ref: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })

  const next = async () => {
    const fieldsByStep: (keyof FormValues)[][] = [
      [
        'entityName',
        'entityType',
        'pan',
        'contactPerson',
        'mobile',
        'email',
        'address',
        'city',
        'pincode',
      ],
      [],
      ['preferredDistrict', 'operationalReadiness'],
      ['ackInvestment', 'ackMOU'],
    ]
    const ok = await form.trigger(fieldsByStep[step])
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/applications/district-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          state: 'Maharashtra',
          district: data.preferredDistrict,
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Submission failed')
      }
      const j = await res.json()
      setSubmitted({ ref: j.reference || `DP-${Date.now()}` })
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return <Success reference={submitted.ref} />

  const errors = form.formState.errors

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <StepIndicator steps={STEPS} current={step} />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardContent className="space-y-5 p-6 md:p-8">
            {step === 0 ? (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">
                  Step 1 — Identity & Contact
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldText
                    label="Entity / Applicant Name"
                    {...form.register('entityName')}
                    name="entityName"
                    required
                    error={errors.entityName?.message}
                  />
                  <FieldSelect
                    label="Entity Type"
                    {...form.register('entityType')}
                    name="entityType"
                    required
                    error={errors.entityType?.message}
                    options={[
                      { label: 'Pvt. Ltd. Company', value: 'pvt-ltd' },
                      { label: 'LLP', value: 'llp' },
                      { label: 'Partnership', value: 'partnership' },
                      { label: 'Proprietorship', value: 'proprietorship' },
                      { label: 'Individual', value: 'individual' },
                      { label: 'HUF', value: 'huf' },
                    ]}
                  />
                  <FieldText
                    label="CIN / Registration No."
                    {...form.register('cin')}
                    name="cin"
                    error={errors.cin?.message}
                  />
                  <FieldText
                    label="PAN"
                    {...form.register('pan')}
                    name="pan"
                    required
                    placeholder="ABCDE1234F"
                    error={errors.pan?.message}
                  />
                  <FieldText
                    label="GST Registration No."
                    {...form.register('gst')}
                    name="gst"
                    error={errors.gst?.message}
                  />
                  <FieldText
                    label="Contact Person"
                    {...form.register('contactPerson')}
                    name="contactPerson"
                    required
                    error={errors.contactPerson?.message}
                  />
                  <FieldText
                    label="Designation"
                    {...form.register('designation')}
                    name="designation"
                    error={errors.designation?.message}
                  />
                  <FieldText
                    label="Mobile"
                    {...form.register('mobile')}
                    name="mobile"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    error={errors.mobile?.message}
                  />
                  <FieldText
                    label="Email"
                    type="email"
                    {...form.register('email')}
                    name="email"
                    required
                    error={errors.email?.message}
                  />
                </div>
                <FieldTextarea
                  label="Address"
                  {...form.register('address')}
                  name="address"
                  required
                  error={errors.address?.message}
                />
                <div className="grid gap-4 md:grid-cols-3">
                  <FieldText
                    label="City"
                    {...form.register('city')}
                    name="city"
                    required
                    error={errors.city?.message}
                  />
                  <FieldText
                    label="Pincode"
                    {...form.register('pincode')}
                    name="pincode"
                    required
                    inputMode="numeric"
                    maxLength={6}
                    error={errors.pincode?.message}
                  />
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">
                  Step 2 — Business Background
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldText label="Nature of Business" {...form.register('businessNature')} name="businessNature" />
                  <FieldText
                    label="Years in Business"
                    type="number"
                    {...form.register('yearsInBusiness')}
                    name="yearsInBusiness"
                  />
                  <FieldText
                    label="Annual Turnover (₹)"
                    {...form.register('annualTurnover')}
                    name="annualTurnover"
                    placeholder="Annual turnover in INR"
                  />
                  <FieldSelect
                    label="Industry Experience"
                    {...form.register('experience')}
                    name="experience"
                    options={[
                      { label: 'Fuel / Petroleum', value: 'fuel' },
                      { label: 'Agriculture', value: 'agri' },
                      { label: 'Transport / Logistics', value: 'transport' },
                      { label: 'Retail / Distribution', value: 'retail' },
                      { label: 'Govt. Contracting', value: 'govt' },
                      { label: 'Real Estate', value: 'real-estate' },
                      { label: 'Other', value: 'other' },
                    ]}
                  />
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">
                  Step 3 — Territory Preference
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldSelect
                    label="Preferred District"
                    {...form.register('preferredDistrict')}
                    name="preferredDistrict"
                    required
                    error={errors.preferredDistrict?.message}
                    options={MAHARASHTRA_DISTRICTS.map((d) => ({ label: d.name, value: d.name }))}
                  />
                  <FieldSelect
                    label="2nd Preference"
                    {...form.register('secondPreference')}
                    name="secondPreference"
                    options={MAHARASHTRA_DISTRICTS.map((d) => ({ label: d.name, value: d.name }))}
                  />
                </div>
                <FieldText
                  label="Blocks / Tehsils of Interest (optional)"
                  {...form.register('blocksOfInterest')}
                  name="blocksOfInterest"
                  hint="Comma-separated. We'll prioritise these blocks in your district."
                />
                <FieldSelect
                  label="Operational Readiness"
                  {...form.register('operationalReadiness')}
                  name="operationalReadiness"
                  required
                  error={errors.operationalReadiness?.message}
                  options={[
                    { label: 'Ready immediately', value: 'immediate' },
                    { label: 'Need time to set up (1-3 months)', value: 'needs-time' },
                  ]}
                />
              </>
            ) : null}

            {step === 3 ? (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">
                  Step 4 — Acknowledgement
                </h2>
                <div className="rounded-lg border border-gold-300 bg-gold-50/50 p-4 text-sm text-navy-800">
                  <p className="font-semibold text-navy-900">Investment & earnings</p>
                  <p className="mt-1">
                    The State Partner will walk you through investment, commission and projected earnings on
                    a one-on-one call once your application is shortlisted. We do not publish these figures
                    online.
                  </p>
                </div>
                <div className="space-y-3">
                  <Checkbox
                    label="I am aware that investment and earnings will be shared by the State Partner on a call, and I confirm financial readiness in principle."
                    {...form.register('ackInvestment')}
                    name="ackInvestment"
                    error={errors.ackInvestment?.message}
                  />
                  <Checkbox
                    label="I agree to sign the District Partner MOU on approval and abide by its terms."
                    {...form.register('ackMOU')}
                    name="ackMOU"
                    error={errors.ackMOU?.message}
                  />
                </div>
              </>
            ) : null}

            {step === 4 ? (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">Step 5 — Review & Submit</h2>
                <p className="text-sm text-navy-600">
                  Review your details before submitting. Documents (PAN, registration, GST, photo) can be uploaded
                  via the partner portal once your application is shortlisted.
                </p>
                <SummaryView values={form.getValues()} />
                {submitError ? (
                  <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{submitError}</p>
                ) : null}
              </>
            ) : null}

            <div className="flex items-center justify-between border-t border-navy-100 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={next} variant="gold">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" variant="gold" disabled={submitting}>
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

function Checkbox({
  label,
  error,
  name,
  ...props
}: {
  label: string
  error?: string
  name: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="flex items-start gap-2 text-sm text-navy-800">
        <input
          type="checkbox"
          name={name}
          {...props}
          className="mt-1 h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400"
        />
        <span>{label}</span>
      </label>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}

function SummaryView({ values }: { values: Partial<FormValues> }) {
  const items: [string, string | undefined][] = [
    ['Entity', values.entityName],
    ['Type', values.entityType],
    ['Contact', values.contactPerson],
    ['Mobile', values.mobile],
    ['Email', values.email],
    ['City', values.city],
    ['Preferred District', values.preferredDistrict],
    ['Readiness', values.operationalReadiness],
  ]
  return (
    <div className="grid gap-2 rounded-md border border-navy-100 bg-navy-50/40 p-4 md:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k} className="flex justify-between text-sm">
          <span className="text-navy-500">{k}</span>
          <span className="font-medium text-navy-900">{v || '—'}</span>
        </div>
      ))}
    </div>
  )
}

function Success({ reference }: { reference: string }) {
  return (
    <Card className="mx-auto max-w-xl">
      <CardContent className="p-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-forest-600 text-white">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="font-display text-2xl font-bold text-navy-900">Application Received</h2>
        <p className="mt-2 text-navy-600">
          Thank you. Our team will revert within 3 working days.
        </p>
        <p className="mt-4 rounded-md bg-navy-50 px-4 py-3 font-mono text-sm">
          Reference: <strong>{reference}</strong>
        </p>
        <p className="mt-3 text-xs text-navy-500">
          A confirmation email and WhatsApp message will be sent shortly.
        </p>
      </CardContent>
    </Card>
  )
}
