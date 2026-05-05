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

const STEPS = ['Personal', 'Address', 'Site', 'Investment', 'Submit']

const schema = z.object({
  fullName: z.string().min(2, 'Required'),
  fatherName: z.string().min(2, 'Required'),
  dob: z.string().min(1, 'Required'),
  gender: z.string().min(1, 'Required'),
  aadhaar: z.string().regex(/^\d{12}$/, 'Enter 12-digit Aadhaar'),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/i, 'Invalid PAN'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter 10-digit mobile'),
  email: z.string().email().optional().or(z.literal('')),
  occupation: z.string().min(1, 'Required'),

  address: z.string().min(5, 'Required'),
  village: z.string().min(2, 'Required'),
  block: z.string().min(2, 'Required'),
  district: z.string().min(1, 'Required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter 6-digit pincode'),

  siteAddress: z.string().min(5, 'Required'),
  locationType: z.string().min(1, 'Required'),
  landOwnership: z.string().min(1, 'Required'),
  areaAvailable: z.string().min(1, 'Required'),
  roadAccess: z.string().min(1, 'Required'),
  electricity: z.string().min(1, 'Required'),

  ackInvestment: z.literal('on', { errorMap: () => ({ message: 'Please acknowledge' }) }),
})

type FormValues = z.infer<typeof schema>

export function PumpHolderForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState<{ ref: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })
  const errors = form.formState.errors

  const next = async () => {
    const fieldsByStep: (keyof FormValues)[][] = [
      ['fullName', 'fatherName', 'dob', 'gender', 'aadhaar', 'pan', 'mobile', 'occupation'],
      ['address', 'village', 'block', 'district', 'pincode'],
      ['siteAddress', 'locationType', 'landOwnership', 'areaAvailable', 'roadAccess', 'electricity'],
      ['ackInvestment'],
    ]
    const ok = await form.trigger(fieldsByStep[step])
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/applications/pump-holder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Submission failed')
      }
      const j = await res.json()
      setSubmitted({ ref: j.reference || `MFP-${Date.now()}` })
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return <Success reference={submitted.ref} />

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
                <h2 className="font-display text-2xl font-bold text-navy-900">Step 1 — Personal Details</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldText label="Full Name" {...form.register('fullName')} name="fullName" required error={errors.fullName?.message} />
                  <FieldText label="Father's Name" {...form.register('fatherName')} name="fatherName" required error={errors.fatherName?.message} />
                  <FieldText label="Date of Birth" type="date" {...form.register('dob')} name="dob" required error={errors.dob?.message} />
                  <FieldSelect
                    label="Gender"
                    {...form.register('gender')}
                    name="gender"
                    required
                    error={errors.gender?.message}
                    options={[
                      { label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' },
                      { label: 'Other', value: 'other' },
                    ]}
                  />
                  <FieldText
                    label="Aadhaar Number"
                    {...form.register('aadhaar')}
                    name="aadhaar"
                    required
                    inputMode="numeric"
                    maxLength={12}
                    error={errors.aadhaar?.message}
                  />
                  <FieldText label="PAN" {...form.register('pan')} name="pan" required placeholder="ABCDE1234F" error={errors.pan?.message} />
                  <FieldText label="Mobile" {...form.register('mobile')} name="mobile" required inputMode="numeric" maxLength={10} error={errors.mobile?.message} />
                  <FieldText label="Email (optional)" type="email" {...form.register('email')} name="email" error={errors.email?.message} />
                  <FieldSelect
                    label="Occupation"
                    {...form.register('occupation')}
                    name="occupation"
                    required
                    error={errors.occupation?.message}
                    options={[
                      { label: 'Farmer', value: 'farmer' },
                      { label: 'Business Owner', value: 'business' },
                      { label: 'Retired Govt.', value: 'retired-govt' },
                      { label: 'Ex-Serviceman', value: 'ex-serviceman' },
                      { label: 'Transport Operator', value: 'transport' },
                      { label: 'Self-Employed', value: 'self' },
                      { label: 'Salaried', value: 'salaried' },
                      { label: 'Other', value: 'other' },
                    ]}
                  />
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">Step 2 — Address</h2>
                <FieldTextarea label="Permanent Address" {...form.register('address')} name="address" required error={errors.address?.message} />
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldText label="Village" {...form.register('village')} name="village" required error={errors.village?.message} />
                  <FieldText label="Block / Tehsil" {...form.register('block')} name="block" required error={errors.block?.message} />
                  <FieldSelect
                    label="District"
                    {...form.register('district')}
                    name="district"
                    required
                    error={errors.district?.message}
                    options={MAHARASHTRA_DISTRICTS.map((d) => ({ label: d.name, value: d.name }))}
                  />
                  <FieldText label="Pincode" {...form.register('pincode')} name="pincode" required inputMode="numeric" maxLength={6} error={errors.pincode?.message} />
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">Step 3 — Proposed Pump Site</h2>
                <FieldTextarea label="Site Address" {...form.register('siteAddress')} name="siteAddress" required error={errors.siteAddress?.message} />
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldSelect
                    label="Location Type"
                    {...form.register('locationType')}
                    name="locationType"
                    required
                    error={errors.locationType?.message}
                    options={[
                      { label: 'Agricultural Land', value: 'agri' },
                      { label: 'Commercial Property', value: 'commercial' },
                      { label: 'Highway / Main Road', value: 'highway' },
                      { label: 'Industrial Area', value: 'industrial' },
                      { label: 'Market / Mandi', value: 'market' },
                      { label: 'Transport Hub', value: 'transport' },
                      { label: 'Other', value: 'other' },
                    ]}
                  />
                  <FieldSelect
                    label="Land Ownership"
                    {...form.register('landOwnership')}
                    name="landOwnership"
                    required
                    error={errors.landOwnership?.message}
                    options={[
                      { label: 'Own Land', value: 'own' },
                      { label: 'Leased / Rented', value: 'leased' },
                      { label: 'Family-Owned', value: 'family' },
                      { label: 'To be arranged', value: 'tba' },
                    ]}
                  />
                  <FieldText
                    label="Area Available"
                    {...form.register('areaAvailable')}
                    name="areaAvailable"
                    required
                    placeholder="e.g. 25×30 ft"
                    error={errors.areaAvailable?.message}
                  />
                  <FieldSelect
                    label="Road Access"
                    {...form.register('roadAccess')}
                    name="roadAccess"
                    required
                    error={errors.roadAccess?.message}
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                      { label: 'Under Construction', value: 'under-construction' },
                    ]}
                  />
                  <FieldSelect
                    label="Electricity"
                    {...form.register('electricity')}
                    name="electricity"
                    required
                    error={errors.electricity?.message}
                    options={[
                      { label: 'Yes – Single Phase', value: 'single' },
                      { label: 'Yes – Three Phase', value: 'three' },
                      { label: 'No', value: 'no' },
                      { label: 'Can be arranged', value: 'arrangeable' },
                    ]}
                  />
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">Step 4 — Acknowledgement</h2>
                <div className="rounded-lg border border-gold-300 bg-gold-50/50 p-4 text-sm text-navy-800">
                  <p className="font-semibold text-navy-900">Investment & earnings</p>
                  <p className="mt-1">
                    The State Partner will share pump price, applicable taxes and per-litre commission on a
                    one-on-one call once your application is shortlisted. Civil work, electrical setup and
                    operating capital are borne separately by the applicant; AIVC handles installation,
                    training and ongoing operational support.
                  </p>
                </div>
                <Checkbox
                  label="I am aware that investment will be shared by the State Partner on a call, and I confirm I can arrange civil work and operating capital separately."
                  {...form.register('ackInvestment')}
                  name="ackInvestment"
                  error={errors.ackInvestment?.message}
                />
              </>
            ) : null}

            {step === 4 ? (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">Step 5 — Review & Submit</h2>
                <p className="text-sm text-navy-600">
                  Confirm details and submit. Site photos and KYC documents will be requested via WhatsApp/email
                  after verification.
                </p>
                <SummaryView values={form.getValues()} />
                {submitError ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{submitError}</p> : null}
              </>
            ) : null}

            <div className="flex items-center justify-between border-t border-navy-100 pt-4">
              <Button type="button" variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
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
}: { label: string; error?: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
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
    ['Name', values.fullName],
    ['Father', values.fatherName],
    ['Mobile', values.mobile],
    ['Aadhaar', values.aadhaar],
    ['District', values.district],
    ['Block', values.block],
    ['Site Type', values.locationType],
    ['Land Ownership', values.landOwnership],
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
        <h2 className="font-display text-2xl font-bold text-navy-900">Allotment Application Received</h2>
        <p className="mt-2 text-navy-600">Site verification will be scheduled in 1-2 weeks.</p>
        <p className="mt-4 rounded-md bg-navy-50 px-4 py-3 font-mono text-sm">
          Reference: <strong>{reference}</strong>
        </p>
      </CardContent>
    </Card>
  )
}
