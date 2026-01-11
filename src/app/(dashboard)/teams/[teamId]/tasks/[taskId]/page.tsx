'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  Workflow,
  Shield,
  Flag,
  Calendar,
  FileText,
  Loader2,
  RotateCcw,
} from 'lucide-react'
import { api, isApiError } from '@/lib/api'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface TaskDetail {
  id: string
  title: string
  description: string | null
  instruction: string | null
  status: string
  priority: string
  workflowType: string
  supervisionLevel: string
  dueDate: string | null
  progress: number
  startedAt: string | null
  completedAt: string | null
  createdAt: string
  team: {
    id: string
    name: string
  }
  assignments: Array<{
    id: string
    role: string
    order: number
    agent: {
      id: string
      name: string
      role: string
      imageUrl: string | null
      skills: string[]
    }
  }>
  workflow: Array<{
    id: string
    order: number
    status: string
    result: string | null
    startedAt: string | null
    completedAt: string | null
  }>
  results: Array<{
    id: string
    title: string
    content: string
    contentType: string
    status: string
    createdAt: string
  }>
  creator: {
    id: string
    name: string
    image: string | null
  }
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: {
    label: '대기 중',
    color: 'bg-gray-100 text-gray-800',
    icon: <Clock className="h-4 w-4" />,
  },
  IN_PROGRESS: {
    label: '진행 중',
    color: 'bg-blue-100 text-blue-800',
    icon: <Loader2 className="h-4 w-4 animate-spin" />,
  },
  AWAITING_REVIEW: {
    label: '검토 대기',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <AlertCircle className="h-4 w-4" />,
  },
  COMPLETED: {
    label: '완료',
    color: 'bg-green-100 text-green-800',
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  FAILED: {
    label: '실패',
    color: 'bg-red-100 text-red-800',
    icon: <XCircle className="h-4 w-4" />,
  },
  CANCELLED: {
    label: '취소됨',
    color: 'bg-gray-100 text-gray-500',
    icon: <XCircle className="h-4 w-4" />,
  },
}

const priorityConfig: Record<string, { label: string; color: string }> = {
  LOW: { label: '낮음', color: 'secondary' },
  MEDIUM: { label: '보통', color: 'outline' },
  HIGH: { label: '높음', color: 'default' },
  URGENT: { label: '긴급', color: 'destructive' },
}

const workflowTypeLabels: Record<string, string> = {
  SINGLE: '단일 수행',
  SEQUENTIAL: '순차 수행',
  PARALLEL: '병렬 수행',
  COLLABORATIVE: '협업 수행',
}

const supervisionLabels: Record<string, string> = {
  FULL: '완전 감독',
  MODERATE: '중간 감독',
  MINIMAL: '최소 감독',
  NONE: '자율 수행',
}

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ teamId: string; taskId: string }>
}) {
  const { teamId, taskId } = use(params)
  const router = useRouter()
  const [task, setTask] = useState<TaskDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isExecuting, setIsExecuting] = useState(false)

  const fetchTask = async () => {
    try {
      const data = await api.get<TaskDetail>(`/tasks/${taskId}`)
      setTask(data)
    } catch (error) {
      const message = isApiError(error) ? error.message : '업무 정보를 불러오는데 실패했습니다.'
      toast.error(message)
      router.push(`/teams/${teamId}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [taskId])

  const handleExecute = async () => {
    setIsExecuting(true)
    try {
      await api.post(`/tasks/${taskId}/execute`, {})
      toast.success('업무가 시작되었습니다.')
      fetchTask()
    } catch (error) {
      const message = isApiError(error) ? error.message : '업무 실행에 실패했습니다.'
      toast.error(message)
    } finally {
      setIsExecuting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    )
  }

  if (!task) {
    return null
  }

  const status = statusConfig[task.status] || statusConfig.PENDING
  const priority = priorityConfig[task.priority] || priorityConfig.MEDIUM

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href={`/teams/${teamId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{task.title}</h1>
              <Badge className={status.color}>
                {status.icon}
                <span className="ml-1">{status.label}</span>
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {task.team.name} &middot;{' '}
              {format(new Date(task.createdAt), 'yyyy년 M월 d일', { locale: ko })}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {task.status === 'PENDING' && (
            <Button onClick={handleExecute} disabled={isExecuting}>
              {isExecuting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  실행 중...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  업무 실행
                </>
              )}
            </Button>
          )}
          {task.status === 'FAILED' && (
            <Button onClick={handleExecute} variant="outline" disabled={isExecuting}>
              <RotateCcw className="mr-2 h-4 w-4" />
              재시도
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                업무 내용
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {task.description && (
                <div>
                  <h4 className="font-medium mb-2">설명</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">{task.description}</p>
                </div>
              )}
              {task.instruction && (
                <div>
                  <h4 className="font-medium mb-2">상세 지침</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{task.instruction}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assigned Agents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                담당자
              </CardTitle>
              <CardDescription>이 업무를 수행하는 AI 팀원들입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {task.assignments.map((assignment, index) => (
                  <div
                    key={assignment.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <Avatar>
                      <AvatarImage src={assignment.agent.imageUrl || ''} />
                      <AvatarFallback>{assignment.agent.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{assignment.agent.name}</span>
                        {assignment.role === 'primary' && (
                          <Badge variant="secondary" className="text-xs">
                            주담당
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.agent.role}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/teams/${teamId}/chat/${assignment.agent.id}`}>대화하기</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {task.results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>실행 결과</CardTitle>
                <CardDescription>업무 수행 결과물입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {task.results.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{result.title}</h4>
                        <Badge
                          variant={
                            result.status === 'APPROVED'
                              ? 'default'
                              : result.status === 'REJECTED'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {result.status === 'PENDING'
                            ? '검토 대기'
                            : result.status === 'APPROVED'
                            ? '승인됨'
                            : result.status === 'REJECTED'
                            ? '반려됨'
                            : '수정 요청'}
                        </Badge>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-auto">
                        <pre className="whitespace-pre-wrap text-sm">{result.content}</pre>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(result.createdAt), 'yyyy-MM-dd HH:mm', { locale: ko })}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Settings */}
          <Card>
            <CardHeader>
              <CardTitle>설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Flag className="h-4 w-4" />
                  <span>우선순위</span>
                </div>
                <Badge variant={priority.color as 'default' | 'destructive' | 'outline' | 'secondary'}>
                  {priority.label}
                </Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Workflow className="h-4 w-4" />
                  <span>워크플로우</span>
                </div>
                <span className="text-sm">{workflowTypeLabels[task.workflowType]}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>감독 수준</span>
                </div>
                <span className="text-sm">{supervisionLabels[task.supervisionLevel]}</span>
              </div>

              {task.dueDate && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>마감일</span>
                    </div>
                    <span className="text-sm">
                      {format(new Date(task.dueDate), 'M월 d일 HH:mm', { locale: ko })}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>타임라인</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">생성:</span>
                  <span>{format(new Date(task.createdAt), 'M/d HH:mm', { locale: ko })}</span>
                </div>
                {task.startedAt && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">시작:</span>
                    <span>{format(new Date(task.startedAt), 'M/d HH:mm', { locale: ko })}</span>
                  </div>
                )}
                {task.completedAt && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-muted-foreground">완료:</span>
                    <span>{format(new Date(task.completedAt), 'M/d HH:mm', { locale: ko })}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Creator Info */}
          <Card>
            <CardHeader>
              <CardTitle>생성자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={task.creator.image || ''} />
                  <AvatarFallback>{task.creator.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{task.creator.name || '사용자'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
