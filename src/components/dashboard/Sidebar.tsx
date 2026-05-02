'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Fuel,
  LayoutDashboard,
  Activity,
  Coins,
  FileText,
  ClipboardCheck,
  UserCircle,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/my-pumps', label: 'My Pumps', icon: Activity },
  { href: '/commissions', label: 'Commissions', icon: Coins },
  { href: '/applications', label: 'Submit Applications', icon: ClipboardCheck },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/profile', label: 'Profile', icon: UserCircle },
]

export function Sidebar() {
  const path = usePathname()
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-navy-100 bg-white lg:block">
      <div className="flex h-16 items-center border-b border-navy-100 px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-display text-base font-bold text-navy-900">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-navy-900 text-gold-400">
            <Fuel className="h-4 w-4" />
          </span>
          Partner Console
        </Link>
      </div>
      <nav className="px-3 py-4">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const active = path === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-navy-50',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
        <div className="my-4 border-t border-navy-100" />
        <Link
          href="/api/users/logout?redirect=/login"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-navy-700 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </Link>
      </nav>
    </aside>
  )
}
