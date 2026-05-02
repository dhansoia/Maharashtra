import { Resend } from 'resend'

let _client: Resend | null = null

function client() {
  if (_client) return _client
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY missing')
  _client = new Resend(apiKey)
  return _client
}

const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@example.com'
const ADMIN = process.env.ADMIN_NOTIFY_EMAIL || 'admin@example.com'

export async function sendApplicationConfirmation(opts: {
  to: string
  name: string
  type: 'District Partner' | 'Pump Holder'
  applicationNo: string
}) {
  return client().emails.send({
    from: FROM,
    to: opts.to,
    subject: `Application Received — ${opts.applicationNo}`,
    html: `
      <h2>Hello ${opts.name},</h2>
      <p>Thank you for applying as a <strong>${opts.type}</strong> with AIVC iFuel Maharashtra.</p>
      <p>Your application reference is <strong>${opts.applicationNo}</strong>.</p>
      <p>Our team will review and contact you within 3-5 working days.</p>
      <p>— AIVC iFuel Maharashtra</p>
    `,
  })
}

export async function notifyAdmin(opts: {
  subject: string
  html: string
}) {
  return client().emails.send({
    from: FROM,
    to: ADMIN,
    subject: opts.subject,
    html: opts.html,
  })
}
