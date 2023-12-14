'use client'

import DashboardLayout from '@/components/layout/dashboard'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    },
  })

  return (
    <>
      <DashboardLayout>
        <div className="flex h-[100rem] items-center justify-center">
          <Button onClick={() => router.push('/dashboard/trending')}>
            Trending
          </Button>
        </div>
      </DashboardLayout>
    </>
  )
}
