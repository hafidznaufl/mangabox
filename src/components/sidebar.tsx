import { useState } from 'react'
import { Button } from './ui/button'
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Separator } from './ui/separator'
import { useSession } from 'next-auth/react'
import ProfileCard from './profile-card'
import Logo from './ui/logo'

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true)
  const { data: session } = useSession({
    required: true,
  })

  return (
    <div className="h-screen">
      <div
        className={`flex h-full transform flex-col-reverse items-center border-r-2 bg-foreground/5 pt-16 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          showSidebar ? 'w-6' : 'w-[17rem]'
        }`}
      >
        {/* Sidebar Toggle */}
        <div className="absolute -right-6 bottom-20">
          <Button size={'icon'} onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
          </Button>
        </div>
        {/* Sidebar Menu */}
        <div className="flex flex-col gap-4">
          <div>
          </div>
          <div className={`${showSidebar ? 'hidden' : ''}`}>
            <Separator />
            <ProfileCard user={session?.user} />
          </div>
        </div>
      </div>
    </div>
  )
}
