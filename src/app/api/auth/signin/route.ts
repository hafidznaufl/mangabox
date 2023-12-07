import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        message: 'Email or Password are Required',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return NextResponse.json({ status: 404, message: 'User Not Found' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ status: 400, message: 'Invalid Password' })
    }

    return NextResponse.json('Login successful')
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json('Internal Server Error')
  }
}
