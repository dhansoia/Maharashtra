import type { Metadata } from 'next'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Gallery',
}

export default function GalleryPage() {
  return (
    <>
      <section className="bg-navy-50/40 py-10">
        <div className="container-default text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">Gallery</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">Photos & Videos</h1>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container-default">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card
                key={i}
                className="aspect-square bg-gradient-to-br from-navy-200 to-navy-100 ring-1 ring-navy-100"
                aria-label={`Gallery placeholder ${i + 1}`}
              />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-navy-500">
            Image and video uploads will be managed via the Payload admin Media collection.
          </p>
        </div>
      </section>
    </>
  )
}
