import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Blog Post',
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <article className="bg-white py-12">
      <div className="container-default max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-1 h-4 w-4" /> All Posts
          </Link>
        </Button>
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">News</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">
          {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
        </h1>
        <p className="mt-3 text-sm text-navy-500">Published recently · 4 min read</p>
        <div className="prose prose-navy mt-8 max-w-none text-navy-800">
          <p>
            This is a placeholder blog detail page. In production, content will be rendered from the Payload CMS
            <code> blog-posts</code> collection using the lexical rich-text renderer.
          </p>
          <p>
            Each post will contain a hero image, lexical body, author, category and publication date — all
            editable from the Payload admin dashboard.
          </p>
        </div>
      </div>
    </article>
  )
}
