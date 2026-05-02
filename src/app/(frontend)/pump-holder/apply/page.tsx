import type { Metadata } from 'next'
import { PumpHolderForm } from '@/components/forms/PumpHolderForm'

export const metadata: Metadata = {
  title: 'Apply for Pump Allotment',
  description: 'Online allotment application for AIVC iFuel Mini Fuel Pump.',
}

export default function PumpHolderApplyPage() {
  return (
    <>
      <section className="bg-navy-50/40 py-10">
        <div className="container-default text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">Apply Online</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Mini Fuel Pump Allotment Application
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-navy-600">
            Fill in your details and proposed site information. Our team will schedule site verification.
          </p>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container-default">
          <PumpHolderForm />
        </div>
      </section>
    </>
  )
}
