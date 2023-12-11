import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

type ProfileProps = {
  user: User
}

type User =
  | {
      name?: string | undefined | null
      email?: string | undefined | null
      image?: string | undefined | null
    }
  | undefined

export default function ProfileCard({ user }: ProfileProps) {
  const imageSrc = user?.image || ''
  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <Avatar>
          <AvatarImage src={imageSrc} alt="Profile Picture"></AvatarImage>
          <AvatarFallback>{user?.email?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <CardHeader>
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>Lorem ipsum dolor sit</CardDescription>
        </CardHeader>
      </div>
    </>
  )
}
