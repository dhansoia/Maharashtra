import type { Metadata } from 'next'
import { Building2, Fuel } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About AIVC × iFuel',
  description: 'The national AIVC × iFuel partnership and what it means for Maharashtra.',
}

export default function AboutAIVCiFuelPage() {
  return (
    <>
      <section className="gradient-hero py-16 text-white">
        <div className="container-default">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-300">Partnership</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            <span className="gold-text">AIVC × iFuel</span> — A National Mini Fuel Network
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-navy-200">
            Two organisations — one infrastructure-led national entrepreneur network, one fuel-tech operating
            company — joined to launch India's first standardised Mini Fuel Pump rollout.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default">
          <SectionHeader title="Two Brands. One Mission." />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-navy-900 text-gold-400">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900">AIVC</h3>
                <p className="mt-2 text-sm text-navy-600">
                  All-India Venture Council. Pan-India infrastructure & entrepreneur network with state-level
                  partners, district-level partners and on-ground operators across 25+ states.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-gold-400 text-navy-950">
                  <Fuel className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900">iFuel</h3>
                <p className="mt-2 text-sm text-navy-600">
                  Tech-enabled fuel logistics company. Owns the Mini Fuel Pump hardware, dispensing standards,
                  fuel sourcing tie-ups, billing & compliance technology.
                </p>
              </CardContent>
            </Card>
          </div>

          <SectionHeader title="Why this matters for Maharashtra" className="mt-16" />
          <ul className="mx-auto max-w-3xl space-y-3 text-navy-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-gold-100 text-xs font-bold text-gold-700">
                1
              </span>
              National brand & SOPs — every pump operates to the same compliance bar.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-gold-100 text-xs font-bold text-gold-700">
                2
              </span>
              Centralised fuel sourcing & logistics — better price, guaranteed availability.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-gold-100 text-xs font-bold text-gold-700">
                3
              </span>
              Local State Partner — your district concerns are escalated locally, not to a faraway head office.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-gold-100 text-xs font-bold text-gold-700">
                4
              </span>
              Tested & proven model — already operational in multiple states.
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
