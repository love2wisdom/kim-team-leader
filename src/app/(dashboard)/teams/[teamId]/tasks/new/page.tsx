'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft,
  ListTodo,
  Users,
  Calendar,
  Flag,
  Workflow,
  Shield,
  Check,
  Loader2,
} from 'lucide-react'
import { api, isApiError } from '@/lib/api'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Agent {
  id: string
  name: string
  role: string
  imageUrl: string | null
  status: string
  skills: string[]
}

export default function NewTaskPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = use(params)
  const router = useRouter()
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoadingAgents, setIsLoadingAgents] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instruction, setInstructions] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [workflowType, setWorkflowType] = useState('single')
  const [supervisionLevel, setSupervisionLevel] = useState('moderate')
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await api.get<Agent[]>(`/agents?teamId=${teamId}`)
        setAgents(data)
      } catch (error) {
        const message = isApiError(error) ? error.message : '에이전트 목록을 불러오는데 실패했습니다.'
        toast.error(message)
      } finally {
        setIsLoadingAgents(false)
      }
    }
    fetchAgents()
  }, [teamId])

  const handleAgentToggle = (agentId: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId]
    )
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('제목을 입력해주세요.')
      return
    }

    if (selectedAgents.length === 0) {
      toast.error('담당자를 선택해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      await api.post('/tasks', {
        teamId,
        title: title.trim(),
        description: description.trim() || null,
        instruction: instruction.trim() || null,
        priority,
        dueDate: dueDate || null,
        workflowType,
        supervisionLevel,
        assignedAgentIds: selectedAgents,
      })
      toast.success('업무가 생성되었습니다.')
      router.push(`/teams/${teamId}`)
    } catch (error) {
      const message = isApiError(error) ? error.message : '업무 생성에 실패했습니다.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const workflowOptions = [
    {
      value: 'single',
      label: '단일 수행',
      description: '한 명의 에이전트가 업무를 수행합니다.',
    },
    {
      value: 'sequential',
      label: '순차 수행',
      description: '에이전트들이 순서대로 업무를 수행합니다.',
    },
    {
      value: 'parallel',
      label: '병렬 수행',
      description: '에이전트들이 동시에 업무를 수행합니다.',
    },
    {
      value: 'collaborative',
      label: '협업 수행',
      description: '에이전트들이 토론하며 함께 결과를 만듭니다.',
    },
  ]

  const supervisionOptions = [
    {
      value: 'full',
      label: '완전 감독',
      description: '모든 단계에서 사용자 승인이 필요합니다.',
    },
    {
      value: 'moderate',
      label: '중간 감독',
      description: '주요 결정 시 사용자 확인이 필요합니다.',
    },
    {
      value: 'minimal',
      label: '최소 감독',
      description: '자율적으로 수행하고 결과만 보고합니다.',
    },
    {
      value: 'none',
      label: '자율 수행',
      description: '완전히 자율적으로 수행합니다.',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/teams/${teamId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">새 업무 만들기</h1>
          <p className="text-muted-foreground">
            AI 팀원에게 수행할 업무를 지시하세요.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="h-5 w-5" />
                업무 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 마케팅 전략 기획서 작성"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="업무에 대한 상세 설명을 입력하세요."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instruction">상세 지침</Label>
                <Textarea
                  id="instruction"
                  value={instruction}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="업무 수행에 필요한 구체적인 지침을 입력하세요."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* 담당자 선택 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                담당자 선택
              </CardTitle>
              <CardDescription>
                업무를 수행할 AI 팀원을 선택하세요. 여러 명을 선택하면 워크플로우에 따라 협업합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAgents ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
                </div>
              ) : agents.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    아직 팀원이 없습니다. 먼저 팀원을 추가하세요.
                  </p>
                  <Button asChild>
                    <Link href={`/teams/${teamId}/agents/new`}>팀원 추가</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {agents.map((agent, index) => (
                    <div
                      key={agent.id}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                        selectedAgents.includes(agent.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-muted/50 hover:bg-muted'
                      )}
                      onClick={() => handleAgentToggle(agent.id)}
                    >
                      <Checkbox
                        checked={selectedAgents.includes(agent.id)}
                        className="shrink-0"
                      />
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={agent.imageUrl || ''} />
                        <AvatarFallback>{agent.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{agent.name}</span>
                          {selectedAgents.indexOf(agent.id) === 0 && selectedAgents.length > 1 && (
                            <Badge variant="secondary" className="text-xs">
                              주담당
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {agent.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedAgents.length > 0 && (
                <p className="text-sm text-muted-foreground mt-3">
                  {selectedAgents.length}명 선택됨
                  {selectedAgents.length > 1 && ' (첫 번째 선택된 에이전트가 주담당)'}
                </p>
              )}
            </CardContent>
          </Card>

          {/* 워크플로우 설정 */}
          {selectedAgents.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  워크플로우
                </CardTitle>
                <CardDescription>
                  여러 에이전트가 협업하는 방식을 선택하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {workflowOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        'p-3 rounded-lg border-2 cursor-pointer transition-all',
                        workflowType === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-muted/50 hover:bg-muted'
                      )}
                      onClick={() => setWorkflowType(option.value)}
                    >
                      <div className="font-medium">{option.label}</div>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 감독 수준 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                감독 수준
              </CardTitle>
              <CardDescription>
                AI 팀원의 자율성 수준을 설정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {supervisionOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      'p-3 rounded-lg border-2 cursor-pointer transition-all',
                      supervisionLevel === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent bg-muted/50 hover:bg-muted'
                    )}
                    onClick={() => setSupervisionLevel(option.value)}
                  >
                    <div className="font-medium">{option.label}</div>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 추가 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>추가 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  우선순위
                </Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">낮음</SelectItem>
                    <SelectItem value="medium">보통</SelectItem>
                    <SelectItem value="high">높음</SelectItem>
                    <SelectItem value="urgent">긴급</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  마감일
                </Label>
                <Input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* 요약 */}
          <Card>
            <CardHeader>
              <CardTitle>요약</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">담당자</span>
                <span>{selectedAgents.length}명</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">워크플로우</span>
                <span>
                  {workflowOptions.find((o) => o.value === workflowType)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">감독 수준</span>
                <span>
                  {supervisionOptions.find((o) => o.value === supervisionLevel)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">우선순위</span>
                <Badge
                  variant={
                    priority === 'urgent'
                      ? 'destructive'
                      : priority === 'high'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {priority === 'low' ? '낮음' : priority === 'medium' ? '보통' : priority === 'high' ? '높음' : '긴급'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!title.trim() || selectedAgents.length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  업무 생성
                </>
              )}
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/teams/${teamId}`}>취소</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
