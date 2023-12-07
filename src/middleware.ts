// middleware/requireAuth.ts
export { default } from 'next-auth/middleware'
import { getSession } from 'next-auth/react'
import { NextRequest, NextResponse } from 'next/server'

export async function requireAuth(req: NextRequest) {
  try {
    const session = await getSession()

    const allowedPagesWithoutAuth = ['/auth/signin', '/auth/signup']

    if (!session && !allowedPagesWithoutAuth.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect('/auth/signin')
    }

    return null
  } catch (error) {
    console.error('Error in requireAuth middleware:', error)
    return NextResponse.error()
  }
}
