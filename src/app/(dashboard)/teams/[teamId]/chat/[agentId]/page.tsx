'use client'

import { useEffect, useState, useRef, useCallback, use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  MoreVertical,
  Info,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api, isApiError } from '@/lib/api'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Agent {
  id: string
  name: string
  role: string
  status: string
  imageUrl: string | null
  skills: string[]
  persona?: {
    personality: string | null
    expertise: string[]
    communicationStyle: string | null
    systemPrompt: string | null
  } | null
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AgentChatPage({
  params,
}: {
  params: Promise<{ teamId: string; agentId: string }>
}) {
  const { teamId, agentId } = use(params)
  const [agent, setAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchAgent = useCallback(async () => {
    try {
      const data = await api.get<Agent>(`/agents/${agentId}`)
      setAgent(data)

      // Welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `안녕하세요! 저는 ${data.name}입니다. ${data.role}로서 어떻게 도와드릴까요?`,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    } catch (error) {
      const message = isApiError(error) ? error.message : '에이전트 정보를 불러오는데 실패했습니다.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [agentId])

  useEffect(() => {
    fetchAgent()
  }, [fetchAgent])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isSending || !agent) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsSending(true)

    try {
      // Call chat API
      const response = await api.post<{ message: string }>('/chat', {
        agentId,
        message: input.trim(),
        history: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      })

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      // Simulate response for now since chat API is not implemented
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: generateMockResponse(agent, input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsSending(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center gap-4 p-4 border-b">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex-1 p-4">
          <Skeleton className="h-20 w-3/4 mb-4" />
          <Skeleton className="h-16 w-2/3 ml-auto" />
        </div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">에이전트를 찾을 수 없습니다</h2>
        <Button asChild variant="outline">
          <Link href={`/teams/${teamId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            팀으로 돌아가기
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon">
              <Link href={`/teams/${teamId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={agent.imageUrl || ''} />
              <AvatarFallback>{agent.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{agent.name}</h2>
              <p className="text-sm text-muted-foreground">{agent.role}</p>
            </div>
            <Badge
              variant="secondary"
              className={cn(
                'ml-2',
                agent.status === 'active' && 'bg-green-100 text-green-700',
                agent.status === 'busy' && 'bg-blue-100 text-blue-700'
              )}
            >
              {agent.status === 'active' ? '온라인' : agent.status === 'busy' ? '작업 중' : '대기'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setMessages([])}>
                  대화 초기화
                </DropdownMenuItem>
                <DropdownMenuItem>대화 내보내기</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' && 'flex-row-reverse'
                )}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  {message.role === 'assistant' ? (
                    <>
                      <AvatarImage src={agent.imageUrl || ''} />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div
                  className={cn(
                    'rounded-2xl px-4 py-2 max-w-[80%]',
                    message.role === 'assistant'
                      ? 'bg-muted'
                      : 'bg-primary text-primary-foreground'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={cn(
                      'text-xs mt-1',
                      message.role === 'assistant'
                        ? 'text-muted-foreground'
                        : 'text-primary-foreground/70'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={agent.imageUrl || ''} />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      {agent.name}이(가) 입력 중...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`${agent.name}에게 메시지 보내기...`}
              disabled={isSending}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim() || isSending}>
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Agent Info Sidebar */}
      {showInfo && (
        <div className="w-80 border-l bg-background p-4 overflow-y-auto">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-2">
                <AvatarImage src={agent.imageUrl || ''} />
                <AvatarFallback className="text-2xl">{agent.name[0]}</AvatarFallback>
              </Avatar>
              <CardTitle>{agent.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{agent.role}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {agent.persona?.personality && (
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    성격
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {agent.persona.personality}
                  </p>
                </div>
              )}

              {agent.persona?.expertise && agent.persona.expertise.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">전문 분야</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.persona.expertise.map((exp) => (
                      <Badge key={exp} variant="secondary" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {agent.skills.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">스킬</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {agent.persona?.communicationStyle && (
                <div>
                  <h4 className="text-sm font-medium mb-1">대화 스타일</h4>
                  <p className="text-sm text-muted-foreground">
                    {agent.persona.communicationStyle}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Mock response generator for demo purposes
function generateMockResponse(agent: Agent, userInput: string): string {
  const responses: Record<string, string[]> = {
    planner: [
      '네, 그 프로젝트에 대해 분석해 보겠습니다. 우선 목표와 일정을 명확히 정리해 볼까요?',
      '좋은 아이디어입니다. SWOT 분석을 통해 강점, 약점, 기회, 위협 요소를 파악해 보겠습니다.',
      '프로젝트 로드맵을 작성해 드릴게요. 마일스톤과 주요 일정을 확인해 주세요.',
    ],
    developer: [
      '코드를 분석해 보겠습니다. 어떤 부분에서 문제가 발생하나요?',
      '네, API 설계에 대해 논의해 보겠습니다. RESTful 원칙을 따르는 것이 좋겠네요.',
      '그 기능 구현을 위해 필요한 기술 스택을 정리해 드릴게요.',
    ],
    designer: [
      'UI/UX 관점에서 사용자 경험을 개선할 수 있는 방안을 제안드릴게요.',
      '와이어프레임을 먼저 작성해 볼까요? 전체적인 구조를 잡고 시작하면 좋겠습니다.',
      '컬러 팔레트와 타이포그래피를 먼저 정의해 보겠습니다.',
    ],
    marketer: [
      '타겟 고객층을 분석해 보겠습니다. 어떤 고객을 대상으로 하시나요?',
      '마케팅 전략을 수립해 드릴게요. SNS와 콘텐츠 마케팅을 병행하면 효과적일 것 같습니다.',
      '캠페인 아이디어를 제안드릴게요. 고객의 관심을 끌 수 있는 메시지가 중요합니다.',
    ],
    analyst: [
      '데이터를 분석해 보겠습니다. 어떤 지표가 가장 중요한가요?',
      '인사이트를 도출해 드릴게요. 트렌드와 패턴을 확인해 보겠습니다.',
      '리포트를 작성해 드릴게요. 핵심 발견사항을 정리해 보겠습니다.',
    ],
    writer: [
      '콘텐츠 기획을 시작해 보겠습니다. 어떤 주제로 글을 작성할까요?',
      '스토리텔링 관점에서 접근해 보겠습니다. 독자의 관심을 끌 수 있는 흐름이 중요해요.',
      '초안을 작성해 드릴게요. 톤앤매너를 맞춰서 진행하겠습니다.',
    ],
    default: [
      '네, 말씀해 주신 내용을 잘 이해했습니다. 어떻게 도와드릴까요?',
      '좋은 질문이네요. 제 전문성을 바탕으로 답변드리겠습니다.',
      '그 부분에 대해 자세히 살펴보겠습니다.',
    ],
  }

  const agentType = agent.id || 'default'
  const possibleResponses = responses[agentType] || responses.default
  const randomIndex = Math.floor(Math.random() * possibleResponses.length)

  return possibleResponses[randomIndex]
}
