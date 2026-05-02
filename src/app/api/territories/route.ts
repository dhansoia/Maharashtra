import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MAHARASHTRA_DISTRICTS } from '@/lib/maharashtra-districts'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'territories',
      limit: 100,
    })

    const map = new Map(docs.map((d: any) => [d.districtCode, d]))

    const data = MAHARASHTRA_DISTRICTS.map((d) => {
      const t = map.get(d.code) as any
      return {
        ...d,
        status: (t?.status as 'available' | 'reserved' | 'allotted') || 'available',
        totalPumps: (t?.totalPumps as number) || 0,
        partnerName: (t?.districtPartner as any)?.entityName,
      }
    })

    return NextResponse.json({ ok: true, data })
  } catch (e) {
    // Fallback: all available
    return NextResponse.json({
      ok: true,
      data: MAHARASHTRA_DISTRICTS.map((d) => ({
        ...d,
        status: 'available' as const,
        totalPumps: 0,
      })),
    })
  }
}
