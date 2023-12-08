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
import { signIn } from 'next-auth/react'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import {
  EyeOpenIcon,
  EyeClosedIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons'

type FormData = {
  name: string
  email: string
  password: string
}

export default function SignUp() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  })

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
      if (!formData.name || !formData.email || !formData.password) {
        console.error('Please fill out all fields.')
        return
      }

      const emailCheckRes = await fetch(
        `/api/auth/signup?email=${formData.email}`,
      )
      const emailCheckData = await emailCheckRes.json()

      if (!emailCheckRes.ok) {
        console.error('Error checking email:', emailCheckData.message)
        return
      }

      if (emailCheckData && emailCheckData.status === 'error') {
        console.error(emailCheckData.message)
        return
      }

      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!signupRes.ok) {
        const errorData = await signupRes.json()
        console.error('Sign-up failed:', errorData.message)
        return
      }

      console.log('Sign-up successful')
      router.push('/')
    } catch (error) {
      console.error('Error during sign-up:', error)
    }
  }

  return (
    <>
      <Card className="backdrop-blur-sm md:w-1/4">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create Your Account</CardDescription>
          </CardHeader>
          <CardContent className="mb-20 mt-4">
            <div className="mb-4 flex flex-col">
              <Label className="mb-2" htmlFor="name">
                Name:
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
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
              Already have an Account?{' '}
              <b
                className="cursor-pointer"
                onClick={() => router.push('/auth/signin')}
              >
                Sign In
              </b>
            </p>
          </CardContent>
          <CardFooter className="grid gap-6">
            <Button
              type="submit"
              onClick={() =>
                toast({
                  title: 'Uh oh! Something went wrong.',
                  description: 'There was a problem with your request.',
                })
              }
            >
              Sign Up
            </Button>
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
