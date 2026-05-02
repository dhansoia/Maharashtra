import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Coins, IndianRupee, Layers, Shield } from 'lucide-react'
import { ROICalculator } from '@/components/calculators/ROICalculator'
import { SectionHeader } from '@/components/ui/section-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BUSINESS, formatINR } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Business Opportunity',
  description:
    'Detailed investment, earnings, ROI calculator and unit economics for AIVC iFuel Maharashtra District Partner and Pump Holder programmes.',
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
          <SectionHeader
            eyebrow="Why Now"
            title="Four Strong Reasons to Invest"
          />
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

      <ROICalculator />

      <section className="bg-navy-50/40 py-16">
        <div className="container-default">
          <SectionHeader
            eyebrow="Unit Economics"
            title="The Numbers Behind Every Pump"
            description="Single source of truth that powers all our calculations."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pump Costing</CardTitle>
              </CardHeader>
              <CardContent>
                <BreakdownTable
                  rows={[
                    ['Pump Base Price', formatINR(BUSINESS.PUMP_BASE)],
                    ['GST @ 18%', formatINR(BUSINESS.PUMP_BASE * BUSINESS.GST_RATE)],
                    ['MRP', formatINR(BUSINESS.PUMP_MRP)],
                    ['Discount @ 10% (for Partners)', `-${formatINR(BUSINESS.PUMP_BASE * BUSINESS.DISCOUNT)}`],
                    ['Discounted base', formatINR(BUSINESS.PUMP_BASE * (1 - BUSINESS.DISCOUNT))],
                    ['Discounted base + GST', formatINR(BUSINESS.PUMP_DISCOUNTED)],
                    ['Margin per pump', formatINR(BUSINESS.PUMP_MARGIN)],
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fuel Commission Split (per litre)</CardTitle>
              </CardHeader>
              <CardContent>
                <BreakdownTable
                  rows={[
                    ['Pump Holder', `₹${BUSINESS.FUEL_COMMISSION.PUMP_HOLDER.toFixed(2)}`],
                    ['District Partner', `₹${BUSINESS.FUEL_COMMISSION.DISTRICT.toFixed(2)}`],
                    ['State Partner', `₹${BUSINESS.FUEL_COMMISSION.STATE.toFixed(2)}`],
                    ['AIVC National', `₹${BUSINESS.FUEL_COMMISSION.NATIONAL.toFixed(2)}`],
                    ['Total', `₹${BUSINESS.FUEL_COMMISSION.TOTAL.toFixed(2)}`],
                  ]}
                />
              </CardContent>
            </Card>
          </div>
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
    title: 'High Recurring Income',
    description: '₹0.40-₹2.50 per litre commission across 30-480 pumps — true passive income, not a one-time sale.',
  },
  {
    icon: Layers,
    title: 'Multiple Revenue Streams',
    description: 'Pump margin, 10% sale incentive, monthly fuel commission and territory exclusivity — stack them all.',
  },
  {
    icon: Shield,
    title: 'AIVC + iFuel Backed',
    description: 'Operational support, branding, training, fuel logistics and compliance handled by national network.',
  },
  {
    icon: Coins,
    title: '~3 Year Payback',
    description: 'District Partner payback under 3 years; Pump Holder under 5. Healthy margins thereafter.',
  },
]

function BreakdownTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full text-sm">
      <tbody className="divide-y divide-navy-100">
        {rows.map(([label, value], i) => {
          const isLast = i === rows.length - 1
          return (
            <tr key={label}>
              <td className={`px-2 py-3 text-navy-700 ${isLast ? 'font-semibold' : ''}`}>{label}</td>
              <td className={`px-2 py-3 text-right font-mono ${isLast ? 'font-bold text-gold-700' : 'text-navy-900'}`}>
                {value}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
