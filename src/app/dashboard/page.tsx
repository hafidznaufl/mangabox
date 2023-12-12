'use client'

import { ModeToggle } from '@/components/dark-mode'
import DashboardLayout from '@/components/layout/dashboard'
import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    },
  })

  return (
    <>
      <DashboardLayout>
        <div className="flex h-screen w-full items-center justify-center">
          <Logo />
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      </DashboardLayout>
    </>
  )
}
