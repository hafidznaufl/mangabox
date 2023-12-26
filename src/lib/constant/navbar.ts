export type NavigationItem = {
  path: string
  name: string
}

export const menuList: NavigationItem[] = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/trending',
    name: 'Trending',
  },
  {
    path: '/about',
    name: 'About',
  },
]

export const sidebarMenu: NavigationItem[] = [
  {
    path: '/dashboard',
    name: 'Home'
  },
  {
    path: '/dashboard/trending',
    name: 'Trending'
  },
  {
    path: '/dashboard/new',
    name: 'New'
  },
  {
    path: '/dashboard/updates',
    name: 'Updates'
  },

]
