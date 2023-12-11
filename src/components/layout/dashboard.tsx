import Sidebar from '../sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center">
      <Sidebar />
      {children}
    </div>
  )
}
