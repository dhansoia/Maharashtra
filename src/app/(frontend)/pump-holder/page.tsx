import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Coins, Home, Lightbulb, Truck, Wrench, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/ui/section-header'
import { ContactStatePartnerCTA } from '@/components/shared/ContactStatePartnerCTA'

export const metadata: Metadata = {
  title: 'Mini Fuel Pump Holder Programme',
  description:
    'Start your own neighbourhood fuel business with an AIVC iFuel Mini Fuel Pump. Recurring commission on every litre dispensed.',
}

export default function PumpHolderPage() {
  return (
    <>
      <section className="gradient-hero py-16 text-white">
        <div className="container-default">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-300">
            Pump Holder Programme
          </p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Start Your Own <span className="gold-text">Fuel Business</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-navy-200">
            Own a Mini Fuel Pump on your land. Earn a recurring commission on every litre you dispense — built
            for rural and semi-urban Maharashtra.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <Link href="/pump-holder/apply">
                Apply for Allotment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-navy-900 hover:bg-gold-100">
              <Link href="/contact">Talk to State Partner</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default">
          <SectionHeader
            eyebrow="What's Included"
            title="A Complete Pump-in-a-Box Programme"
            description="A single onboarding covers the pump, installation, training, branding and digital billing — civil work and operating capital are arranged by the applicant."
          />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <BenefitCard title="Mini Fuel Pump" description="Dispenser unit, tank and control panel, delivered & installed by AIVC." />
            <BenefitCard title="Operator Training" description="A week of hands-on training covering safe dispensing, billing and reconciliation." />
            <BenefitCard title="Branding & Tech" description="Signage kit, POS system and the iFuel mobile app for receipts & dashboards." />
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <ContactStatePartnerCTA
              title="What's the investment?"
              description="The pump price, applicable taxes, civil-work estimate and the per-litre commission are shared one-on-one by the State Partner. Reach out and we'll walk you through the full picture."
            />
          </div>
        </div>
      </section>

      <section className="bg-navy-50/40 py-16">
        <div className="container-default">
          <SectionHeader
            eyebrow="Site Requirements"
            title="What You Need on Your Land"
            description="A simple checklist to confirm your land is suitable for pump installation."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REQUIREMENTS.map((r) => {
              const Icon = r.icon
              return (
                <Card key={r.title}>
                  <CardContent className="p-5">
                    <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-gold-100 text-gold-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-navy-900">{r.title}</h3>
                    <p className="mt-1 text-sm text-navy-600">{r.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default">
          <SectionHeader eyebrow="Application Flow" title="From Application to Live Pump" />
          <ol className="mx-auto max-w-3xl space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-lg border border-navy-100 bg-white p-4">
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-navy-900 font-bold text-gold-400">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-navy-900">{s.title}</h3>
                  <p className="text-sm text-navy-600">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white">
        <div className="container-default text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Apply for Pump Allotment Today
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-navy-200">
            Site verification within 2 weeks. Pump installation within 30 days of approval.
          </p>
          <Button asChild variant="gold" size="xl" className="mt-6">
            <Link href="/pump-holder/apply">
              Start Application <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

const REQUIREMENTS = [
  { icon: Home, title: 'Min 20×20 ft area', description: 'Flat, accessible plot for pump, canopy and vehicle movement.' },
  { icon: Truck, title: 'Road / Highway access', description: 'Direct access to a motorable road or near a highway.' },
  { icon: Zap, title: 'Electricity', description: 'Single or three-phase power; can be arranged if not present.' },
  { icon: Lightbulb, title: 'Distance from nearest fuel station', description: 'Minimum 1 km from existing pumps preferred.' },
  { icon: Wrench, title: 'Civil work readiness', description: 'Foundation, drainage and pump-room construction by applicant.' },
  { icon: Coins, title: 'Land ownership / lease', description: 'Own land, family-owned or long-term leased land.' },
]

const STEPS = [
  { title: 'Submit online application', description: 'Personal details, land details, documents and site photos.' },
  { title: 'Document verification', description: 'KYC, land papers, bank details validated by the AIVC team.' },
  { title: 'Site verification', description: 'Physical site visit by AIVC technical team for pump suitability.' },
  { title: 'Approval & MOU', description: 'Allotment letter issued, MOU signed, payment instructions shared.' },
  { title: 'Civil work + installation', description: 'Applicant completes civil work; AIVC installs the pump.' },
  { title: 'Commissioning & training', description: 'Test-run, operator training and go-live with billing system.' },
]

function BenefitCard({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-display text-base font-semibold text-navy-900">{title}</h3>
        <p className="mt-2 text-sm text-navy-600">{description}</p>
      </CardContent>
    </Card>
  )
}
