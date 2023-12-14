'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ExitIcon,
} from '@radix-ui/react-icons'
import { Separator } from './ui/separator'
import { signOut, useSession } from 'next-auth/react'
import ProfileCard from './profile-card'
import { ModeToggle } from './dark-mode'

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { data: session } = useSession({
    required: true,
  })

  return (
    <div className="z-10 h-screen">
      <div
        className={`flex h-full transform flex-col-reverse items-center border-r-2 bg-foreground/5 pt-16 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          showSidebar ? 'w-6' : 'w-72'
        }`}
      >
        {/* Sidebar Toggle */}
        <div className="absolute -right-6 bottom-6">
          <Button
            size={'icon'}
            className="h-16"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
          </Button>
        </div>
        {/* Sidebar Menu */}
        <div
          className={`${
            showSidebar ? 'hidden' : ''
          } flex w-full flex-col gap-4 px-6 py-4`}
        >
          <>
            <Separator />
            <ModeToggle variants="secondary" />
            <Button
              variant={'outline'}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <ExitIcon />
            </Button>
          </>

          <Separator />
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="h-20 w-full select-none"
          >
            <ProfileCard user={session?.user} />
          </div>
        </div>
      </div>
    </div>
  )
}
