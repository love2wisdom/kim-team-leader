import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ResultStatus, Prisma } from '@prisma/client'

const mapResultStatus = (value: string | null): ResultStatus | undefined => {
  if (!value) return undefined
  const map: Record<string, ResultStatus> = {
    pending: 'PENDING',
    approved: 'APPROVED',
    rejected: 'REJECTED',
    revision_requested: 'REVISION_REQUESTED',
  }
  return map[value.toLowerCase()]
}

// GET /api/results - 결과 목록 조회
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')
    const taskId = searchParams.get('taskId')
    const status = searchParams.get('status')

    if (!teamId) {
      return NextResponse.json({ error: 'teamId가 필요합니다.' }, { status: 400 })
    }

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

    const where: Prisma.ResultWhereInput = { teamId }

    if (taskId) {
      where.taskId = taskId
    }

    const mappedStatus = mapResultStatus(status)
    if (mappedStatus) {
      where.status = mappedStatus
    }

    const results = await prisma.result.findMany({
      where,
      include: {
        task: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error('Results fetch error:', error)
    return NextResponse.json(
      { error: '결과 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
