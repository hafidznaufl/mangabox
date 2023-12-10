'use client'

import { menuList } from '@/lib/constant/navbar'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ModeToggle } from './dark-mode'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import {
  Cross1Icon,
  HamburgerMenuIcon,
  HomeIcon,
  ReaderIcon,
  RocketIcon,
} from '@radix-ui/react-icons'

type NavbarProps = {
  showMenu?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ showMenu = true }) => {
  const path = usePathname()
  const router = useRouter()
  const [activePage, setActivePage] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    setActivePage(path)
  }, [path])

  return (
    <main>
      <nav>
        <div
          className={`fixed inset-x-0 top-0 z-20  ${
            showMenu ? 'backdrop-blur-sm' : ''
          } `}
        >
          <div className="container flex items-center justify-between py-4">
            <h1 className="text-sm font-bold my-1">MangaBox</h1>
            <div className={`hidden md:flex ${showMenu ? '' : 'md:hidden'}`}>
              <ul className="flex gap-10">
                {menuList.map((menu) => (
                  <li
                    key={menu.name}
                    className={`text-sm font-semibold ${
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
            <div
              className={`hidden items-center gap-2 md:flex ${
                showMenu ? '' : 'md:invisible'
              }`}
            >
              <Button
                variant={'default'}
                size={'sm'}
                onClick={() => router.push('/auth/signin')}
              >
                Sign In
              </Button>
              <Button
                variant={'outline'}
                size={'sm'}
                onClick={() => router.push('/auth/signup')}
              >
                Sign Up
              </Button>
              <ModeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button
                size={'sm'}
                variant={'outline'}
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? <Cross1Icon /> : <HamburgerMenuIcon />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="container border-b-2 py-4 md:hidden">
              <div className="flex flex-col gap-4">
                <Button
                  variant={'default'}
                  size={'sm'}
                  onClick={() => router.push('/auth/signin')}
                >
                  Sign In
                </Button>
                <Button
                  variant={'outline'}
                  size={'sm'}
                  onClick={() => router.push('/auth/signup')}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* Mobile Navbar */}
        <div className="absolute inset-x-4 bottom-4 rounded-full bg-white/10 py-4 shadow-md backdrop-blur-sm lg:hidden">
          <div>
            <ul className="flex justify-around">
              {menuList.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    {item.path === '/' && <HomeIcon />}
                    {item.path === '/trending' && <RocketIcon />}
                    {item.path === '/about' && <ReaderIcon />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </main>
  )
}

export default Navbar
