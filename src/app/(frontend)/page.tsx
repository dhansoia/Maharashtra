import { HeroBanner } from '@/components/home/HeroBanner'
import { StatsCounter } from '@/components/home/StatsCounter'
import { HowItWorks } from '@/components/home/HowItWorks'
import { PartnerTiers } from '@/components/home/PartnerTiers'
import { EarningsPreview } from '@/components/home/EarningsPreview'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'
import { CTASection } from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatsCounter />
      <HowItWorks />
      <PartnerTiers />
      <EarningsPreview />
      <TestimonialCarousel />
      <CTASection />
    </>
  )
}
