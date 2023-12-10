import Sidebar from '../sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Sidebar />
      {children}
    </div>
  )
}
