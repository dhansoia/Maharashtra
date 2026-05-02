import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Coins, Home, Lightbulb, Truck, Wrench, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeader } from '@/components/ui/section-header'
import { BUSINESS, formatINR } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Mini Fuel Pump Holder Programme',
  description:
    'Start your own neighbourhood fuel business with a Mini Fuel Pump. ₹14.16 L investment, ₹2.50/L commission, ~₹25,000/month income at 10,000 L.',
}

export default function PumpHolderPage() {
  const monthly = BUSINESS.LITRES_PER_MONTH * BUSINESS.FUEL_COMMISSION.PUMP_HOLDER

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
            Own a Mini Fuel Pump on your land. Earn ₹2.50 commission on every litre dispensed — that's ~₹25,000
            recurring income per month at 10,000 L.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <Link href="/pump-holder/apply">
                Apply for Allotment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-navy-900 hover:bg-gold-100">
              <Link href="/business-opportunity#roi">Calculate Earnings</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default">
          <SectionHeader eyebrow="Investment" title="Single, Transparent Cost" />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <StatCardLarge label="Pump MRP" value={formatINR(BUSINESS.PUMP_MRP)} sub="(₹12 L + 18% GST)" />
            <StatCardLarge label="Monthly Income" value={formatINR(monthly)} sub="@ 10,000 L/month" highlight />
            <StatCardLarge
              label="Annual Income"
              value={formatINR(monthly * 12)}
              sub="Pure recurring commission"
            />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-navy-500">
            Civil work (foundation, canopy, wiring) is borne separately by the applicant. Estimated ₹1.5–₹2.5 lakh
            depending on site readiness.
          </p>
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
  { title: 'Document verification', description: 'KYC, land papers, bank details validated by AIVC team.' },
  { title: 'Site verification', description: 'Physical site visit by AIVC technical team for pump suitability.' },
  { title: 'Approval & MOU', description: 'Allotment letter issued, MOU signed, payment instructions shared.' },
  { title: 'Civil work + installation', description: 'Applicant completes civil work; AIVC installs pump.' },
  { title: 'Commissioning & training', description: 'Test-run, operator training and go-live with billing system.' },
]

function StatCardLarge({
  label,
  value,
  sub,
  highlight,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <Card className={highlight ? 'border-gold-300 bg-gold-50/40' : ''}>
      <CardHeader>
        <p className="text-xs font-medium uppercase tracking-widest text-navy-500">{label}</p>
        <p className={`font-display text-3xl font-bold ${highlight ? 'text-gold-700' : 'text-navy-900'}`}>{value}</p>
        {sub ? <p className="mt-1 text-sm text-navy-500">{sub}</p> : null}
      </CardHeader>
    </Card>
  )
}
