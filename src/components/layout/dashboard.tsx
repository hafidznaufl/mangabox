import Sidebar from '../sidebar'
import Logo from '../ui/logo'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container grid min-h-screen place-items-center">
      <Sidebar />
      {children}
    </div>
  )
}
