import { Activity, Coins, Fuel, ClipboardList } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatINR } from '@/lib/constants'

interface Stats {
  totalPumps: number
  activePumps: number
  monthlyCommission: number
  pendingApplications: number
}

export function StatsCards({ stats }: { stats: Stats }) {
  const cards = [
    { icon: Fuel, label: 'Total Pumps Allotted', value: stats.totalPumps.toString() },
    { icon: Activity, label: 'Active Pumps', value: stats.activePumps.toString() },
    { icon: Coins, label: 'Monthly Commission', value: formatINR(stats.monthlyCommission) },
    { icon: ClipboardList, label: 'Pending Applications', value: stats.pendingApplications.toString() },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <Card key={c.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-navy-500">
                <Icon className="h-4 w-4" />
                <p className="text-xs font-medium uppercase tracking-wider">{c.label}</p>
              </div>
              <p className="mt-2 font-display text-2xl font-bold text-navy-900">{c.value}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
