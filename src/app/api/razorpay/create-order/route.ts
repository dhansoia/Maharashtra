import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/razorpay'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const order = await createOrder({
      amount: Number(body.amount),
      applicationType: body.applicationType,
      applicantName: body.applicantName,
      email: body.email,
      phone: body.phone,
    })
    return NextResponse.json({
      ok: true,
      order,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
    })
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'Failed to create order' },
      { status: 500 },
    )
  }
}
