'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Play,
  Loader2,
  Flag,
  Users,
  Calendar,
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'

export interface TaskData {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  workflowType: string
  dueDate: string | null
  progress: number
  createdAt: string
  assignments: Array<{
    id: string
    agent: {
      id: string
      name: string
      imageUrl: string | null
    }
  }>
  _count: {
    results: number
    workflow: number
  }
}

interface TaskCardProps {
  task: TaskData
  teamId: string
  onExecute?: (taskId: string) => void
  isExecuting?: boolean
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: {
    label: '대기 중',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    icon: <Clock className="h-3 w-3" />,
  },
  IN_PROGRESS: {
    label: '진행 중',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
  },
  AWAITING_REVIEW: {
    label: '검토 대기',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    icon: <AlertCircle className="h-3 w-3" />,
  },
  COMPLETED: {
    label: '완료',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  FAILED: {
    label: '실패',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    icon: <XCircle className="h-3 w-3" />,
  },
  CANCELLED: {
    label: '취소됨',
    color: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
    icon: <XCircle className="h-3 w-3" />,
  },
}

const priorityConfig: Record<string, { label: string; variant: 'default' | 'destructive' | 'secondary' | 'outline' }> = {
  LOW: { label: '낮음', variant: 'secondary' },
  MEDIUM: { label: '보통', variant: 'outline' },
  HIGH: { label: '높음', variant: 'default' },
  URGENT: { label: '긴급', variant: 'destructive' },
}

export function TaskCard({ task, teamId, onExecute, isExecuting }: TaskCardProps) {
  const status = statusConfig[task.status] || statusConfig.PENDING
  const priority = priorityConfig[task.priority] || priorityConfig.MEDIUM

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED'

  return (
    <Card className={cn(
      'hover:shadow-md transition-shadow cursor-pointer',
      isOverdue && 'border-red-200 dark:border-red-900'
    )}>
      <Link href={`/teams/${teamId}/tasks/${task.id}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {task.description}
                </p>
              )}
            </div>
            <Badge className={cn('shrink-0', status.color)}>
              {status.icon}
              <span className="ml-1">{status.label}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {/* Assigned Agents */}
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {task.assignments.slice(0, 3).map((assignment) => (
                    <Avatar key={assignment.id} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={assignment.agent.imageUrl || ''} />
                      <AvatarFallback className="text-xs">
                        {assignment.agent.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {task.assignments.length > 3 && (
                    <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                      +{task.assignments.length - 3}
                    </div>
                  )}
                </div>
                {task.assignments.length === 0 && (
                  <span className="text-xs">미배정</span>
                )}
              </div>

              {/* Priority */}
              <Badge variant={priority.variant} className="text-xs">
                <Flag className="h-3 w-3 mr-1" />
                {priority.label}
              </Badge>

              {/* Due Date */}
              {task.dueDate && (
                <div className={cn(
                  'flex items-center gap-1 text-xs',
                  isOverdue && 'text-red-600 dark:text-red-400'
                )}>
                  <Calendar className="h-3 w-3" />
                  <span>
                    {format(new Date(task.dueDate), 'M/d HH:mm', { locale: ko })}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
              {task.status === 'PENDING' && onExecute && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onExecute(task.id)}
                  disabled={isExecuting}
                >
                  {isExecuting ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {task.status === 'IN_PROGRESS' && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>진행률</span>
                <span>{task.progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="mt-3 text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, locale: ko })}
            {task._count.results > 0 && ` · 결과물 ${task._count.results}개`}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
