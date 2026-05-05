import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Coins, IndianRupee, Layers, Shield } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ContactStatePartnerCTA } from '@/components/shared/ContactStatePartnerCTA'

export const metadata: Metadata = {
  title: 'Business Opportunity',
  description:
    'Why the AIVC iFuel Maharashtra programme is the right time to enter India\'s distributed-fuel network.',
}

export default function BusinessOpportunityPage() {
  return (
    <>
      <section className="gradient-hero py-16 text-white">
        <div className="container-default">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-300">
            Business Opportunity
          </p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            A Distributed Fuel Network — <span className="gold-text">Built for Maharashtra</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-navy-200">
            India's diesel & petrol distribution is shifting from monolithic stations to a smarter, distributed
            mini-pump network. Get in early as a District Partner or Pump Holder.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default">
          <SectionHeader eyebrow="Why Now" title="Four Strong Reasons to Invest" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHY_REASONS.map((r) => {
              const Icon = r.icon
              return (
                <Card key={r.title}>
                  <CardContent className="p-6">
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-lg bg-gold-100 text-gold-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-navy-900">{r.title}</h3>
                    <p className="mt-2 text-sm text-navy-600">{r.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy-50/40 py-16">
        <div className="container-default">
          <SectionHeader
            eyebrow="Investment & Earnings"
            title="The numbers we share over a call"
            description="We deliberately don't publish investment, commission or earnings figures online. The State Partner walks every prospective partner through them in detail, tailored to your district and tier."
          />
          <ContactStatePartnerCTA className="mx-auto max-w-4xl" />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900">
            Ready to lock your district?
          </h2>
          <p className="mt-3 text-navy-600">Pre-launch territories are filling fast — first come, first served.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link href="/district-partner/apply">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="/territory-map">View Territory Map</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

const WHY_REASONS = [
  {
    icon: IndianRupee,
    title: 'Recurring Fuel Commission',
    description: 'Every litre dispensed across your network earns you a per-litre commission — true passive income, not a one-time sale.',
  },
  {
    icon: Layers,
    title: 'Multiple Revenue Streams',
    description: 'Pump margin, pump-sale incentive, monthly fuel commission and territory exclusivity stack together.',
  },
  {
    icon: Shield,
    title: 'AIVC + iFuel Backed',
    description: 'Operational support, branding, training, fuel logistics and compliance handled by the national network.',
  },
  {
    icon: Coins,
    title: 'Healthy Payback',
    description: 'Tiers are designed for a reasonable payback period and strong long-term returns. Exact figures shared on call.',
  },
]
