import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

interface User {
  name: string
  id: string
}

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        try {
          const signInRes = await fetch(
            'http://localhost:3000/api/auth/user/signin',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            },
          )

          const data = await signInRes.json()

          if (!signInRes.ok) {
            console.error('Sign-in failed:', data.message)
            return null
          }

          const user = data as User

          return {
            name: user.name,
            id: user.id,
          } as User
        } catch (error) {
          console.error('Error during sign-in:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    jwt({ token, user }) {
      if (!user) return token

      return {
        ...token,
        id: user.id,
      }
    },
    session({ session, token }) {
      return {
        ...session,
        id: token.id,
      }
    },
  },
}
