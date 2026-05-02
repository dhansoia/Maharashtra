import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { generateApplicationNo } from '@/lib/utils'
import { sendApplicationConfirmation, notifyAdmin } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payload = await getPayload({ config })

    const reference = generateApplicationNo('MFP', Math.floor(Math.random() * 90000) + 10000)

    const created = await payload.create({
      collection: 'pump-holder-applications',
      data: {
        ...body,
        applicationNo: reference,
        status: 'pending',
      },
    })

    if (process.env.RESEND_API_KEY && body.email) {
      Promise.all([
        sendApplicationConfirmation({
          to: body.email,
          name: body.fullName,
          type: 'Pump Holder',
          applicationNo: reference,
        }),
        notifyAdmin({
          subject: `New Pump Holder application — ${body.fullName}`,
          html: `
            <h2>New Pump Holder Application</h2>
            <p><strong>Name:</strong> ${body.fullName}</p>
            <p><strong>Mobile:</strong> ${body.mobile}</p>
            <p><strong>District / Block:</strong> ${body.district} / ${body.block}</p>
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
