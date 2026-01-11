import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TaskPriority, WorkflowType, SupervisionLevel, TaskStatus, Prisma } from '@prisma/client'

// Helper functions to map frontend values to enum values
const mapPriority = (value: string): TaskPriority => {
  const map: Record<string, TaskPriority> = {
    low: 'LOW',
    medium: 'MEDIUM',
    high: 'HIGH',
    urgent: 'URGENT',
  }
  return map[value?.toLowerCase()] || 'MEDIUM'
}

const mapWorkflowType = (value: string): WorkflowType => {
  const map: Record<string, WorkflowType> = {
    single: 'SINGLE',
    sequential: 'SEQUENTIAL',
    parallel: 'PARALLEL',
    collaborative: 'COLLABORATIVE',
  }
  return map[value?.toLowerCase()] || 'SINGLE'
}

const mapSupervisionLevel = (value: string): SupervisionLevel => {
  const map: Record<string, SupervisionLevel> = {
    full: 'FULL',
    moderate: 'MODERATE',
    minimal: 'MINIMAL',
    none: 'NONE',
  }
  return map[value?.toLowerCase()] || 'MODERATE'
}

const mapStatus = (value: string | null): TaskStatus | undefined => {
  if (!value) return undefined
  const map: Record<string, TaskStatus> = {
    pending: 'PENDING',
    in_progress: 'IN_PROGRESS',
    awaiting_review: 'AWAITING_REVIEW',
    completed: 'COMPLETED',
    failed: 'FAILED',
    cancelled: 'CANCELLED',
  }
  return map[value.toLowerCase()]
}

// GET /api/tasks - 태스크 목록 조회
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')
    const status = searchParams.get('status')
    const agentId = searchParams.get('agentId')

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

    const where: Prisma.TaskWhereInput = { teamId }

    const mappedStatus = mapStatus(status)
    if (mappedStatus) {
      where.status = mappedStatus
    }

    if (agentId) {
      where.assignments = { some: { agentId } }
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignments: {
          include: {
            agent: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            results: true,
            workflow: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Tasks fetch error:', error)
    return NextResponse.json(
      { error: '태스크 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/tasks - 새 태스크 생성
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const {
      teamId,
      title,
      description,
      instruction,
      priority,
      dueDate,
      workflowType,
      supervisionLevel,
      assignedAgentIds,
    } = await request.json()

    if (!teamId || !title) {
      return NextResponse.json(
        { error: 'teamId와 title은 필수입니다.' },
        { status: 400 }
      )
    }

    // Check if user has access to the team
    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        OR: [
          { ownerId: session.user.id },
          { members: { some: { userId: session.user.id, role: { in: ['owner', 'admin'] } } } },
        ],
      },
    })

    if (!team) {
      return NextResponse.json({ error: '팀에 태스크를 추가할 권한이 없습니다.' }, { status: 403 })
    }

    // Validate assigned agents belong to the team
    if (assignedAgentIds && assignedAgentIds.length > 0) {
      const agents = await prisma.agent.findMany({
        where: {
          id: { in: assignedAgentIds },
          teamId,
        },
      })

      if (agents.length !== assignedAgentIds.length) {
        return NextResponse.json(
          { error: '일부 에이전트가 팀에 속해 있지 않습니다.' },
          { status: 400 }
        )
      }
    }

    const task = await prisma.task.create({
      data: {
        teamId,
        creatorId: session.user.id,
        title: title.trim(),
        description: description?.trim() || null,
        instruction: instruction?.trim() || null,
        priority: mapPriority(priority),
        dueDate: dueDate ? new Date(dueDate) : null,
        workflowType: mapWorkflowType(workflowType),
        supervisionLevel: mapSupervisionLevel(supervisionLevel),
        assignments: assignedAgentIds?.length > 0 ? {
          create: assignedAgentIds.map((agentId: string, index: number) => ({
            agentId,
            role: index === 0 ? 'primary' : 'support',
            order: index,
          })),
        } : undefined,
      },
      include: {
        assignments: {
          include: {
            agent: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Task creation error:', error)
    return NextResponse.json(
      { error: '태스크 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
