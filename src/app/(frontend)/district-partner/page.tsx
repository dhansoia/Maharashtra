import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, MapPin, Shield, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeader } from '@/components/ui/section-header'
import { BUSINESS, formatINR } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'District Partner Programme',
  description:
    'Become an exclusive AIVC iFuel District Partner for Maharashtra. ₹1.02 Cr investment for territory rights + 6 pumps + 10% incentive on every additional pump.',
}

export default function DistrictPartnerPage() {
  return (
    <>
      <section className="gradient-hero py-16 text-white">
        <div className="container-default">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-300">
            District Partner Programme
          </p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Build a <span className="gold-text">Fuel Empire</span> in Your District
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-navy-200">
            Exclusive territory rights for one Maharashtra district, the first six Mini Fuel Pumps, plus a 10%
            incentive on every additional pump and ₹0.40 commission on every litre dispensed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <Link href="/district-partner/apply">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-navy-900 hover:bg-gold-100">
              <Link href="/territory-map">Check District Availability</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default">
          <SectionHeader
            eyebrow="Investment Breakdown"
            title="₹1,02,76,000 Total"
            description="Transparent costing — no hidden fees, no recurring royalties."
          />
          <Card className="mx-auto max-w-3xl">
            <CardContent className="p-6">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-navy-100">
                  <tr>
                    <td className="px-2 py-3 text-navy-700">Registration Fee (one-time)</td>
                    <td className="px-2 py-3 text-right font-mono">{formatINR(BUSINESS.DISTRICT_REG)}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3 pl-6 text-navy-500">↳ State Partner share</td>
                    <td className="px-2 py-3 text-right font-mono text-navy-500">
                      {formatINR(BUSINESS.DISTRICT_REG_STATE_SHARE)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3 pl-6 text-navy-500">↳ AIVC National share</td>
                    <td className="px-2 py-3 text-right font-mono text-navy-500">
                      {formatINR(BUSINESS.DISTRICT_REG_AIVC_SHARE)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3 text-navy-700">
                      6 Mini Fuel Pumps × {formatINR(BUSINESS.PUMP_DISCOUNTED)} (discounted)
                    </td>
                    <td className="px-2 py-3 text-right font-mono">
                      {formatINR(BUSINESS.DISTRICT_PUMPS * BUSINESS.PUMP_DISCOUNTED)}
                    </td>
                  </tr>
                  <tr className="bg-gold-50">
                    <td className="px-2 py-4 font-semibold text-navy-900">Total Investment</td>
                    <td className="px-2 py-4 text-right font-mono text-xl font-bold text-gold-700">
                      {formatINR(BUSINESS.DISTRICT_TOTAL)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-navy-50/40 py-16">
        <div className="container-default">
          <SectionHeader
            eyebrow="Earnings"
            title="Three Income Streams Stack Up"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <EarningsCard
              title="One-Time"
              amount={formatINR(BUSINESS.DISTRICT_PUMPS * BUSINESS.PUMP_MARGIN)}
              description="Margin on your first 6 pumps (₹1,20,000 × 6)"
              icon={Award}
            />
            <EarningsCard
              title="10% Incentive"
              amount={formatINR(34 * BUSINESS.INCENTIVE_PER_PUMP)}
              description="On 34 additional pumps (40 target − 6 own)"
              icon={TrendingUp}
              highlight
            />
            <EarningsCard
              title="Recurring Yearly"
              amount={formatINR(
                BUSINESS.DISTRICT_TOTAL_PUMPS * BUSINESS.LITRES_PER_MONTH * BUSINESS.FUEL_COMMISSION.DISTRICT * 12,
              )}
              description="₹0.40/L × 40 pumps × 10,000L × 12 months"
              icon={Users}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default">
          <SectionHeader eyebrow="Application Flow" title="Six Steps to Becoming a District Partner" />
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

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <FeaturePill
              icon={MapPin}
              title="Exclusive Territory"
              description="Lock one of Maharashtra's 36 districts on a first-come-first-served basis."
            />
            <FeaturePill
              icon={Shield}
              title="Comprehensive MOU"
              description="Legally binding partnership with AIVC and the State Partner."
            />
            <FeaturePill
              icon={TrendingUp}
              title="Payback < 3 Years"
              description="With 40 pumps online, recovery in 28-32 months is realistic."
            />
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white">
        <div className="container-default text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Ready to claim your district?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-navy-200">
            Submit your application online — our team will revert within 3 working days with availability and next steps.
          </p>
          <Button asChild variant="gold" size="xl" className="mt-6">
            <Link href="/district-partner/apply">
              Start Application <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

const STEPS = [
  { title: 'Submit application online', description: 'Personal & business details, district preference, documents.' },
  { title: 'Initial screening', description: 'Our team reviews credentials and confirms district availability.' },
  { title: 'Diligence call & site briefing', description: 'Discussion on territory, financial readiness and rollout plan.' },
  { title: 'MOU & registration payment', description: 'Sign agreement, pay ₹25 lakh registration fee.' },
  { title: 'Pump procurement & site setup', description: 'Order 6 pumps, identify Pump Holder candidates, civil work.' },
  { title: 'Go live', description: 'Commission pumps, start dispensing, begin earning commission.' },
]

function EarningsCard({
  title,
  amount,
  description,
  icon: Icon,
  highlight,
}: {
  title: string
  amount: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  highlight?: boolean
}) {
  return (
    <Card className={highlight ? 'border-gold-300 bg-gold-50/40' : ''}>
      <CardHeader>
        <div className="mb-2 grid h-10 w-10 place-items-center rounded-lg bg-navy-900 text-gold-400">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle>{title}</CardTitle>
        <p className="font-display text-3xl font-bold text-gold-700">{amount}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-navy-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function FeaturePill({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-navy-100 bg-white p-5">
      <div className="mb-2 grid h-10 w-10 place-items-center rounded-lg bg-gold-100 text-gold-700">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display text-base font-semibold text-navy-900">{title}</h3>
      <p className="mt-1 text-sm text-navy-600">{description}</p>
    </div>
  )
}
