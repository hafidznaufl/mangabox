import SignUp from '@/components/signup'
import Logo from '@/components/ui/logo'

export default function page() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Logo />
      <SignUp />
    </div>
  )
}
