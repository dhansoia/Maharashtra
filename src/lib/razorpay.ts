import Razorpay from 'razorpay'

let _client: Razorpay | null = null

export function getRazorpay(): Razorpay {
  if (_client) return _client
  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET
  if (!key_id || !key_secret) {
    throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set')
  }
  _client = new Razorpay({ key_id, key_secret })
  return _client
}

export interface CreateOrderInput {
  amount: number // INR rupees
  applicationType: 'district-partner' | 'pump-holder' | 'enquiry'
  applicantName: string
  email?: string
  phone?: string
}

export async function createOrder(input: CreateOrderInput) {
  const rzp = getRazorpay()
  return rzp.orders.create({
    amount: Math.round(input.amount * 100),
    currency: 'INR',
    receipt: `${input.applicationType}_${Date.now()}`,
    notes: {
      applicantName: input.applicantName,
      type: input.applicationType,
      email: input.email ?? '',
      phone: input.phone ?? '',
    },
  })
}

export function verifySignature(opts: {
  orderId: string
  paymentId: string
  signature: string
}) {
  const crypto = require('crypto')
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) throw new Error('RAZORPAY_KEY_SECRET missing')
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${opts.orderId}|${opts.paymentId}`)
    .digest('hex')
  return expected === opts.signature
}
