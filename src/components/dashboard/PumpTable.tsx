import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PumpRow {
  serial: string
  location: string
  block: string
  status: 'Live' | 'Installing' | 'Pending'
  installedDate?: string
  monthlyLitres?: number
}

const STATUS_VARIANT: Record<PumpRow['status'], 'success' | 'gold' | 'muted'> = {
  Live: 'success',
  Installing: 'gold',
  Pending: 'muted',
}

export function PumpTable({ pumps }: { pumps: PumpRow[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Pumps ({pumps.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wider text-navy-500">
                <th className="px-2 py-2 font-medium">Serial</th>
                <th className="px-2 py-2 font-medium">Location</th>
                <th className="px-2 py-2 font-medium">Block</th>
                <th className="px-2 py-2 font-medium">Status</th>
                <th className="px-2 py-2 font-medium">Installed</th>
                <th className="px-2 py-2 text-right font-medium">L/month</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {pumps.map((p) => (
                <tr key={p.serial}>
                  <td className="px-2 py-3 font-mono text-xs">{p.serial}</td>
                  <td className="px-2 py-3 text-navy-700">{p.location}</td>
                  <td className="px-2 py-3 text-navy-700">{p.block}</td>
                  <td className="px-2 py-3">
                    <Badge variant={STATUS_VARIANT[p.status]}>{p.status}</Badge>
                  </td>
                  <td className="px-2 py-3 text-navy-600">{p.installedDate || '—'}</td>
                  <td className="px-2 py-3 text-right font-mono text-navy-700">
                    {p.monthlyLitres ? p.monthlyLitres.toLocaleString('en-IN') : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
