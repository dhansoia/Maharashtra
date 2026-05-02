import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/section-header'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About AIVC iFuel Maharashtra — the State Partner organisation pioneering distributed fuel access.',
}

export default function AboutPage() {
  return (
    <>
      <section className="gradient-hero py-16 text-white">
        <div className="container-default">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-300">About Us</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Building <span className="gold-text">Maharashtra's</span> Fuel Backbone
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-navy-200">
            We're the official AIVC × iFuel State Partner for Maharashtra, founded by Mr. Neeraj Goel — a Pvt. Ltd.
            company purpose-built to roll out the Mini Fuel Pump network across all 36 districts.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-default">
          <SectionHeader
            eyebrow="Our Mission"
            title="Fuel access for every village, every farm, every market"
            description="Reduce travel, reduce cost, reduce carbon — make legal, branded fuel available within 5 km of every Maharashtra resident."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <Pillar
              title="Distributed Network"
              description="480+ Mini Fuel Pumps across districts and blocks, owned & operated by local entrepreneurs."
            />
            <Pillar
              title="Local Ownership"
              description="Every pump and every district is owned by people who live there — wealth stays in the community."
            />
            <Pillar
              title="National Backing"
              description="Operating under AIVC's national framework with iFuel's tested logistics and compliance stack."
            />
          </div>
        </div>
      </section>

      <section className="bg-navy-50/40 py-16">
        <div className="container-default">
          <SectionHeader eyebrow="Leadership" title="Founder & State Partner" />
          <Card className="mx-auto max-w-3xl">
            <CardContent className="grid gap-6 p-6 md:grid-cols-3 md:p-8">
              <div className="grid h-32 w-32 place-items-center rounded-full bg-navy-900 font-display text-3xl font-bold text-gold-400 md:h-40 md:w-40">
                NG
              </div>
              <div className="md:col-span-2">
                <h3 className="font-display text-2xl font-bold text-navy-900">Mr. Neeraj Goel</h3>
                <p className="text-sm text-gold-700">Founder & State Partner — Maharashtra</p>
                <p className="mt-3 text-sm text-navy-700">
                  Veteran entrepreneur with two decades of cross-industry experience. Established the Maharashtra
                  Pvt. Ltd. company with an exclusive State Partner agreement to roll out AIVC iFuel's Mini Fuel
                  Pump network in the state.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

function Pillar({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-display text-lg font-semibold text-navy-900">{title}</h3>
        <p className="mt-2 text-sm text-navy-600">{description}</p>
      </CardContent>
    </Card>
  )
}
