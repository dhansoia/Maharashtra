'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS: { category: string; q: string; a: string }[] = [
  {
    category: 'General',
    q: 'What is the AIVC iFuel Mini Fuel Pump network?',
    a: 'A national distributed-fuel network that places small, fully-compliant fuel pumps in rural & semi-urban locations. Maharashtra is being rolled out by our Pvt. Ltd. company as the State Partner.',
  },
  {
    category: 'General',
    q: 'Who can apply?',
    a: 'Any Indian individual or registered entity that is 21+ years old, KYC-compliant, and has the financial readiness for the chosen tier (₹14.16 L for Pump Holder; ₹1.02 Cr for District Partner).',
  },
  {
    category: 'District Partner',
    q: 'Can I get more than one district?',
    a: 'Each District Partner is allotted one district. State-Partner-level engagements are separate and require ₹4.88 Cr commitment.',
  },
  {
    category: 'District Partner',
    q: 'How does the 10% incentive work?',
    a: 'For every additional Pump Holder (above your initial 6 pumps) you onboard in your district, you receive ₹1,20,000 as a one-time incentive (10% of the discounted pump base).',
  },
  {
    category: 'Pump Holder',
    q: 'What land do I need?',
    a: 'Minimum 20×20 ft flat, accessible plot — own, family-owned, or leased. Ideally on a motorable road, with electricity (or arrangeable).',
  },
  {
    category: 'Pump Holder',
    q: 'Who handles fuel supply?',
    a: 'AIVC iFuel manages bulk fuel sourcing, logistics and delivery to your pump on a scheduled basis. You only pay for the fuel you receive.',
  },
  {
    category: 'Investment',
    q: 'Are there ongoing fees?',
    a: 'No royalty or recurring license fees. Your only ongoing costs are operating capital (fuel inventory), electricity, manpower and AMC (after year 1).',
  },
  {
    category: 'Operations',
    q: 'How is fuel billed to customers?',
    a: 'Through our POS + mobile app. Every transaction generates a digital receipt and reconciles to the master dashboard.',
  },
]

const CATEGORIES = ['All', 'General', 'District Partner', 'Pump Holder', 'Investment', 'Operations']

export default function FAQPage() {
  const [active, setActive] = useState('All')
  const [open, setOpen] = useState<number | null>(0)
  const filtered = active === 'All' ? FAQS : FAQS.filter((f) => f.category === active)

  return (
    <>
      <section className="bg-navy-50/40 py-10">
        <div className="container-default text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">FAQ</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-default max-w-3xl">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  active === c
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : 'border-navy-200 bg-white text-navy-700 hover:bg-navy-50',
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filtered.map((f, i) => (
              <div key={i} className="rounded-lg border border-navy-100 bg-white">
                <button
                  onClick={() => setOpen((o) => (o === i ? null : i))}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <span className="font-display text-base font-semibold text-navy-900">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 flex-shrink-0 text-navy-500 transition-transform',
                      open === i && 'rotate-180',
                    )}
                  />
                </button>
                {open === i ? (
                  <div className="border-t border-navy-100 p-4 text-sm text-navy-700">{f.a}</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
