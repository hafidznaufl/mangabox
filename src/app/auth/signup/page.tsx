import Navbar from '@/components/navbar'
import SignUpForm from '@/components/signup'

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Navbar showMenu={false} />
      <SignUpForm />
    </div>
  )
}
