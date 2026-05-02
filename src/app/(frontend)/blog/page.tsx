import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Blog & Updates',
  description: 'News, announcements and industry insights from AIVC iFuel Maharashtra.',
}

const PLACEHOLDERS = [
  {
    slug: 'maharashtra-launch',
    title: 'Maharashtra State Partner programme officially launched',
    date: '2025-11-15',
    excerpt:
      'After 6 months of planning, the Pvt. Ltd. company is now actively recruiting District Partners across Maharashtra.',
    category: 'announcements',
  },
  {
    slug: 'first-100-pumps',
    title: 'Why the first 100 Mini Fuel Pumps will reshape rural fuel access',
    date: '2025-11-08',
    excerpt:
      'A look at how our distributed network changes the unit economics of fuel distribution in Maharashtra.',
    category: 'insights',
  },
  {
    slug: 'pune-district-allotted',
    title: 'Pune district fully allotted — first District Partner onboarded',
    date: '2025-10-22',
    excerpt:
      'Mr. Rajesh Patil signed the MOU on October 18 and has begun pump-site identification across 14 blocks.',
    category: 'news',
  },
]

const CATEGORY_LABEL: Record<string, string> = {
  announcements: 'Announcements',
  insights: 'Industry Insights',
  news: 'News',
}

export default function BlogPage() {
  return (
    <>
      <section className="bg-navy-50/40 py-10">
        <div className="container-default text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">Blog</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">News & Updates</h1>
          <p className="mx-auto mt-3 max-w-2xl text-navy-600">
            Stay current with rollout updates, partner success stories and fuel-industry insights.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-default">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDERS.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <div className="aspect-video bg-gradient-to-br from-navy-900 to-gold-700" />
                  <CardContent className="p-6">
                    <Badge variant="muted">{CATEGORY_LABEL[p.category] || p.category}</Badge>
                    <h3 className="mt-3 font-display text-lg font-semibold text-navy-900 group-hover:text-gold-700">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-600">{p.excerpt}</p>
                    <p className="mt-4 flex items-center gap-1 text-xs text-navy-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(p.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
