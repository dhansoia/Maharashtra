import type { Metadata } from 'next'
import { MaharashtraMap } from '@/components/maps/MaharashtraMap'
import { SectionHeader } from '@/components/ui/section-header'

export const metadata: Metadata = {
  title: 'Territory Map',
  description:
    'Live territory map of Maharashtra showing District Partner availability across all 36 districts.',
}

export default function TerritoryMapPage() {
  return (
    <>
      <section className="bg-navy-50/40 py-10">
        <div className="container-default text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">
            Territory Map
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Maharashtra District Availability
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-navy-600">
            Green = Available · Amber = Reserved · Red = Allotted. First-come-first-served.
          </p>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container-default">
          <SectionHeader
            eyebrow="Live View"
            title="Pick Your District"
            description="Click any district to view current status, target pumps and partner details."
          />
          <MaharashtraMap />
        </div>
      </section>
    </>
  )
}
