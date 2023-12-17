import Sidebar from '../sidebar'
import Logo from '../ui/logo'
import { ScrollArea } from '../ui/scroll-area'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center overflow-y-hidden">
      <Sidebar />
      <ScrollArea className="flex h-screen w-full items-center justify-center overflow-auto">
        {children}
      </ScrollArea>
    </div>
  )
}
