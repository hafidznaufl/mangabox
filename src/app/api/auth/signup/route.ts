import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    const hash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: 'error', message: error.message },
        { status: 500 },
      )
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email')

    const existingUser = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Email is already registered. Please use a different email.',
        },
        { status: 400 },
      )
    }

    return NextResponse.json(existingUser)
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(
        'Unique constraint failed on the constraint: `User_email_key`',
      )
    ) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Email is already registered. Please use a different email.',
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        status: 'error',
        message: 'An error occurred while checking the email.',
      },
      { status: 500 },
    )
  }
}
