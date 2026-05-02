import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { verifySignature } from '@/lib/razorpay'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, applicationId, collection } = body

    const ok = verifySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    if (!ok) {
      return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 400 })
    }

    if (applicationId && collection) {
      const payload = await getPayload({ config })
      await payload.update({
        collection,
        id: applicationId,
        data: {
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          paymentMode: 'razorpay',
          paymentDate: new Date().toISOString(),
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'Verification failed' },
      { status: 500 },
    )
  }
}
