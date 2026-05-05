import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Stories from District Partners and Pump Holders across Maharashtra.',
}

const TESTIMONIALS = [
  {
    name: 'Rajesh Patil',
    role: 'District Partner — Pune',
    quote: 'In four months I had 18 pumps live. The model is real, the support is real, the income is real.',
    rating: 5,
  },
  {
    name: 'Suresh Deshmukh',
    role: 'Pump Holder — Satara',
    quote: 'I was a transport operator. With one pump on my farmhouse plot I now have a steady recurring income — and supply diesel to my own vehicles too.',
    rating: 5,
  },
  {
    name: 'Anjali Joshi',
    role: 'District Partner — Nashik',
    quote: 'Territory rights and the 10% pump-sale incentive made the unit economics work for me.',
    rating: 5,
  },
  {
    name: 'Pradeep More',
    role: 'Pump Holder — Solapur',
    quote: 'Smooth installation, prompt fuel deliveries, and digital billing has made my life simple.',
    rating: 5,
  },
]

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-navy-50/40 py-10">
        <div className="container-default text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">Testimonials</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Stories from the Network
          </h1>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container-default">
          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name}>
                <CardContent className="p-6">
                  <div className="flex">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="mt-3 text-base text-navy-800">"{t.quote}"</p>
                  <p className="mt-4 font-display text-base font-semibold text-navy-900">{t.name}</p>
                  <p className="text-sm text-navy-600">{t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-navy-500">
            Names & districts are indicative; production testimonials will be sourced from real partners and managed
            via the Payload Testimonials collection.
          </p>
        </div>
      </section>
    </>
  )
}
