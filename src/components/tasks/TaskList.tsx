'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { TaskCard, TaskData } from './TaskCard'
import { ListTodo, Plus, Search, Filter } from 'lucide-react'
import { api, isApiError } from '@/lib/api'
import { toast } from 'sonner'

interface TaskListProps {
  tasks: TaskData[]
  teamId: string
  isLoading?: boolean
  onRefresh?: () => void
}

export function TaskList({ tasks, teamId, isLoading, onRefresh }: TaskListProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [executingTaskId, setExecutingTaskId] = useState<string | null>(null)

  const handleExecute = async (taskId: string) => {
    setExecutingTaskId(taskId)
    try {
      await api.post(`/tasks/${taskId}/execute`, {})
      toast.success('업무가 실행되었습니다.')
      onRefresh?.()
    } catch (error) {
      const message = isApiError(error) ? error.message : '업무 실행에 실패했습니다.'
      toast.error(message)
    } finally {
      setExecutingTaskId(null)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const tasksByStatus = {
    inProgress: filteredTasks.filter(t => t.status === 'IN_PROGRESS'),
    pending: filteredTasks.filter(t => t.status === 'PENDING'),
    awaitingReview: filteredTasks.filter(t => t.status === 'AWAITING_REVIEW'),
    completed: filteredTasks.filter(t => t.status === 'COMPLETED'),
    failed: filteredTasks.filter(t => t.status === 'FAILED' || t.status === 'CANCELLED'),
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="업무 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="PENDING">대기 중</SelectItem>
              <SelectItem value="IN_PROGRESS">진행 중</SelectItem>
              <SelectItem value="AWAITING_REVIEW">검토 대기</SelectItem>
              <SelectItem value="COMPLETED">완료</SelectItem>
              <SelectItem value="FAILED">실패</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button asChild>
          <Link href={`/teams/${teamId}/tasks/new`}>
            <Plus className="mr-2 h-4 w-4" />
            새 업무
          </Link>
        </Button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <ListTodo className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">
            {tasks.length === 0 ? '아직 업무가 없습니다' : '검색 결과가 없습니다'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {tasks.length === 0
              ? 'AI 팀원에게 새로운 업무를 지시해보세요.'
              : '다른 검색어로 시도해보세요.'}
          </p>
          {tasks.length === 0 && (
            <Button asChild>
              <Link href={`/teams/${teamId}/tasks/new`}>
                <Plus className="mr-2 h-4 w-4" />
                첫 업무 만들기
              </Link>
            </Button>
          )}
        </div>
      ) : statusFilter === 'all' ? (
        <div className="space-y-8">
          {/* In Progress */}
          {tasksByStatus.inProgress.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                진행 중 ({tasksByStatus.inProgress.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {tasksByStatus.inProgress.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    teamId={teamId}
                    onExecute={handleExecute}
                    isExecuting={executingTaskId === task.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pending */}
          {tasksByStatus.pending.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                대기 중 ({tasksByStatus.pending.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {tasksByStatus.pending.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    teamId={teamId}
                    onExecute={handleExecute}
                    isExecuting={executingTaskId === task.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Awaiting Review */}
          {tasksByStatus.awaitingReview.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                검토 대기 ({tasksByStatus.awaitingReview.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {tasksByStatus.awaitingReview.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    teamId={teamId}
                    onExecute={handleExecute}
                    isExecuting={executingTaskId === task.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          {tasksByStatus.completed.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                완료 ({tasksByStatus.completed.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {tasksByStatus.completed.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    teamId={teamId}
                    onExecute={handleExecute}
                    isExecuting={executingTaskId === task.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Failed */}
          {tasksByStatus.failed.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                실패/취소 ({tasksByStatus.failed.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {tasksByStatus.failed.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    teamId={teamId}
                    onExecute={handleExecute}
                    isExecuting={executingTaskId === task.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              teamId={teamId}
              onExecute={handleExecute}
              isExecuting={executingTaskId === task.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}
