'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import {
  BackpackIcon,
  DashboardIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ExitIcon,
  MagnifyingGlassIcon,
  MixIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { Separator } from './ui/separator'
import { signOut, useSession } from 'next-auth/react'
import ProfileCard from './profile-card'
import { ModeToggle } from './dark-mode'
import { sidebarMenu } from '@/lib/constant/navbar'
import Link from 'next/link'

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { data: session } = useSession({
    required: true,
  })

  console.log(session)

  return (
    <div className="z-10 h-screen">
      <div
        className={`flex h-full transform flex-col items-center border-r-2 bg-foreground/5 backdrop-blur-sm transition-all duration-300 ease-in-out ${
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

        {/* Sidebar Content */}
        <div
          className={`${
            showSidebar ? 'hidden' : ''
          } flex h-screen w-full flex-col justify-between gap-4 p-4`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h1 className="py-2 text-sm font-bold">MangaBox</h1>
              <Button variant={'outline'} className="gap-4">
                <MagnifyingGlassIcon /> Search
              </Button>
            </div>
            <ul className="flex w-full flex-col gap-4">
              <Separator />
              {sidebarMenu.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    <Button
                      variant={'secondary'}
                      className="w-full justify-start gap-x-4"
                    >
                      <div className="flex items-center">
                        {item.path === '/dashboard' && <DashboardIcon />}
                        {item.path === '/dashboard/trending' && <RocketIcon />}
                        {item.path === '/dashboard/new' && <BackpackIcon />}
                        {item.path === '/dashboard/updates' && <MixIcon />}
                      </div>
                      <p className="">{item.name}</p>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full flex-col gap-4">
            <Separator />
            <ModeToggle variants="secondary" />
            <Button
              variant={'outline'}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <ExitIcon />
            </Button>

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
    </div>
  )
}
