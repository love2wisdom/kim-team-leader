import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// POST /api/chat - 에이전트와 대화
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { agentId, message, history } = await request.json() as {
      agentId: string
      message: string
      history?: ChatMessage[]
    }

    if (!agentId || !message) {
      return NextResponse.json(
        { error: 'agentId와 message는 필수입니다.' },
        { status: 400 }
      )
    }

    // Get agent with persona
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      include: {
        persona: true,
        team: {
          select: {
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

    // Check access
    const hasAccess = agent.team.ownerId === session.user.id ||
      agent.team.members.some(m => m.userId === session.user.id)

    if (!hasAccess) {
      return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 403 })
    }

    // Build system prompt
    const systemPrompt = agent.persona?.systemPrompt || buildDefaultSystemPrompt(agent)

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Build chat history for Gemini
    const chatHistory = history?.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })) || []

    // Start chat with system context
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `[시스템 프롬프트]\n${systemPrompt}\n\n이 지침을 따라 대화해 주세요. 이해했다면 "네, 이해했습니다."라고 답해주세요.` }],
        },
        {
          role: 'model',
          parts: [{ text: '네, 이해했습니다. 주어진 역할과 지침에 따라 대화하겠습니다.' }],
        },
        ...chatHistory,
      ],
    })

    // Send message and get response
    const result = await chat.sendMessage(message)
    const response = result.response.text()

    // Save to history (optional - can be implemented later)
    // await prisma.chatHistory.create({...})

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: '대화 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

function buildDefaultSystemPrompt(agent: {
  name: string
  role: string
  persona?: {
    personality: string | null
    expertise: string[]
    communicationStyle: string | null
    background: string | null
  } | null
}): string {
  const parts: string[] = []

  parts.push(`당신은 ${agent.name}입니다. ${agent.role}로서 업무를 수행합니다.`)

  if (agent.persona?.personality) {
    parts.push(`성격: ${agent.persona.personality}`)
  }

  if (agent.persona?.expertise && agent.persona.expertise.length > 0) {
    parts.push(`전문 분야: ${agent.persona.expertise.join(', ')}`)
  }

  if (agent.persona?.communicationStyle) {
    parts.push(`대화 스타일: ${agent.persona.communicationStyle}`)
  }

  if (agent.persona?.background) {
    parts.push(`배경: ${agent.persona.background}`)
  }

  parts.push('주어진 업무를 성실히 수행하고, 전문성을 바탕으로 최선의 결과물을 제공하세요.')
  parts.push('항상 한국어로 대화하세요.')

  return parts.join('\n\n')
}
