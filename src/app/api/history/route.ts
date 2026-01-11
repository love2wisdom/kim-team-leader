import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/history - 이력 목록 조회
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')
    const teamId = searchParams.get('teamId')
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    if (!taskId && !teamId) {
      return NextResponse.json({ error: 'taskId 또는 teamId가 필요합니다.' }, { status: 400 })
    }

    // Build where clause
    let where = {}

    if (taskId) {
      // Check if user has access to the task's team
      const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
          team: {
            select: {
              ownerId: true,
              members: { select: { userId: true } },
            },
          },
        },
      })

      if (!task) {
        return NextResponse.json({ error: '태스크를 찾을 수 없습니다.' }, { status: 404 })
      }

      const hasAccess = task.team.ownerId === session.user.id ||
        task.team.members.some(m => m.userId === session.user.id)

      if (!hasAccess) {
        return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 403 })
      }

      where = { taskId }
    } else if (teamId) {
      // Check if user has access to the team
      const team = await prisma.team.findFirst({
        where: {
          id: teamId,
          OR: [
            { ownerId: session.user.id },
            { members: { some: { userId: session.user.id } } },
          ],
        },
      })

      if (!team) {
        return NextResponse.json({ error: '팀에 접근할 권한이 없습니다.' }, { status: 403 })
      }

      where = {
        task: {
          teamId,
        },
      }
    }

    const history = await prisma.history.findMany({
      where,
      include: {
        task: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json(history)
  } catch (error) {
    console.error('History fetch error:', error)
    return NextResponse.json(
      { error: '이력을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/history - 이력 추가 (내부 사용)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { taskId, action, description, metadata } = await request.json()

    if (!taskId || !action || !description) {
      return NextResponse.json(
        { error: 'taskId, action, description은 필수입니다.' },
        { status: 400 }
      )
    }

    // Check if user has access to the task's team
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        team: {
          select: {
            ownerId: true,
            members: { select: { userId: true } },
          },
        },
      },
    })

    if (!task) {
      return NextResponse.json({ error: '태스크를 찾을 수 없습니다.' }, { status: 404 })
    }

    const hasAccess = task.team.ownerId === session.user.id ||
      task.team.members.some(m => m.userId === session.user.id)

    if (!hasAccess) {
      return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 403 })
    }

    const history = await prisma.history.create({
      data: {
        taskId,
        action,
        description,
        metadata: metadata || null,
      },
    })

    return NextResponse.json(history, { status: 201 })
  } catch (error) {
    console.error('History creation error:', error)
    return NextResponse.json(
      { error: '이력 추가 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
