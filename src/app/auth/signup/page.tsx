import Navbar from '@/components/navbar'
import SignUp from '@/components/signup'
import Logo from '@/components/ui/logo'

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Navbar showMenu={false} />
      <SignUp />
    </div>
  )
}
