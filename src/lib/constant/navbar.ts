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
