import { SectionHeader } from '@/components/ui/section-header'
import { BUSINESS, formatINR } from '@/lib/constants'

const MONTHLY_LITRES = BUSINESS.LITRES_PER_MONTH

export function EarningsPreview() {
  const districtMonthly =
    BUSINESS.FUEL_COMMISSION.DISTRICT * MONTHLY_LITRES * BUSINESS.DISTRICT_TOTAL_PUMPS
  const pumpHolderMonthly = BUSINESS.FUEL_COMMISSION.PUMP_HOLDER * MONTHLY_LITRES
  const stateMonthly =
    BUSINESS.FUEL_COMMISSION.STATE *
    MONTHLY_LITRES *
    BUSINESS.DISTRICT_TOTAL_PUMPS *
    BUSINESS.DISTRICTS_PER_STATE

  const rows = [
    {
      tier: 'Pump Holder',
      monthly: pumpHolderMonthly,
      annual: pumpHolderMonthly * 12,
      payback: `${(BUSINESS.PUMP_MRP / (pumpHolderMonthly * 12)).toFixed(1)} yrs`,
    },
    {
      tier: 'District Partner',
      monthly: districtMonthly,
      annual: districtMonthly * 12,
      payback: `${(BUSINESS.DISTRICT_TOTAL / (districtMonthly * 12 + 6 * BUSINESS.PUMP_MARGIN / 5)).toFixed(1)} yrs*`,
    },
    {
      tier: 'State Partner',
      monthly: stateMonthly,
      annual: stateMonthly * 12,
      payback: `${(BUSINESS.STATE_TOTAL / (stateMonthly * 12)).toFixed(1)} yrs`,
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="container-default">
        <SectionHeader
          eyebrow="Recurring Income"
          title="Earnings at a Glance"
          description="Indicative monthly & annual fuel commission. Assumes 10,000 L/pump/month."
        />

        <div className="overflow-hidden rounded-xl border border-navy-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-display font-semibold">Tier</th>
                  <th className="px-6 py-4 text-right font-display font-semibold">Monthly</th>
                  <th className="px-6 py-4 text-right font-display font-semibold">Annual</th>
                  <th className="px-6 py-4 text-right font-display font-semibold">Payback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {rows.map((r) => (
                  <tr key={r.tier} className="bg-white hover:bg-navy-50/40">
                    <td className="px-6 py-4 font-medium text-navy-900">{r.tier}</td>
                    <td className="px-6 py-4 text-right font-mono text-navy-700">{formatINR(r.monthly)}</td>
                    <td className="px-6 py-4 text-right font-mono font-semibold text-forest-700">
                      {formatINR(r.annual)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-navy-700">{r.payback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="bg-navy-50 px-6 py-3 text-xs text-navy-500">
            * Includes one-time pump margin & 10% incentives in addition to recurring commission.
          </p>
        </div>
      </div>
    </section>
  )
}
