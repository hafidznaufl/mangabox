'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
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
import { Separator } from './ui/separator'
import { signIn, useSession } from 'next-auth/react'
import {
  EyeClosedIcon,
  EyeOpenIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons'
import { redirect, useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'

type FormData = {
  email: string
  password: string
}

export default function SignInForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

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
      if (!formData.email || !formData.password) {
        toast({
          title: 'Validation Error',
          description: 'Please fill out all fields.',
        })
        return
      }

      // Simple email validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast({
          title: 'Validation Error',
          description: 'Please enter a valid email address.',
        })
        return
      }

      const validateRes = await fetch('/api/auth/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const validateData = await validateRes.json()

      if (
        !validateRes.ok ||
        validateData.status !== 200 ||
        !validateData.message
      ) {
        toast({
          title: 'Error',
          description: validateData.message || 'Unknown error',
        })
        return
      }

      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      toast({
        title: 'Success',
        description: 'Sign-in successful!',
      })

      router.push('/dashboard')
    } catch (error) {
      console.error('Error during sign-in:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
      })
    }
  }

  return (
    <>
      <Card className="backdrop-blur-sm md:w-1/4">
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
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="top absolute right-3 top-[10px] focus:outline-none"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
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
