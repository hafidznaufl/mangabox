import SignIn from '@/components/signin'
import Logo from '@/components/ui/logo'

export default function page() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Logo />
      <SignIn />
    </div>
  )
}
