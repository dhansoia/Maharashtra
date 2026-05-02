import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommissionChart } from '@/components/dashboard/CommissionChart'
import { formatINR } from '@/lib/constants'

const COMMISSION_HISTORY = [
  { month: 'May 2025', amount: 14500 },
  { month: 'Jun 2025', amount: 28200 },
  { month: 'Jul 2025', amount: 41800 },
  { month: 'Aug 2025', amount: 55300 },
  { month: 'Sep 2025', amount: 67100 },
  { month: 'Oct 2025', amount: 72400 },
  { month: 'Nov 2025', amount: 81200 },
  { month: 'Dec 2025', amount: 84000 },
]

const CHART_DATA = COMMISSION_HISTORY.map((c) => ({
  month: c.month.split(' ')[0],
  commission: c.amount,
}))

export default function CommissionsPage() {
  const total = COMMISSION_HISTORY.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-navy-900">Commissions</h2>
        <p className="text-sm text-navy-600">Monthly commission earned across all pumps in your district.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wider text-navy-500">Total Earned (8 months)</p>
            <p className="mt-1 font-display text-2xl font-bold text-gold-700">{formatINR(total)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wider text-navy-500">Last Month</p>
            <p className="mt-1 font-display text-2xl font-bold text-navy-900">{formatINR(COMMISSION_HISTORY[COMMISSION_HISTORY.length - 1].amount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wider text-navy-500">Average Monthly</p>
            <p className="mt-1 font-display text-2xl font-bold text-navy-900">
              {formatINR(Math.round(total / COMMISSION_HISTORY.length))}
            </p>
          </CardContent>
        </Card>
      </div>

      <CommissionChart data={CHART_DATA} />

      <Card>
        <CardHeader>
          <CardTitle>Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="bg-navy-50 text-left text-xs uppercase tracking-wider text-navy-500">
              <tr>
                <th className="px-3 py-2">Month</th>
                <th className="px-3 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {[...COMMISSION_HISTORY].reverse().map((row) => (
                <tr key={row.month}>
                  <td className="px-3 py-2 text-navy-700">{row.month}</td>
                  <td className="px-3 py-2 text-right font-mono">{formatINR(row.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
