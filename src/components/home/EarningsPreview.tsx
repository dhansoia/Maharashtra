import { SectionHeader } from '@/components/ui/section-header'
import { ContactStatePartnerCTA } from '@/components/shared/ContactStatePartnerCTA'

export function EarningsPreview() {
  return (
    <section className="bg-white py-20">
      <div className="container-default">
        <SectionHeader
          eyebrow="Earnings"
          title="Three stacked income streams"
          description="Pump margin, pump-sale incentive and recurring fuel commission combine into a healthy multi-year return — the exact figures depend on the tier and rollout pace."
        />
        <ContactStatePartnerCTA className="mx-auto max-w-4xl" />
      </div>
    </section>
  )
}
