import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ResultStatus } from '@prisma/client'

interface RouteParams {
  params: Promise<{ resultId: string }>
}

// Map frontend values to enum
const mapResultStatus = (value: string | undefined): ResultStatus | undefined => {
  if (!value) return undefined
  const map: Record<string, ResultStatus> = {
    pending: 'PENDING',
    approved: 'APPROVED',
    rejected: 'REJECTED',
    revision_requested: 'REVISION_REQUESTED',
  }
  return map[value.toLowerCase()]
}

// GET /api/results/[resultId] - 결과 상세 조회
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { resultId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const result = await prisma.result.findUnique({
      where: { id: resultId },
      include: {
        task: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true,
            completedAt: true,
            assignments: {
              include: {
                agent: {
                  select: {
                    id: true,
                    name: true,
                    role: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        },
        team: {
          select: {
            id: true,
            name: true,
            ownerId: true,
            members: {
              select: { userId: true },
            },
          },
        },
      },
    })

    if (!result) {
      return NextResponse.json({ error: '결과를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check if user has access to the team
    const hasAccess = result.team.ownerId === session.user.id ||
      result.team.members.some(m => m.userId === session.user.id)

    if (!hasAccess) {
      return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 403 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Result fetch error:', error)
    return NextResponse.json(
      { error: '결과 정보를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PUT /api/results/[resultId] - 결과 상태 업데이트 (승인/반려)
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { resultId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const existingResult = await prisma.result.findUnique({
      where: { id: resultId },
      include: {
        team: {
          select: {
            ownerId: true,
            members: {
              where: { role: { in: ['owner', 'admin'] } },
              select: { userId: true },
            },
          },
        },
      },
    })

    if (!existingResult) {
      return NextResponse.json({ error: '결과를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check if user has permission
    const hasPermission = existingResult.team.ownerId === session.user.id ||
      existingResult.team.members.some(m => m.userId === session.user.id)

    if (!hasPermission) {
      return NextResponse.json({ error: '수정 권한이 없습니다.' }, { status: 403 })
    }

    const { status, feedback } = await request.json()

    const mappedStatus = mapResultStatus(status)

    const result = await prisma.result.update({
      where: { id: resultId },
      data: {
        status: mappedStatus || existingResult.status,
        feedback: feedback !== undefined ? feedback?.trim() || null : existingResult.feedback,
        approvedAt: mappedStatus === 'APPROVED' ? new Date() : existingResult.approvedAt,
      },
      include: {
        task: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    // If approved, optionally update task status
    if (mappedStatus === 'APPROVED') {
      await prisma.task.update({
        where: { id: existingResult.taskId },
        data: {
          status: 'COMPLETED',
        },
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Result update error:', error)
    return NextResponse.json(
      { error: '결과 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE /api/results/[resultId] - 결과 삭제
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { resultId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const existingResult = await prisma.result.findUnique({
      where: { id: resultId },
      include: {
        team: {
          select: {
            ownerId: true,
            members: {
              where: { role: { in: ['owner', 'admin'] } },
              select: { userId: true },
            },
          },
        },
      },
    })

    if (!existingResult) {
      return NextResponse.json({ error: '결과를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check if user has permission
    const hasPermission = existingResult.team.ownerId === session.user.id ||
      existingResult.team.members.some(m => m.userId === session.user.id)

    if (!hasPermission) {
      return NextResponse.json({ error: '삭제 권한이 없습니다.' }, { status: 403 })
    }

    await prisma.result.delete({
      where: { id: resultId },
    })

    return NextResponse.json({ message: '결과가 삭제되었습니다.' })
  } catch (error) {
    console.error('Result delete error:', error)
    return NextResponse.json(
      { error: '결과 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
