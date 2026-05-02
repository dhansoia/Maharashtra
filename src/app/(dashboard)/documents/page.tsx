import { Download, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const DOCS = [
  { name: 'District Partner MOU', file: '/documents/district-partner-mou.pdf' },
  { name: 'NDA Agreement', file: '/documents/nda.pdf' },
  { name: 'Pump Holder Allotment Form', file: '/documents/pump-holder-form.pdf' },
  { name: 'Brand & Signage Guidelines', file: '/documents/brand-guidelines.pdf' },
  { name: 'Operating SOP Handbook', file: '/documents/operating-sop.pdf' },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-navy-900">Documents</h2>
        <p className="text-sm text-navy-600">MOUs, agreements, allotment forms and SOPs.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Library</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-navy-100">
            {DOCS.map((d) => (
              <li key={d.file} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-navy-100 text-navy-700">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-navy-900">{d.name}</span>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a href={d.file} download>
                    <Download className="mr-1 h-4 w-4" /> Download
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
