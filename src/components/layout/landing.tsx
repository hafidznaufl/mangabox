import Navbar from '../navbar'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Navbar />
      {children}
    </div>
  )
}
