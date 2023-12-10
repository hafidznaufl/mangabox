import SignIn from '@/components/signin'
import Logo from '@/components/ui/logo'

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Logo />
      <SignIn />
    </div>
  )
}
