import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { generateApplicationNo } from '@/lib/utils'
import { sendApplicationConfirmation, notifyAdmin } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payload = await getPayload({ config })

    const reference = generateApplicationNo('DP', Math.floor(Math.random() * 90000) + 10000)

    const created = await payload.create({
      collection: 'district-partner-applications',
      data: {
        ...body,
        partnerCode: reference,
        status: 'pending',
      },
    })

    // Notify (best-effort)
    if (process.env.RESEND_API_KEY) {
      Promise.all([
        sendApplicationConfirmation({
          to: body.email,
          name: body.contactPerson || body.entityName,
          type: 'District Partner',
          applicationNo: reference,
        }),
        notifyAdmin({
          subject: `New District Partner application — ${body.entityName}`,
          html: `
            <h2>New District Partner Application</h2>
            <p><strong>Entity:</strong> ${body.entityName}</p>
            <p><strong>Contact:</strong> ${body.contactPerson} (${body.mobile}, ${body.email})</p>
            <p><strong>District:</strong> ${body.preferredDistrict}</p>
            <p><strong>Reference:</strong> ${reference}</p>
          `,
        }),
      ]).catch(() => null)
    }

    return NextResponse.json({ ok: true, id: created.id, reference })
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'Submission failed' },
      { status: 500 },
    )
  }
}
