import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card, CardContent } from '@/components/ui/card'
import { SITE } from '@/lib/constants'
import { buildWhatsAppLink } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Reach AIVC iFuel Maharashtra — phone, email, WhatsApp and the contact form.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-50/40 py-10">
        <div className="container-default text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">Contact</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-navy-600">
            Whether you're exploring the District Partner programme, want a Pump Holder allotment, or have a
            general enquiry — we respond within 1 working day.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-default">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-4">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-gold-100 text-gold-700">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-navy-500">Phone</p>
                      <a href={`tel:${SITE.phone}`} className="font-display text-base font-semibold text-navy-900">
                        {SITE.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-gold-100 text-gold-700">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-navy-500">Email</p>
                      <a href={`mailto:${SITE.email}`} className="font-display text-base font-semibold text-navy-900">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-gold-100 text-gold-700">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-navy-500">WhatsApp</p>
                      <a
                        href={buildWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="font-display text-base font-semibold text-navy-900"
                      >
                        Chat instantly
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-gold-100 text-gold-700">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-navy-500">Address</p>
                      <p className="font-display text-base font-semibold text-navy-900">{SITE.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-8">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="font-display text-2xl font-bold text-navy-900">Send a message</h2>
                  <p className="mt-1 text-sm text-navy-600">We respond within 1 working day.</p>
                  <div className="mt-5">
                    <ContactForm />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
