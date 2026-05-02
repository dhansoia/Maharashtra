import type { Metadata } from 'next'
import { DistrictPartnerForm } from '@/components/forms/DistrictPartnerForm'

export const metadata: Metadata = {
  title: 'Apply as District Partner',
  description: 'Multi-step online application for AIVC iFuel Maharashtra District Partner programme.',
}

export default function DistrictPartnerApplyPage() {
  return (
    <>
      <section className="bg-navy-50/40 py-10">
        <div className="container-default text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">Apply Online</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">
            District Partner Application
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-navy-600">
            Five quick steps. Your data is securely stored. Our team responds within 3 working days.
          </p>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container-default">
          <DistrictPartnerForm />
        </div>
      </section>
    </>
  )
}
