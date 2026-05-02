'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, MapPin, FileSignature, Wrench, TrendingUp } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'

const STEPS = [
  {
    icon: ClipboardCheck,
    title: 'Apply Online',
    description: 'Submit District Partner or Pump Holder application with required documents.',
  },
  {
    icon: MapPin,
    title: 'Territory Allotment',
    description: 'Get your district or block confirmed based on availability.',
  },
  {
    icon: FileSignature,
    title: 'MOU & Payment',
    description: 'Sign the partnership agreement and complete the registration payment.',
  },
  {
    icon: Wrench,
    title: 'Site & Installation',
    description: 'Site verification, civil work and Mini Fuel Pump installation by AIVC.',
  },
  {
    icon: TrendingUp,
    title: 'Earn from Day 1',
    description: 'Start earning commissions on every litre dispensed across your network.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="container-default">
        <SectionHeader
          eyebrow="The Process"
          title="How It Works"
          description="A straightforward 5-step journey from application to earning."
        />

        <div className="relative">
          <div className="absolute left-1/2 top-12 hidden h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-300 to-transparent md:block" />

          <div className="grid gap-6 md:grid-cols-5">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4 grid h-20 w-20 place-items-center rounded-full bg-navy-900 text-gold-400 shadow-lg">
                      <Icon className="h-8 w-8" />
                      <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-gold-400 text-xs font-bold text-navy-950">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-navy-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-navy-600">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
