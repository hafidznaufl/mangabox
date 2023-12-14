import SignInForm from '@/components/signin'
import Logo from '@/components/ui/logo'

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Logo />
      <SignInForm />
    </div>
  )
}
