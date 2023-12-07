'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Separator } from './ui/separator'
import { signIn } from 'next-auth/react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

type FormData = {
  email: string
  password: string
}

export default function SignIn() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const signInRes = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!signInRes.ok) {
        const errorData = await signInRes.json()
        console.error('Sign-in failed:', errorData.message)
        return
      }

      const userData = await signInRes.json()
      console.log('Sign-in successful', userData)

      router.push('/')
    } catch (error) {
      console.error('Error during sign-in:', error)
    }
  }

  return (
    <>
      <Card className="w-1/4 backdrop-blur-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Log into Your Account</CardDescription>
          </CardHeader>
          <CardContent className="mb-20 mt-4">
            <div className="mb-4 flex flex-col">
              <Label className="mb-2" htmlFor="email">
                Email:
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <Label className="mb-2" htmlFor="password">
                Password:
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <p className="text-sm">
              Don't have an account?{' '}
              <b
                className="cursor-pointer"
                onClick={() => router.push('/auth/signup')}
              >
                Sign Up
              </b>
            </p>
          </CardContent>
          <CardFooter className="grid gap-6">
            <Button type="submit">Sign In</Button>
            <Separator />
            <Button
              className="gap-2"
              variant={'outline'}
              onClick={() => signIn('github')}
            >
              <GitHubLogoIcon /> Continue with Github
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}
