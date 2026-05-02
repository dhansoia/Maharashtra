interface LegalPageProps {
  title: string
  updated: string
  children: React.ReactNode
}

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <article className="bg-white py-12">
      <div className="container-default max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">Legal</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-navy-500">Last updated: {updated}</p>
        <div className="prose prose-navy mt-8 max-w-none text-navy-800 [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy-900 [&_p]:mt-3 [&_p]:text-sm [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-sm [&_li]:mt-1">
          {children}
        </div>
      </div>
    </article>
  )
}
