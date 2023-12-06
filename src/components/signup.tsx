'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

interface FormData {
  name: string
  email: string
  password: string
}

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error('Sign-up failed:', errorData.message)
        // Handle sign-up failure, show an error message, etc.
        return
      }

      console.log('Sign-up successful')
      // Redirect to the sign-in page or another page
      router.push('/')
    } catch (error) {
      console.error('Error during sign-up:', error)
    }
  }

  return (
    <>
      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create Your Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
                placeholder="example@example.com"
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
          </form>
        </CardContent>
        <CardFooter className="grid gap-4">
          <Button variant={'secondary'} type="submit">
            Sign Up
          </Button>
          <Button variant={'outline'} onClick={() => signIn('github')}>
            Continue with Github
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
