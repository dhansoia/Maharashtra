import { SITE } from './constants'

export function buildWhatsAppLink(message?: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE.whatsapp
  const text = encodeURIComponent(
    message ||
      "Hello, I'm interested in the AIVC iFuel Maharashtra programme. Please share more details.",
  )
  return `https://wa.me/${number}?text=${text}`
}

export function adminNotifyMessage(opts: {
  type: 'District Partner' | 'Pump Holder' | 'Enquiry'
  name: string
  district?: string
  reference?: string
}) {
  return [
    `New ${opts.type} application received`,
    `Name: ${opts.name}`,
    opts.district ? `District: ${opts.district}` : '',
    opts.reference ? `Ref: ${opts.reference}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}
