import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Fuel } from 'lucide-react'
import { SITE } from '@/lib/constants'

const QUICK_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/about-aivc-ifuel', label: 'AIVC × iFuel' },
  { href: '/mini-fuel-pump', label: 'Mini Fuel Pump' },
  { href: '/business-opportunity', label: 'Business Opportunity' },
  { href: '/territory-map', label: 'Territory Map' },
]

const PROGRAMME_LINKS = [
  { href: '/district-partner', label: 'District Partner Programme' },
  { href: '/district-partner/apply', label: 'Apply as District Partner' },
  { href: '/pump-holder', label: 'Pump Holder Programme' },
  { href: '/pump-holder/apply', label: 'Apply for Pump Allotment' },
  { href: '/login', label: 'Partner Login' },
]

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-default py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-white">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-gold-400 text-navy-950">
                <Fuel className="h-5 w-5" />
              </span>
              AIVC iFuel <span className="text-gold-400">Maharashtra</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-navy-300">
              Official AIVC × iFuel State Partner for Maharashtra. Pioneering rural & semi-urban fuel access through
              the Mini Fuel Pump network across all 36 districts.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <span>{SITE.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-gold-400" />
                <a href={`tel:${SITE.phone}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-gold-400" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <SocialIcon href={SITE.social.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={SITE.social.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={SITE.social.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={SITE.social.youtube} label="YouTube">
                <Youtube className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <FooterColumn title="Quick Links" links={QUICK_LINKS} className="lg:col-span-3" />
          <FooterColumn title="Programmes" links={PROGRAMME_LINKS} className="lg:col-span-3" />
          <FooterColumn title="Resources" links={LEGAL_LINKS} className="lg:col-span-2" />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-navy-800 pt-6 text-xs text-navy-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            Built by{' '}
            <a href="https://ndsg.in" className="text-gold-400 hover:underline">
              NDSG Associates
            </a>{' '}
            ·{' '}
            <a href="https://dhansoia.com" className="text-gold-400 hover:underline">
              dhansoia.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string
  links: { href: string; label: string }[]
  className?: string
}) {
  return (
    <div className={className}>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-navy-300 transition-colors hover:text-gold-400">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-9 w-9 place-items-center rounded-full border border-navy-700 text-navy-200 transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-navy-950"
    >
      {children}
    </a>
  )
}
