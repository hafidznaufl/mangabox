'use client'

import { menuList } from '@/lib/constant/navbar'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ModeToggle } from './dark-mode'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'

const Navbar: React.FC = () => {
  const path = usePathname()
  const router = useRouter()
  const [activePage, setActivePage] = useState('')

  useEffect(() => {
    setActivePage(path)
  }, [path])

  return (
    <main>
      <nav className="fixed inset-x-0 top-0 z-20 bg-background shadow-sm backdrop-blur-sm">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-sm font-bold">MangaBox</h1>
          <div className="">
            <ul className="flex gap-10">
              {menuList.map((menu) => (
                <li
                  key={menu.name}
                  className={`text-sm font-medium ${
                    activePage === menu.path
                      ? 'text-black dark:text-white'
                      : 'opacity-60'
                  }`}
                >
                  <Link href={menu.path}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={'secondary'}
              size={'sm'}
              onClick={() => router.push('/auth')}
            >
              Sign In
            </Button>
            <Button variant={'ghost'} size={'sm'}>
              Sign Up
            </Button>
            {/* <ModeToggle /> */}
          </div>
        </div>
      </nav>
    </main>
  )
}

export default Navbar
