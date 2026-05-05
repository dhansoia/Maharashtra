import Link from 'next/link'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/constants'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

interface ContactStatePartnerCTAProps {
  title?: string
  description?: string
  variant?: 'default' | 'compact'
  className?: string
}

export function ContactStatePartnerCTA({
  title = 'Want to know the numbers?',
  description = 'Investment, commissions and earnings are shared one-on-one by the State Partner. Reach out and we will walk you through the full economics.',
  variant = 'default',
  className,
}: ContactStatePartnerCTAProps) {
  if (variant === 'compact') {
    return (
      <Card className={cn('border-gold-300 bg-gold-50/50', className)}>
        <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base font-semibold text-navy-900">{title}</p>
            <p className="text-sm text-navy-700">{description}</p>
          </div>
          <Button asChild variant="gold">
            <Link href="/contact">Contact State Partner</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('border-gold-300 bg-gold-50/50', className)}>
      <CardContent className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">
            Investment & Earnings
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-navy-900">{title}</h3>
          <p className="mt-3 text-sm text-navy-700">{description}</p>
        </div>
        <div className="space-y-3">
          <Button asChild variant="gold" size="lg" className="w-full justify-start">
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" /> Email the State Partner
            </Link>
          </Button>
          <Button asChild size="lg" className="w-full justify-start bg-[#25D366] text-white hover:bg-[#1cb858]">
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full justify-start">
            <a href={`tel:${SITE.phone}`}>
              <Phone className="mr-2 h-4 w-4" /> {SITE.phone}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
