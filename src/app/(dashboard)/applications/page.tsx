import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const APPS = [
  { name: 'Suresh Patil', village: 'Shirur', status: 'Site Verification', date: '2025-12-22' },
  { name: 'Mahesh Joshi', village: 'Maval', status: 'Pending', date: '2025-12-19' },
  { name: 'Nilesh Wagh', village: 'Bhor', status: 'Approved', date: '2025-12-15' },
]

const STATUS_VARIANT: Record<string, 'success' | 'gold' | 'muted'> = {
  Approved: 'success',
  'Site Verification': 'gold',
  Pending: 'muted',
}

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900">Submitted Applications</h2>
          <p className="text-sm text-navy-600">
            Pump Holder applications you've submitted for your district.
          </p>
        </div>
        <Button asChild variant="gold">
          <Link href="/pump-holder/apply">
            New Application <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-navy-500">
              <tr>
                <th className="px-2 py-2">Applicant</th>
                <th className="px-2 py-2">Village</th>
                <th className="px-2 py-2">Submitted</th>
                <th className="px-2 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {APPS.map((a) => (
                <tr key={a.name}>
                  <td className="px-2 py-3 font-medium text-navy-900">{a.name}</td>
                  <td className="px-2 py-3 text-navy-700">{a.village}</td>
                  <td className="px-2 py-3 text-navy-600">{a.date}</td>
                  <td className="px-2 py-3">
                    <Badge variant={STATUS_VARIANT[a.status] || 'muted'}>{a.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
