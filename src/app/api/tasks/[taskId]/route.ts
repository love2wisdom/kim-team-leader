import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TaskPriority, WorkflowType, SupervisionLevel, TaskStatus } from '@prisma/client'

// Helper functions to map frontend values to enum values
const mapPriority = (value: string | undefined): TaskPriority | undefined => {
  if (!value) return undefined
  const map: Record<string, TaskPriority> = {
    low: 'LOW',
    medium: 'MEDIUM',
    high: 'HIGH',
    urgent: 'URGENT',
  }
  return map[value.toLowerCase()]
}

const mapWorkflowType = (value: string | undefined): WorkflowType | undefined => {
  if (!value) return undefined
  const map: Record<string, WorkflowType> = {
    single: 'SINGLE',
    sequential: 'SEQUENTIAL',
    parallel: 'PARALLEL',
    collaborative: 'COLLABORATIVE',
  }
  return map[value.toLowerCase()]
}

const mapSupervisionLevel = (value: string | undefined): SupervisionLevel | undefined => {
  if (!value) return undefined
  const map: Record<string, SupervisionLevel> = {
    full: 'FULL',
    moderate: 'MODERATE',
    minimal: 'MINIMAL',
    none: 'NONE',
  }
  return map[value.toLowerCase()]
}

const mapStatus = (value: string | undefined): TaskStatus | undefined => {
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

interface RouteParams {
  params: Promise<{ taskId: string }>
}

// GET /api/tasks/[taskId] - 태스크 상세 조회
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { taskId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
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
        assignments: {
          include: {
            agent: {
              select: {
                id: true,
                name: true,
                role: true,
                imageUrl: true,
                skills: true,
              },
            },
          },
          orderBy: { order: 'asc' },
        },
        workflow: {
          orderBy: { order: 'asc' },
        },
        results: {
          orderBy: { createdAt: 'desc' },
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

    if (!task) {
      return NextResponse.json({ error: '태스크를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check if user has access to the team
    const hasAccess = task.team.ownerId === session.user.id ||
      task.team.members.some(m => m.userId === session.user.id)

    if (!hasAccess) {
      return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 403 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Task fetch error:', error)
    return NextResponse.json(
      { error: '태스크 정보를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PUT /api/tasks/[taskId] - 태스크 수정
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { taskId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
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

    if (!existingTask) {
      return NextResponse.json({ error: '태스크를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check if user has permission
    const hasPermission = existingTask.team.ownerId === session.user.id ||
      existingTask.team.members.some(m => m.userId === session.user.id)

    if (!hasPermission) {
      return NextResponse.json({ error: '수정 권한이 없습니다.' }, { status: 403 })
    }

    const {
      title,
      description,
      instruction,
      status,
      priority,
      dueDate,
      workflowType,
      supervisionLevel,
      assignedAgentIds,
    } = await request.json()

    // Map values
    const mappedStatus = mapStatus(status)
    const mappedPriority = mapPriority(priority)
    const mappedWorkflowType = mapWorkflowType(workflowType)
    const mappedSupervisionLevel = mapSupervisionLevel(supervisionLevel)

    // Update task
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title?.trim() || existingTask.title,
        description: description !== undefined ? description?.trim() || null : existingTask.description,
        instruction: instruction !== undefined ? instruction?.trim() || null : existingTask.instruction,
        status: mappedStatus || existingTask.status,
        priority: mappedPriority || existingTask.priority,
        dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : existingTask.dueDate,
        workflowType: mappedWorkflowType || existingTask.workflowType,
        supervisionLevel: mappedSupervisionLevel || existingTask.supervisionLevel,
        startedAt: mappedStatus === 'IN_PROGRESS' && !existingTask.startedAt ? new Date() : existingTask.startedAt,
        completedAt: mappedStatus === 'COMPLETED' ? new Date() : existingTask.completedAt,
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
      },
    })

    // Update assignments if provided
    if (assignedAgentIds !== undefined) {
      // Delete existing assignments
      await prisma.taskAssignment.deleteMany({
        where: { taskId },
      })

      // Create new assignments
      if (assignedAgentIds.length > 0) {
        await prisma.taskAssignment.createMany({
          data: assignedAgentIds.map((agentId: string, index: number) => ({
            taskId,
            agentId,
            role: index === 0 ? 'primary' : 'support',
            order: index,
          })),
        })
      }
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Task update error:', error)
    return NextResponse.json(
      { error: '태스크 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE /api/tasks/[taskId] - 태스크 삭제
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { taskId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
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

    if (!existingTask) {
      return NextResponse.json({ error: '태스크를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check if user has permission
    const hasPermission = existingTask.team.ownerId === session.user.id ||
      existingTask.team.members.some(m => m.userId === session.user.id)

    if (!hasPermission) {
      return NextResponse.json({ error: '삭제 권한이 없습니다.' }, { status: 403 })
    }

    await prisma.task.delete({
      where: { id: taskId },
    })

    return NextResponse.json({ message: '태스크가 삭제되었습니다.' })
  } catch (error) {
    console.error('Task delete error:', error)
    return NextResponse.json(
      { error: '태스크 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
