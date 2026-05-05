import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildWhatsAppLink } from '@/lib/whatsapp'

export function CTASection() {
  return (
    <section className="gradient-hero py-20 text-white">
      <div className="container-default text-center">
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Ready to <span className="gold-text">Start Earning?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-100">
          Whichever tier suits your ambition, the Maharashtra fuel revolution has a place for you. Apply
          today, lock your district, and start earning from day one. Investment & earnings shared on a call.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold" size="xl">
            <Link href="/district-partner/apply">
              Apply as District Partner <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="xl" className="bg-white text-navy-900 hover:bg-gold-100">
            <Link href="/pump-holder/apply">Apply for Pump Allotment</Link>
          </Button>
          <Button asChild size="xl" className="bg-[#25D366] text-white hover:bg-[#1cb858]">
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
