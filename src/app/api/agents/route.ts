import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/agents - 에이전트 목록 조회
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')

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

    const agents = await prisma.agent.findMany({
      where: { teamId },
      include: {
        persona: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(agents)
  } catch (error) {
    console.error('Agents fetch error:', error)
    return NextResponse.json(
      { error: '에이전트 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/agents - 새 에이전트 생성
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { teamId, name, role, skills, imageUrl, imageType, persona } = await request.json()

    if (!teamId || !name || !role) {
      return NextResponse.json(
        { error: 'teamId, name, role은 필수입니다.' },
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
      return NextResponse.json({ error: '팀에 에이전트를 추가할 권한이 없습니다.' }, { status: 403 })
    }

    const agent = await prisma.agent.create({
      data: {
        teamId,
        name: name.trim(),
        role: role.trim(),
        skills: skills || [],
        imageUrl: imageUrl || null,
        imageType: imageType || null,
        persona: persona ? {
          create: {
            name: persona.name || name,
            role: persona.role || role,
            personality: persona.personality || '',
            expertise: persona.expertise || [],
            communicationStyle: persona.communicationStyle || '',
            background: persona.background || null,
            sourceType: persona.sourceType || null,
            sourceData: persona.sourceData || null,
            systemPrompt: generateSystemPrompt(persona),
          },
        } : undefined,
      },
      include: {
        persona: true,
      },
    })

    return NextResponse.json(agent, { status: 201 })
  } catch (error) {
    console.error('Agent creation error:', error)
    return NextResponse.json(
      { error: '에이전트 생성 중 오류가 발생했습니다.' },
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
