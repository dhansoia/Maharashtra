import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notifyAdmin } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'enquiries',
      data: { ...body, status: 'new' },
    })

    if (process.env.RESEND_API_KEY) {
      notifyAdmin({
        subject: `New enquiry — ${body.name}`,
        html: `
          <h2>New Enquiry</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Interest:</strong> ${body.interest}</p>
          <p><strong>District:</strong> ${body.district || '—'}</p>
          <p><strong>Subject:</strong> ${body.subject || '—'}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message}</p>
        `,
      }).catch(() => null)
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'Failed to submit' },
      { status: 500 },
    )
  }
}
