import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ teamId: string }>
}

// GET /api/teams/[teamId] - 팀 상세 조회
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { teamId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        OR: [
          { ownerId: session.user.id },
          { members: { some: { userId: session.user.id } } },
        ],
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true, image: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
        agents: {
          include: {
            persona: true,
          },
        },
        _count: {
          select: { tasks: true, results: true },
        },
      },
    })

    if (!team) {
      return NextResponse.json(
        { error: '팀을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(team)
  } catch (error) {
    console.error('Team fetch error:', error)
    return NextResponse.json(
      { error: '팀 정보를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PUT /api/teams/[teamId] - 팀 수정
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { teamId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    // Check if user is owner or admin
    const existingTeam = await prisma.team.findFirst({
      where: {
        id: teamId,
        OR: [
          { ownerId: session.user.id },
          {
            members: {
              some: {
                userId: session.user.id,
                role: { in: ['owner', 'admin'] },
              },
            },
          },
        ],
      },
    })

    if (!existingTeam) {
      return NextResponse.json(
        { error: '팀을 수정할 권한이 없습니다.' },
        { status: 403 }
      )
    }

    const { name, description, purpose, type } = await request.json()

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: '팀 이름은 필수입니다.' },
        { status: 400 }
      )
    }

    const team = await prisma.team.update({
      where: { id: teamId },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        purpose: purpose?.trim() || null,
        type: type || existingTeam.type,
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

    return NextResponse.json(team)
  } catch (error) {
    console.error('Team update error:', error)
    return NextResponse.json(
      { error: '팀 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE /api/teams/[teamId] - 팀 삭제
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { teamId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    // Only owner can delete team
    const existingTeam = await prisma.team.findFirst({
      where: {
        id: teamId,
        ownerId: session.user.id,
      },
    })

    if (!existingTeam) {
      return NextResponse.json(
        { error: '팀을 삭제할 권한이 없습니다.' },
        { status: 403 }
      )
    }

    await prisma.team.delete({
      where: { id: teamId },
    })

    return NextResponse.json({ message: '팀이 삭제되었습니다.' })
  } catch (error) {
    console.error('Team delete error:', error)
    return NextResponse.json(
      { error: '팀 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
