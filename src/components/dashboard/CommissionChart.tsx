'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatINR } from '@/lib/constants'

interface Point {
  month: string
  commission: number
}

export function CommissionChart({ data }: { data: Point[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Trend</CardTitle>
        <p className="text-sm text-navy-600">Last 12 months</p>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="commissionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d2891a" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#d2891a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(value: number) => formatINR(value)} />
            <Area
              type="monotone"
              dataKey="commission"
              stroke="#d2891a"
              strokeWidth={2}
              fill="url(#commissionGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
