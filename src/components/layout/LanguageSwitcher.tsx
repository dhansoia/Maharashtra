'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हिं' },
  { code: 'mr', label: 'मरा' },
] as const

export function LanguageSwitcher({ className }: { className?: string }) {
  const [active, setActive] = useState<(typeof LANGS)[number]['code']>('en')
  return (
    <div className={cn('flex items-center gap-1 rounded-md border border-navy-200 px-2 py-1 text-xs', className)}>
      <Globe className="h-3.5 w-3.5 text-navy-500" />
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setActive(l.code)}
          className={cn(
            'rounded px-1.5 py-0.5 font-medium transition-colors',
            active === l.code ? 'bg-navy-900 text-white' : 'text-navy-600 hover:bg-navy-50',
          )}
          aria-label={`Switch to ${l.code}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
