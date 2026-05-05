import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, MapPin, Shield, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/ui/section-header'
import { ContactStatePartnerCTA } from '@/components/shared/ContactStatePartnerCTA'

export const metadata: Metadata = {
  title: 'District Partner Programme',
  description:
    'Become an exclusive AIVC iFuel District Partner for a Maharashtra district — territory rights, initial pumps and recurring fuel commission.',
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
            Exclusive territory rights for one Maharashtra district, the first set of Mini Fuel Pumps, plus a
            pump-sale incentive on every additional pump and recurring commission on every litre dispensed.
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
            eyebrow="What You Get"
            title="Three Stacked Income Streams"
            description="District Partners benefit from one-time pump margin, ongoing pump-sale incentive, and recurring per-litre commission across every pump in their district."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <BenefitCard
              icon={Award}
              title="Pump Margin"
              description="One-time margin on the initial pumps you deploy as part of your District Partner allotment."
            />
            <BenefitCard
              icon={TrendingUp}
              title="Pump-Sale Incentive"
              description="A percentage incentive on every additional Pump Holder you onboard in your district, paid on sale."
              highlight
            />
            <BenefitCard
              icon={Users}
              title="Recurring Commission"
              description="A per-litre commission on every litre dispensed from any pump in your district — recurring monthly income."
            />
          </div>
          <div className="mt-12">
            <ContactStatePartnerCTA
              title="Want the exact figures?"
              description="Investment, pump pricing, commission rates and payback are shared one-on-one by the State Partner. Reach out and we'll walk you through the full economics for your district."
            />
          </div>
        </div>
      </section>

      <section className="bg-navy-50/40 py-16">
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
              title="Multi-year Returns"
              description="Stack one-time margin, pump-sale incentives and recurring commission for healthy long-term yields."
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
  { title: 'Diligence call & site briefing', description: 'Discussion on territory, financial readiness and rollout plan. The State Partner will walk you through investment & earnings here.' },
  { title: 'MOU & registration', description: 'Sign the partnership agreement and complete the registration formalities.' },
  { title: 'Pump procurement & site setup', description: 'Order initial pumps, identify Pump Holder candidates, civil work.' },
  { title: 'Go live', description: 'Commission pumps, start dispensing, begin earning commission.' },
]

function BenefitCard({
  title,
  description,
  icon: Icon,
  highlight,
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  highlight?: boolean
}) {
  return (
    <Card className={highlight ? 'border-gold-300 bg-gold-50/40' : ''}>
      <CardContent className="p-6">
        <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-navy-900 text-gold-400">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-lg font-semibold text-navy-900">{title}</h3>
        <p className="mt-2 text-sm text-navy-600">{description}</p>
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
