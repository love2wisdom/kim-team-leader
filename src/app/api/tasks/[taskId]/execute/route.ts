import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

interface RouteParams {
  params: Promise<{ taskId: string }>
}

// POST /api/tasks/[taskId]/execute - 태스크 실행
export async function POST(request: Request, { params }: RouteParams) {
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
            ownerId: true,
            members: {
              select: { userId: true },
            },
          },
        },
        assignments: {
          include: {
            agent: {
              include: {
                persona: true,
              },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!task) {
      return NextResponse.json({ error: '태스크를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Check access
    const hasAccess = task.team.ownerId === session.user.id ||
      task.team.members.some(m => m.userId === session.user.id)

    if (!hasAccess) {
      return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 403 })
    }

    if (task.assignments.length === 0) {
      return NextResponse.json(
        { error: '담당 에이전트가 지정되지 않았습니다.' },
        { status: 400 }
      )
    }

    // Update task status to in_progress
    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    })

    // Create history entry for task start
    await prisma.history.create({
      data: {
        taskId,
        action: 'started',
        description: `${session.user.name || '사용자'}님이 업무를 시작했습니다.`,
        metadata: {
          workflowType: task.workflowType,
          assignedAgents: task.assignments.map(a => a.agent.name),
        },
      },
    })

    // Execute task based on workflow type
    let result: string

    if (task.workflowType === 'SINGLE' || task.assignments.length === 1) {
      // Single agent execution
      result = await executeSingleAgent(task)
    } else if (task.workflowType === 'SEQUENTIAL') {
      // Sequential execution - agents work one after another
      result = await executeSequential(task)
    } else if (task.workflowType === 'PARALLEL') {
      // Parallel execution - agents work simultaneously
      result = await executeParallel(task)
    } else if (task.workflowType === 'COLLABORATIVE') {
      // Collaborative execution - agents discuss and work together
      result = await executeCollaborative(task)
    } else {
      result = await executeSingleAgent(task)
    }

    // Save result
    const taskResult = await prisma.result.create({
      data: {
        taskId,
        teamId: task.teamId,
        contentType: 'text',
        title: `${task.title} 결과`,
        content: result,
        status: 'PENDING', // Pending user review/approval
      },
    })

    // Update task status to completed
    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    })

    // Create history entry for task completion
    await prisma.history.create({
      data: {
        taskId,
        action: 'completed',
        description: '업무가 완료되었습니다. 결과물 검토가 필요합니다.',
        metadata: {
          resultId: taskResult.id,
        },
      },
    })

    // Update agent status
    await prisma.agent.updateMany({
      where: {
        id: { in: task.assignments.map(a => a.agentId) },
      },
      data: {
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({
      message: '태스크가 완료되었습니다.',
      result: taskResult,
    })
  } catch (error) {
    console.error('Task execution error:', error)

    // Revert task status on error
    const { taskId } = await params
    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      { error: '태스크 실행 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

async function executeSingleAgent(task: {
  title: string
  description: string | null
  instruction: string | null
  assignments: Array<{
    agent: {
      name: string
      role: string
      persona: {
        systemPrompt: string | null
        personality: string | null
        expertise: string[]
        communicationStyle: string | null
      } | null
    }
  }>
}): Promise<string> {
  const agent = task.assignments[0].agent
  const systemPrompt = agent.persona?.systemPrompt || buildSystemPrompt(agent)

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `${systemPrompt}

## 업무 지시
제목: ${task.title}
${task.description ? `설명: ${task.description}` : ''}
${task.instruction ? `지침: ${task.instruction}` : ''}

위 업무를 수행하고 결과를 작성해 주세요.`

  const result = await model.generateContent(prompt)
  return result.response.text()
}

async function executeSequential(task: {
  title: string
  description: string | null
  instruction: string | null
  assignments: Array<{
    agent: {
      name: string
      role: string
      persona: {
        systemPrompt: string | null
        personality: string | null
        expertise: string[]
        communicationStyle: string | null
      } | null
    }
  }>
}): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  let accumulatedResult = ''

  for (const assignment of task.assignments) {
    const agent = assignment.agent
    const systemPrompt = agent.persona?.systemPrompt || buildSystemPrompt(agent)

    const prompt = `${systemPrompt}

## 업무 지시
제목: ${task.title}
${task.description ? `설명: ${task.description}` : ''}
${task.instruction ? `지침: ${task.instruction}` : ''}

${accumulatedResult ? `## 이전 담당자의 작업 결과\n${accumulatedResult}\n\n위 결과를 참고하여 당신의 역할에 맞게 업무를 수행하고 결과를 작성해 주세요.` : '위 업무를 수행하고 결과를 작성해 주세요.'}`

    const result = await model.generateContent(prompt)
    const agentResult = result.response.text()
    accumulatedResult += `\n\n### ${agent.name} (${agent.role})의 결과:\n${agentResult}`
  }

  return accumulatedResult
}

async function executeParallel(task: {
  title: string
  description: string | null
  instruction: string | null
  assignments: Array<{
    agent: {
      name: string
      role: string
      persona: {
        systemPrompt: string | null
        personality: string | null
        expertise: string[]
        communicationStyle: string | null
      } | null
    }
  }>
}): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const promises = task.assignments.map(async (assignment) => {
    const agent = assignment.agent
    const systemPrompt = agent.persona?.systemPrompt || buildSystemPrompt(agent)

    const prompt = `${systemPrompt}

## 업무 지시
제목: ${task.title}
${task.description ? `설명: ${task.description}` : ''}
${task.instruction ? `지침: ${task.instruction}` : ''}

당신의 역할과 전문성에 맞게 업무를 수행하고 결과를 작성해 주세요.`

    const result = await model.generateContent(prompt)
    return {
      agent,
      result: result.response.text(),
    }
  })

  const results = await Promise.all(promises)

  let combinedResult = '## 병렬 작업 결과\n'
  for (const { agent, result } of results) {
    combinedResult += `\n### ${agent.name} (${agent.role})의 결과:\n${result}\n`
  }

  return combinedResult
}

async function executeCollaborative(task: {
  title: string
  description: string | null
  instruction: string | null
  assignments: Array<{
    agent: {
      name: string
      role: string
      persona: {
        systemPrompt: string | null
        personality: string | null
        expertise: string[]
        communicationStyle: string | null
      } | null
    }
  }>
}): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const agentDescriptions = task.assignments.map(a =>
    `- ${a.agent.name}: ${a.agent.role}`
  ).join('\n')

  const prompt = `당신은 여러 역할을 맡아 협업하는 팀입니다. 각 역할의 관점에서 토론하고 협력하여 최종 결과물을 만들어 주세요.

## 팀 구성
${agentDescriptions}

## 업무 지시
제목: ${task.title}
${task.description ? `설명: ${task.description}` : ''}
${task.instruction ? `지침: ${task.instruction}` : ''}

각 역할의 관점에서 의견을 제시하고, 협력하여 최종 결과물을 작성해 주세요.
다음 형식으로 작성해 주세요:

## 토론 내용
(각 역할의 의견과 토론 과정)

## 최종 결과물
(협업을 통해 도출된 최종 결과)`

  const result = await model.generateContent(prompt)
  return result.response.text()
}

function buildSystemPrompt(agent: {
  name: string
  role: string
  persona: {
    personality: string | null
    expertise: string[]
    communicationStyle: string | null
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

  parts.push('주어진 업무를 성실히 수행하고, 전문성을 바탕으로 최선의 결과물을 제공하세요.')
  parts.push('항상 한국어로 작성하세요.')

  return parts.join('\n\n')
}
