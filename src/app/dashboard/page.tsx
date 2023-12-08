'use client'

import { Button } from '@/components/ui/button'
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
    <div className="grid min-h-screen place-items-center">
      {session ? <Button onClick={() => signOut()}>Sign Out</Button> : null}
    </div>
  )
}
