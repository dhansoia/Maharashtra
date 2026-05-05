'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { Card, CardContent } from '@/components/ui/card'

const PLACEHOLDERS = [
  {
    name: 'Rajesh Patil',
    role: 'District Partner — Pune',
    quote:
      'Within 4 months I had 18 pumps live across Pune district. The model is genuine, the support is real, and the income is recurring. AIVC has built something India needed.',
    rating: 5,
  },
  {
    name: 'Suresh Deshmukh',
    role: 'Pump Holder — Satara',
    quote:
      'I was a transport operator. With one mini pump on my farmhouse plot I now have a steady recurring income, and supply diesel to my own vehicles too.',
    rating: 5,
  },
  {
    name: 'Anjali Joshi',
    role: 'District Partner — Nashik',
    quote:
      'The territory rights and pump-sale incentive made the unit economics work for us. The State Partner walked us through every number before we signed.',
    rating: 5,
  },
]

export function TestimonialCarousel() {
  const [idx, setIdx] = useState(0)
  const t = PLACEHOLDERS[idx]
  const next = () => setIdx((i) => (i + 1) % PLACEHOLDERS.length)
  const prev = () => setIdx((i) => (i - 1 + PLACEHOLDERS.length) % PLACEHOLDERS.length)

  return (
    <section className="bg-navy-50/40 py-20">
      <div className="container-default">
        <SectionHeader
          eyebrow="Voices from the Network"
          title="What Our Partners Say"
          description="Indicative testimonials. Real names & districts will be added as the network grows."
        />

        <Card className="mx-auto max-w-3xl">
          <CardContent className="p-8 md:p-12">
            <Quote className="h-10 w-10 text-gold-300" />
            <p className="mt-4 text-lg leading-relaxed text-navy-800 md:text-xl">"{t.quote}"</p>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="font-display text-base font-semibold text-navy-900">{t.name}</p>
                <p className="text-sm text-navy-600">{t.role}</p>
                <div className="mt-1 flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="grid h-10 w-10 place-items-center rounded-full border border-navy-200 text-navy-700 hover:bg-navy-50"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="grid h-10 w-10 place-items-center rounded-full border border-navy-200 text-navy-700 hover:bg-navy-50"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
