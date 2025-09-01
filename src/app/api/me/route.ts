import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import prisma from '@/db/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Ensure a user record exists and return it
  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    create: {
      email: session.user.email,
      name: session.user.name ?? undefined,
      avatar: (session.user as any).image ?? undefined,
    },
    update: {
      name: session.user.name ?? undefined,
      avatar: (session.user as any).image ?? undefined,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return NextResponse.json(user)
}


