'use client'

import Link from 'next/link'
import { Check, Crown, Building2, Fuel } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'
import { BUSINESS, formatINR } from '@/lib/constants'
import { cn } from '@/lib/utils'

const TIERS = [
  {
    icon: Building2,
    name: 'State Partner',
    investment: BUSINESS.STATE_TOTAL,
    pumps: `${BUSINESS.STATE_PUMPS} pumps + 12 districts`,
    features: [
      'Exclusive Maharashtra rights',
      'Recruit 12+ District Partners',
      '₹0.30/L on every Maharashtra litre',
      'Share of district registration fees',
      'Master MOU with AIVC',
    ],
    cta: { href: '/about', label: 'Learn About State Partner' },
    accent: 'navy' as const,
  },
  {
    icon: Crown,
    name: 'District Partner',
    investment: BUSINESS.DISTRICT_TOTAL,
    pumps: `${BUSINESS.DISTRICT_PUMPS} pumps + district rights`,
    features: [
      'Exclusive district / block territory',
      'Recruit 40+ Pump Holders',
      '10% incentive on each new pump',
      '₹0.40/L on every district litre',
      'District-level branding',
    ],
    cta: { href: '/district-partner/apply', label: 'Apply as District Partner' },
    accent: 'gold' as const,
    popular: true,
  },
  {
    icon: Fuel,
    name: 'Pump Holder',
    investment: BUSINESS.PUMP_MRP,
    pumps: '1 mini fuel pump',
    features: [
      'Run your own neighbourhood fuel pump',
      '₹2.50/L commission on every litre',
      '~₹25,000/month at 10,000 L',
      'Operational support from AIVC',
      'Full installation & training',
    ],
    cta: { href: '/pump-holder/apply', label: 'Apply for Pump Allotment' },
    accent: 'forest' as const,
  },
]

export function PartnerTiers() {
  return (
    <section className="bg-navy-50/40 py-20">
      <div className="container-default">
        <SectionHeader
          eyebrow="Partnership Models"
          title="Choose Your Path"
          description="Three investment tiers designed for different ambitions, capital and risk appetite."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const Icon = tier.icon
            return (
              <Card
                key={tier.name}
                className={cn(
                  'relative flex flex-col transition-transform hover:-translate-y-1',
                  tier.popular && 'border-2 border-gold-400 shadow-lg',
                )}
              >
                {tier.popular ? (
                  <Badge variant="gold" className="absolute -top-3 right-6">
                    MOST POPULAR
                  </Badge>
                ) : null}
                <CardHeader>
                  <div
                    className={cn(
                      'mb-4 grid h-12 w-12 place-items-center rounded-lg',
                      tier.accent === 'navy' && 'bg-navy-900 text-gold-400',
                      tier.accent === 'gold' && 'bg-gold-400 text-navy-950',
                      tier.accent === 'forest' && 'bg-forest-600 text-white',
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{tier.name}</CardTitle>
                  <p className="text-sm text-navy-600">{tier.pumps}</p>
                  <p className="mt-3 font-display text-3xl font-bold text-navy-900">
                    {formatINR(tier.investment, { compact: true })}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-navy-500">Total Investment</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-2 text-sm text-navy-700">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={tier.popular ? 'gold' : 'default'}
                    className="mt-6 w-full"
                  >
                    <Link href={tier.cta.href}>{tier.cta.label}</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
