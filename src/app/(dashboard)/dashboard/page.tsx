import { StatsCards } from '@/components/dashboard/StatsCards'
import { CommissionChart } from '@/components/dashboard/CommissionChart'
import { PumpTable } from '@/components/dashboard/PumpTable'

const SAMPLE_PUMPS = [
  { serial: 'MFP-PUN-001', location: 'Pune Rural, NH-65', block: 'Haveli', status: 'Live' as const, installedDate: '2025-09-12', monthlyLitres: 11200 },
  { serial: 'MFP-PUN-002', location: 'Maval Junction', block: 'Maval', status: 'Live' as const, installedDate: '2025-10-01', monthlyLitres: 9800 },
  { serial: 'MFP-PUN-003', location: 'Bhor Bypass', block: 'Bhor', status: 'Installing' as const },
  { serial: 'MFP-PUN-004', location: 'Junnar Mandi', block: 'Junnar', status: 'Pending' as const },
]

const SAMPLE_COMMISSION = [
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May',
].map((m, i) => ({
  month: m,
  commission: 8000 + i * 4000 + Math.round(Math.sin(i) * 2000),
}))

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-navy-900">Welcome back</h2>
        <p className="text-sm text-navy-600">Here's how your district is performing.</p>
      </div>

      <StatsCards
        stats={{
          totalPumps: 6,
          activePumps: 4,
          monthlyCommission: 84000,
          pendingApplications: 2,
        }}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CommissionChart data={SAMPLE_COMMISSION} />
        <PumpTable pumps={SAMPLE_PUMPS} />
      </div>
    </div>
  )
}
