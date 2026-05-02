import { PumpTable } from '@/components/dashboard/PumpTable'

const SAMPLE_PUMPS = [
  { serial: 'MFP-PUN-001', location: 'Pune Rural, NH-65', block: 'Haveli', status: 'Live' as const, installedDate: '2025-09-12', monthlyLitres: 11200 },
  { serial: 'MFP-PUN-002', location: 'Maval Junction', block: 'Maval', status: 'Live' as const, installedDate: '2025-10-01', monthlyLitres: 9800 },
  { serial: 'MFP-PUN-003', location: 'Bhor Bypass', block: 'Bhor', status: 'Installing' as const },
  { serial: 'MFP-PUN-004', location: 'Junnar Mandi', block: 'Junnar', status: 'Pending' as const },
  { serial: 'MFP-PUN-005', location: 'Khed Industrial', block: 'Khed', status: 'Live' as const, installedDate: '2025-11-05', monthlyLitres: 8500 },
  { serial: 'MFP-PUN-006', location: 'Indapur Highway', block: 'Indapur', status: 'Live' as const, installedDate: '2025-12-01', monthlyLitres: 12400 },
]

export default function MyPumpsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-navy-900">My Pumps</h2>
        <p className="text-sm text-navy-600">Allotment, installation status and dispensed volume.</p>
      </div>
      <PumpTable pumps={SAMPLE_PUMPS} />
    </div>
  )
}
