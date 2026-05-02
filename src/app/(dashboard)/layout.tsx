import { Sidebar } from '@/components/dashboard/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-navy-50/30">
      <Sidebar />
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-navy-100 bg-white px-6">
          <h1 className="font-display text-base font-semibold text-navy-900">Partner Dashboard</h1>
          <p className="text-sm text-navy-500">District Partner</p>
        </header>
        <main className="px-6 py-8">{children}</main>
      </div>
    </div>
  )
}
