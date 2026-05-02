'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Fuel } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/mini-fuel-pump', label: 'Mini Fuel Pump' },
  { href: '/business-opportunity', label: 'Business' },
  { href: '/district-partner', label: 'District Partner' },
  { href: '/pump-holder', label: 'Pump Holder' },
  { href: '/territory-map', label: 'Territory' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-default flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-navy-900">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-navy-900 text-gold-400">
            <Fuel className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">AIVC iFuel</span>
          <span className="text-gold-600">Maharashtra</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden md:flex" />
          <Link href="/login" className="hidden text-sm font-medium text-navy-700 hover:text-navy-900 md:inline">
            Login
          </Link>
          <Button asChild variant="gold" size="sm" className="hidden md:inline-flex">
            <Link href="/district-partner/apply">Apply Now</Link>
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-md text-navy-700 hover:bg-navy-50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'origin-top overflow-hidden border-t border-navy-100 bg-white transition-[max-height] duration-300 lg:hidden',
          open ? 'max-h-[600px]' : 'max-h-0',
        )}
      >
        <nav className="container-default flex flex-col gap-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-navy-100 pt-3">
            <LanguageSwitcher />
            <Link href="/login" className="text-sm font-medium text-navy-700">
              Partner Login
            </Link>
          </div>
          <Button asChild variant="gold" className="mt-3">
            <Link href="/district-partner/apply">Apply Now</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
