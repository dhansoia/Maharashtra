import type { Metadata } from 'next'
import { CheckCircle2, Gauge, Shield, Smartphone, Wrench } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'What is a Mini Fuel Pump?',
  description: 'Everything about the AIVC iFuel Mini Fuel Pump — capacity, compliance, technology and operations.',
}

export default function MiniFuelPumpPage() {
  return (
    <>
      <section className="gradient-hero py-16 text-white">
        <div className="container-default">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-300">Product</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            The <span className="gold-text">Mini Fuel Pump</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-navy-200">
            Compact, compliant, tech-enabled — designed for rural & semi-urban India. Compare it to a traditional
            petrol pump in 1/100th the footprint.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default">
          <SectionHeader title="Specifications & Features" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={Gauge}
              title="Dispenses Diesel & Petrol"
              description="Branded fuel from authorised supply chain. Up to 5,000-15,000 L throughput per month."
            />
            <Feature
              icon={Shield}
              title="Fully Compliant"
              description="Approved under PESO and state regulations. Designed to meet all safety norms."
            />
            <Feature
              icon={Smartphone}
              title="Tech-Enabled"
              description="Live billing app, SMS receipts, daily reconciliation dashboard for the Pump Holder."
            />
            <Feature
              icon={Wrench}
              title="Easy to Maintain"
              description="Modular hardware, AMC by AIVC. Pump Holder only handles day-to-day operations."
            />
            <Feature
              icon={CheckCircle2}
              title="Calibrated & Sealed"
              description="State-level Legal Metrology calibration; tamper-proof seals."
            />
            <Feature
              icon={Gauge}
              title="Compact Footprint"
              description="Fits in 20×20 ft. Canopy, pump, control panel and storage tank — all in a small plot."
            />
          </div>
        </div>
      </section>

      <section className="bg-navy-50/40 py-16">
        <div className="container-default">
          <SectionHeader
            eyebrow="Investment"
            title="What's included in ₹14,16,000?"
            description="Your one-time payment covers everything except site civil work and operating capital."
          />
          <Card className="mx-auto max-w-3xl">
            <CardContent className="p-6">
              <ul className="space-y-3 text-sm text-navy-700">
                <ListItem>Mini Fuel Pump unit (dispenser + tank + control)</ListItem>
                <ListItem>18% GST</ListItem>
                <ListItem>Installation & commissioning by AIVC engineers</ListItem>
                <ListItem>Operator training (7 days)</ListItem>
                <ListItem>Branding kit & signage</ListItem>
                <ListItem>POS, billing software, mobile app integration</ListItem>
                <ListItem>1-year hardware warranty</ListItem>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-3 grid h-11 w-11 place-items-center rounded-lg bg-gold-100 text-gold-700">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-base font-semibold text-navy-900">{title}</h3>
        <p className="mt-1.5 text-sm text-navy-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 border-b border-navy-100 pb-3 last:border-0 last:pb-0">
      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-600" />
      <span>{children}</span>
    </li>
  )
}
