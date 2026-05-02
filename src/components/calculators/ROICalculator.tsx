'use client'

import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Calculator, TrendingUp, Clock, Coins } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BUSINESS, formatINR } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Mode = 'district' | 'pump-holder'

export function ROICalculator() {
  const [mode, setMode] = useState<Mode>('district')

  return (
    <section id="roi" className="bg-white py-20">
      <div className="container-default">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <Badge variant="gold" className="mb-3">
            <Calculator className="mr-1 h-3.5 w-3.5" /> Interactive Calculator
          </Badge>
          <h2 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Calculate Your Earnings
          </h2>
          <p className="mt-3 text-base text-navy-600">
            Adjust the sliders to see your income, payback period and 5-year cumulative earnings.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-navy-200 bg-navy-50 p-1">
            <button
              onClick={() => setMode('district')}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                mode === 'district' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-600',
              )}
            >
              District Partner
            </button>
            <button
              onClick={() => setMode('pump-holder')}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                mode === 'pump-holder' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-600',
              )}
            >
              Pump Holder
            </button>
          </div>
        </div>

        {mode === 'district' ? <DistrictCalculator /> : <PumpHolderCalculator />}
      </div>
    </section>
  )
}

function DistrictCalculator() {
  const [pumps, setPumps] = useState(BUSINESS.DISTRICT_PUMPS)
  const [litresPerPump, setLitresPerPump] = useState(BUSINESS.LITRES_PER_MONTH)

  const data = useMemo(() => {
    const ownPumps = BUSINESS.DISTRICT_PUMPS
    const additionalPumps = Math.max(0, pumps - ownPumps)

    const ownPumpMargin = ownPumps * BUSINESS.PUMP_MARGIN
    const incentive = additionalPumps * BUSINESS.INCENTIVE_PER_PUMP
    const oneTime = ownPumpMargin + incentive

    const monthlyCommission =
      pumps * litresPerPump * BUSINESS.FUEL_COMMISSION.DISTRICT
    const annualCommission = monthlyCommission * 12

    const investment = BUSINESS.DISTRICT_TOTAL
    const paybackYears = investment / (annualCommission + oneTime / 5)

    const yearly = Array.from({ length: 5 }).map((_, i) => {
      const year = i + 1
      const cumulative = annualCommission * year + oneTime
      return {
        year: `Year ${year}`,
        commission: annualCommission,
        cumulative,
      }
    })

    return {
      ownPumpMargin,
      incentive,
      oneTime,
      monthlyCommission,
      annualCommission,
      paybackYears,
      yearly,
      investment,
    }
  }, [pumps, litresPerPump])

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Card className="lg:col-span-5">
        <CardHeader>
          <CardTitle>Your Inputs</CardTitle>
          <p className="text-sm text-navy-600">
            Investment: <strong>{formatINR(BUSINESS.DISTRICT_TOTAL)}</strong>
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <SliderField
            label="Number of Pumps in Your District"
            value={pumps}
            min={BUSINESS.DISTRICT_PUMPS}
            max={BUSINESS.DISTRICT_TOTAL_PUMPS}
            step={1}
            onChange={setPumps}
            suffix={` pumps`}
            hint={`First ${BUSINESS.DISTRICT_PUMPS} pumps are yours. Additional pumps via Pump Holders give you 10% incentive + recurring commission.`}
          />
          <SliderField
            label="Avg Litres / Pump / Month"
            value={litresPerPump}
            min={3000}
            max={20000}
            step={500}
            onChange={setLitresPerPump}
            suffix=" L"
          />

          <div className="space-y-2 rounded-lg bg-navy-50 p-4 text-sm">
            <Row label="Margin on 6 own pumps" value={formatINR(data.ownPumpMargin)} />
            <Row label="10% incentive on additional pumps" value={formatINR(data.incentive)} />
            <Row label="One-time earnings" value={formatINR(data.oneTime)} accent />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:col-span-7">
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={Coins}
            label="Monthly Commission"
            value={formatINR(data.monthlyCommission)}
            sub="Across all pumps in district"
          />
          <StatCard
            icon={TrendingUp}
            label="Annual Income"
            value={formatINR(data.annualCommission)}
            sub="Recurring + commission only"
            accent
          />
          <StatCard
            icon={Clock}
            label="Payback Period"
            value={`${data.paybackYears.toFixed(1)} yrs`}
            sub="Including one-time earnings"
          />
          <StatCard
            icon={Coins}
            label="5-Year Cumulative"
            value={formatINR(data.yearly[4].cumulative)}
            sub="Commission + incentive + margin"
            accent
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>5-Year Cumulative Earnings</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.yearly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value: number) => formatINR(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cumulative"
                  name="Cumulative Earnings"
                  stroke="#d2891a"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PumpHolderCalculator() {
  const [litres, setLitres] = useState(BUSINESS.LITRES_PER_MONTH)

  const data = useMemo(() => {
    const monthly = litres * BUSINESS.FUEL_COMMISSION.PUMP_HOLDER
    const annual = monthly * 12
    const investment = BUSINESS.PUMP_MRP
    const paybackYears = investment / annual

    const monthlyData = Array.from({ length: 12 }).map((_, i) => ({
      month: `M${i + 1}`,
      earnings: monthly * (i + 1),
      investment,
    }))

    return { monthly, annual, paybackYears, monthlyData, investment }
  }, [litres])

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Card className="lg:col-span-5">
        <CardHeader>
          <CardTitle>Your Inputs</CardTitle>
          <p className="text-sm text-navy-600">
            Investment: <strong>{formatINR(BUSINESS.PUMP_MRP)}</strong> (incl. GST)
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <SliderField
            label="Avg Litres Dispensed / Month"
            value={litres}
            min={3000}
            max={25000}
            step={500}
            onChange={setLitres}
            suffix=" L"
            hint="Realistic range: 8,000-15,000 L for rural & semi-urban locations."
          />

          <div className="space-y-2 rounded-lg bg-navy-50 p-4 text-sm">
            <Row label="Commission per litre" value={`₹${BUSINESS.FUEL_COMMISSION.PUMP_HOLDER.toFixed(2)}`} />
            <Row label="Monthly earnings" value={formatINR(data.monthly)} />
            <Row label="Annual earnings" value={formatINR(data.annual)} accent />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:col-span-7">
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={Coins} label="Monthly" value={formatINR(data.monthly)} sub={`@ ₹2.50/L`} />
          <StatCard icon={TrendingUp} label="Annual" value={formatINR(data.annual)} sub="Recurring" accent />
          <StatCard
            icon={Clock}
            label="Payback Period"
            value={`${data.paybackYears.toFixed(1)} yrs`}
            sub="Pure commission basis"
          />
          <StatCard
            icon={Coins}
            label="5-Year Earnings"
            value={formatINR(data.annual * 5)}
            sub="Excluding pump value"
            accent
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Break-Even Trajectory (Months 1-12)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`} />
                <Tooltip formatter={(value: number) => formatINR(value)} />
                <Legend />
                <Bar dataKey="earnings" name="Cumulative Earnings" fill="#1f8a4c" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  hint,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix?: string
  hint?: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-navy-900">{label}</label>
        <span className="font-display text-lg font-bold text-gold-700">
          {value.toLocaleString('en-IN')}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-gold-500"
      />
      <div className="mt-1 flex justify-between text-xs text-navy-500">
        <span>{min.toLocaleString('en-IN')}</span>
        <span>{max.toLocaleString('en-IN')}</span>
      </div>
      {hint ? <p className="mt-2 text-xs text-navy-500">{hint}</p> : null}
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <Card className={cn(accent && 'border-gold-300 bg-gold-50/50')}>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-navy-500">
          <Icon className="h-4 w-4" />
          <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
        </div>
        <p className={cn('mt-2 font-display text-2xl font-bold', accent ? 'text-gold-700' : 'text-navy-900')}>
          {value}
        </p>
        {sub ? <p className="mt-1 text-xs text-navy-500">{sub}</p> : null}
      </CardContent>
    </Card>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={cn('flex justify-between', accent && 'border-t border-navy-200 pt-2 font-semibold')}>
      <span className="text-navy-600">{label}</span>
      <span className={cn('font-mono', accent ? 'text-gold-700' : 'text-navy-900')}>{value}</span>
    </div>
  )
}
