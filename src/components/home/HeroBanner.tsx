'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Fuel, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroBanner() {
  return (
    <section className="gradient-hero relative overflow-hidden text-white">
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gold-400 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-forest-500 blur-3xl" />
      </div>

      <div className="container-default relative grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-gold-300 backdrop-blur"
          >
            <Award className="h-3.5 w-3.5" />
            Official AIVC × iFuel State Partner — Maharashtra
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          >
            Maharashtra's <span className="gold-text">Fuel Revolution</span> Starts Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-2xl text-lg text-navy-100 md:text-xl"
          >
            Join India's most progressive distributed-fuel network. Become a District Partner and build a fuel
            empire across your district, or start your own neighbourhood Mini Fuel Pump.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild variant="gold" size="xl">
              <Link href="/district-partner/apply">
                Become a District Partner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="xl" className="bg-white text-navy-900 hover:bg-gold-100">
              <Link href="/pump-holder/apply">
                Get a Mini Pump <Fuel className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-navy-200"
          >
            <div>
              <p className="font-display text-2xl font-bold text-white">36</p>
              <p>Districts</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <p className="font-display text-2xl font-bold text-white">5</p>
              <p>Regions</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <p className="font-display text-2xl font-bold text-white">3</p>
              <p>Partner Tiers</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:col-span-5 lg:block"
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="absolute -top-3 left-6 rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950">
              QUICK SUMMARY
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold">Three Ways to Partner</h3>
            <div className="mt-5 space-y-4">
              <PartnerSummary
                tier="State Partner"
                pumps="District network + state-wide rights"
              />
              <PartnerSummary
                tier="District Partner"
                pumps="Initial pumps + district rights"
              />
              <PartnerSummary tier="Pump Holder" pumps="Single Mini Fuel Pump" />
            </div>
            <p className="mt-5 rounded-md bg-white/10 px-3 py-2 text-xs text-navy-100">
              Investment & earnings shared on a one-on-one call. {' '}
              <a href="/contact" className="font-semibold text-gold-300 underline">
                Contact the State Partner
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PartnerSummary({ tier, pumps }: { tier: string; pumps: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
      <div>
        <p className="text-sm font-semibold text-white">{tier}</p>
        <p className="text-xs text-navy-200">{pumps}</p>
      </div>
    </div>
  )
}
