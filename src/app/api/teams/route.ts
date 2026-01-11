import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/teams - 팀 목록 조회
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const teams = await prisma.team.findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          { members: { some: { userId: session.user.id } } },
        ],
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true, image: true },
        },
        _count: {
          select: { agents: true, members: true, tasks: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(teams)
  } catch (error) {
    console.error('Teams fetch error:', error)
    return NextResponse.json(
      { error: '팀 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/teams - 새 팀 생성
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { name, description, purpose, type } = await request.json()

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: '팀 이름은 필수입니다.' },
        { status: 400 }
      )
    }

    const team = await prisma.team.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        purpose: purpose?.trim() || null,
        type: type || 'general',
        ownerId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: 'owner',
          },
        },
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true, image: true },
        },
        _count: {
          select: { agents: true, members: true, tasks: true },
        },
      },
    })

    return NextResponse.json(team, { status: 201 })
  } catch (error) {
    console.error('Team creation error:', error)
    return NextResponse.json(
      { error: '팀 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
