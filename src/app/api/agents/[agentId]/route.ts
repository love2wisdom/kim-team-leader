import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ agentId: string }>
}

// GET /api/agents/[agentId] - 에이전트 상세 조회
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { agentId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      include: {
        persona: true,
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

    if (!agent) {
      return NextResponse.json({ error: '에이전트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check if user has access to the team
    const hasAccess = agent.team.ownerId === session.user.id ||
      agent.team.members.some(m => m.userId === session.user.id)

    if (!hasAccess) {
      return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 403 })
    }

    return NextResponse.json(agent)
  } catch (error) {
    console.error('Agent fetch error:', error)
    return NextResponse.json(
      { error: '에이전트 정보를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PUT /api/agents/[agentId] - 에이전트 수정
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { agentId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const existingAgent = await prisma.agent.findUnique({
      where: { id: agentId },
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

    if (!existingAgent) {
      return NextResponse.json({ error: '에이전트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check if user has permission
    const hasPermission = existingAgent.team.ownerId === session.user.id ||
      existingAgent.team.members.some(m => m.userId === session.user.id)

    if (!hasPermission) {
      return NextResponse.json({ error: '수정 권한이 없습니다.' }, { status: 403 })
    }

    const { name, role, skills, imageUrl, imageType, status, persona } = await request.json()

    const agent = await prisma.agent.update({
      where: { id: agentId },
      data: {
        name: name?.trim() || existingAgent.name,
        role: role?.trim() || existingAgent.role,
        skills: skills !== undefined ? skills : existingAgent.skills,
        imageUrl: imageUrl !== undefined ? imageUrl : existingAgent.imageUrl,
        imageType: imageType !== undefined ? imageType : existingAgent.imageType,
        status: status || existingAgent.status,
        persona: persona ? {
          upsert: {
            create: {
              name: persona.name || name || existingAgent.name,
              role: persona.role || role || existingAgent.role,
              personality: persona.personality || '',
              expertise: persona.expertise || [],
              communicationStyle: persona.communicationStyle || '',
              background: persona.background || null,
              sourceType: persona.sourceType || null,
              sourceData: persona.sourceData || null,
              systemPrompt: generateSystemPrompt(persona),
            },
            update: {
              name: persona.name,
              role: persona.role,
              personality: persona.personality,
              expertise: persona.expertise,
              communicationStyle: persona.communicationStyle,
              background: persona.background,
              systemPrompt: generateSystemPrompt(persona),
            },
          },
        } : undefined,
      },
      include: {
        persona: true,
      },
    })

    return NextResponse.json(agent)
  } catch (error) {
    console.error('Agent update error:', error)
    return NextResponse.json(
      { error: '에이전트 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE /api/agents/[agentId] - 에이전트 삭제
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { agentId } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const existingAgent = await prisma.agent.findUnique({
      where: { id: agentId },
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

    if (!existingAgent) {
      return NextResponse.json({ error: '에이전트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check if user has permission
    const hasPermission = existingAgent.team.ownerId === session.user.id ||
      existingAgent.team.members.some(m => m.userId === session.user.id)

    if (!hasPermission) {
      return NextResponse.json({ error: '삭제 권한이 없습니다.' }, { status: 403 })
    }

    await prisma.agent.delete({
      where: { id: agentId },
    })

    return NextResponse.json({ message: '에이전트가 삭제되었습니다.' })
  } catch (error) {
    console.error('Agent delete error:', error)
    return NextResponse.json(
      { error: '에이전트 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

function generateSystemPrompt(persona: {
  name?: string
  role?: string
  personality?: string
  expertise?: string[]
  communicationStyle?: string
  background?: string
}): string {
  const parts: string[] = []

  if (persona.name && persona.role) {
    parts.push(`당신은 ${persona.name}입니다. ${persona.role}로서 업무를 수행합니다.`)
  }

  if (persona.personality) {
    parts.push(`성격: ${persona.personality}`)
  }

  if (persona.expertise && persona.expertise.length > 0) {
    parts.push(`전문 분야: ${persona.expertise.join(', ')}`)
  }

  if (persona.communicationStyle) {
    parts.push(`대화 스타일: ${persona.communicationStyle}`)
  }

  if (persona.background) {
    parts.push(`배경: ${persona.background}`)
  }

  parts.push('주어진 업무를 성실히 수행하고, 전문성을 바탕으로 최선의 결과물을 제공하세요.')

  return parts.join('\n\n')
}
