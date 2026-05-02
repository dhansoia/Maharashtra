'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MAHARASHTRA_DISTRICTS, REGIONS, REGION_COLORS, type DistrictInfo } from '@/lib/maharashtra-districts'
import { cn } from '@/lib/utils'

type Status = 'available' | 'reserved' | 'allotted'

export interface DistrictData extends DistrictInfo {
  status: Status
  totalPumps?: number
  partnerName?: string
}

const STATUS_COLOR: Record<Status, string> = {
  available: '#1f8a4c',
  reserved: '#f59e0b',
  allotted: '#ef4444',
}

const STATUS_LABEL: Record<Status, string> = {
  available: 'Available',
  reserved: 'Reserved',
  allotted: 'Allotted',
}

interface Props {
  data?: DistrictData[]
}

export function MaharashtraMap({ data }: Props) {
  const [selected, setSelected] = useState<DistrictData | null>(null)
  const [filter, setFilter] = useState<Status | 'all'>('all')

  const districts = useMemo<DistrictData[]>(() => {
    if (data && data.length) return data
    // Default: everything available
    return MAHARASHTRA_DISTRICTS.map((d) => ({
      ...d,
      status: 'available' as Status,
      totalPumps: 0,
    }))
  }, [data])

  const projection = useMemo(() => {
    const lons = districts.map((d) => d.centroid[0])
    const lats = districts.map((d) => d.centroid[1])
    const minLon = Math.min(...lons) - 0.4
    const maxLon = Math.max(...lons) + 0.4
    const minLat = Math.min(...lats) - 0.3
    const maxLat = Math.max(...lats) + 0.3
    const W = 800
    const H = 480
    const project = ([lon, lat]: [number, number]) => {
      const x = ((lon - minLon) / (maxLon - minLon)) * W
      const y = H - ((lat - minLat) / (maxLat - minLat)) * H
      return [x, y] as const
    }
    return { W, H, project }
  }, [districts])

  const counts = useMemo(() => {
    return {
      available: districts.filter((d) => d.status === 'available').length,
      reserved: districts.filter((d) => d.status === 'reserved').length,
      allotted: districts.filter((d) => d.status === 'allotted').length,
    }
  }, [districts])

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Card className="lg:col-span-8">
        <CardContent className="p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-navy-700">
              {districts.length} districts • Hover or tap to view details
            </p>
            <div className="flex flex-wrap gap-2">
              <FilterPill active={filter === 'all'} onClick={() => setFilter('all')} label={`All (${districts.length})`} />
              <FilterPill
                active={filter === 'available'}
                onClick={() => setFilter('available')}
                label={`Available (${counts.available})`}
                color={STATUS_COLOR.available}
              />
              <FilterPill
                active={filter === 'reserved'}
                onClick={() => setFilter('reserved')}
                label={`Reserved (${counts.reserved})`}
                color={STATUS_COLOR.reserved}
              />
              <FilterPill
                active={filter === 'allotted'}
                onClick={() => setFilter('allotted')}
                label={`Allotted (${counts.allotted})`}
                color={STATUS_COLOR.allotted}
              />
            </div>
          </div>

          <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg bg-navy-50">
            <svg
              viewBox={`0 0 ${projection.W} ${projection.H}`}
              className="h-full w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#dbeafe" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </radialGradient>
              </defs>
              <rect width={projection.W} height={projection.H} fill="url(#bgGradient)" />

              {/* Region labels */}
              {REGIONS.map((region) => {
                const inRegion = districts.filter((d) => d.region === region)
                if (!inRegion.length) return null
                const cx = inRegion.reduce((s, d) => s + projection.project(d.centroid)[0], 0) / inRegion.length
                const cy = inRegion.reduce((s, d) => s + projection.project(d.centroid)[1], 0) / inRegion.length
                return (
                  <text
                    key={region}
                    x={cx}
                    y={cy}
                    fontSize={12}
                    fill={REGION_COLORS[region]}
                    opacity={0.18}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {region.toUpperCase()}
                  </text>
                )
              })}

              {districts.map((d) => {
                const [x, y] = projection.project(d.centroid)
                const isFiltered = filter !== 'all' && d.status !== filter
                const isSelected = selected?.code === d.code
                return (
                  <g
                    key={d.code}
                    onMouseEnter={() => setSelected(d)}
                    onClick={() => setSelected(d)}
                    className="cursor-pointer"
                    opacity={isFiltered ? 0.2 : 1}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 16 : 12}
                      fill={STATUS_COLOR[d.status]}
                      stroke="#fff"
                      strokeWidth={2}
                      className="transition-all"
                    />
                    <text
                      x={x}
                      y={y - 18}
                      fontSize={9}
                      textAnchor="middle"
                      fill="#0f1e35"
                      fontWeight="600"
                      className="pointer-events-none"
                    >
                      {d.name.split(' ')[0]}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      <div className="lg:col-span-4">
        {selected ? (
          <Card>
            <CardContent className="p-6">
              <Badge
                variant={selected.status === 'available' ? 'success' : 'gold'}
                className="mb-2"
              >
                {STATUS_LABEL[selected.status]}
              </Badge>
              <h3 className="font-display text-2xl font-bold text-navy-900">{selected.name}</h3>
              <p className="text-sm text-navy-500">
                {selected.region} · Code {selected.code}
              </p>
              <dl className="mt-5 space-y-2 text-sm">
                <DescRow label="Pumps Installed" value={selected.totalPumps?.toString() || '0'} />
                <DescRow label="Target Pumps" value="40" />
                <DescRow label="District Partner" value={selected.partnerName || 'Open'} />
              </dl>
              <div className="mt-6 space-y-2 text-sm">
                <a
                  href="/district-partner/apply"
                  className={cn(
                    'inline-flex w-full items-center justify-center rounded-md px-4 py-2 font-medium',
                    selected.status === 'available'
                      ? 'bg-gold-400 text-navy-950 hover:bg-gold-500'
                      : 'cursor-not-allowed bg-navy-100 text-navy-400',
                  )}
                  aria-disabled={selected.status !== 'available'}
                >
                  {selected.status === 'available' ? 'Apply for this District' : 'Not Available'}
                </a>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-navy-500">
              <p className="text-sm">Hover or tap a district to view details.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean
  onClick: () => void
  label: string
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
        active ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-200 bg-white text-navy-700 hover:bg-navy-50',
      )}
    >
      {color ? <span className="h-2 w-2 rounded-full" style={{ background: color }} /> : null}
      {label}
    </button>
  )
}

function DescRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-navy-100 pb-1.5">
      <dt className="text-navy-500">{label}</dt>
      <dd className="font-medium text-navy-900">{value}</dd>
    </div>
  )
}
