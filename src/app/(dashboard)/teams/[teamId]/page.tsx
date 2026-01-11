'use client'

import { useEffect, useState, useCallback, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Users,
  UserCircle,
  ListTodo,
  FileText,
  Plus,
  Settings,
  ArrowLeft,
} from 'lucide-react'
import { api, isApiError } from '@/lib/api'
import { useTeamStore } from '@/stores'
import { toast } from 'sonner'
import { AgentCard, AgentEditModal, AgentDeleteDialog } from '@/components/agents'
import { TaskList, TaskData } from '@/components/tasks'
import { ResultList, ResultData } from '@/components/results'

interface TeamMember {
  id: string
  role: string
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

interface Agent {
  id: string
  name: string
  role: string
  status: string
  imageUrl: string | null
  imageType: string | null
  skills: string[]
  persona?: {
    id?: string
    personality: string | null
    expertise: string[]
    communicationStyle: string | null
    background?: string | null
  } | null
}

interface TeamDetail {
  id: string
  name: string
  description: string | null
  purpose: string | null
  type: string
  owner: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
  members: TeamMember[]
  agents: Agent[]
  _count: {
    tasks: number
    results: number
  }
}

const teamTypeLabels: Record<string, string> = {
  general: '범용',
  marketing: '마케팅',
  development: '개발',
  design: '디자인',
  planning: '기획',
  sales: '영업',
  hr: '인사',
  finance: '재무',
}

export default function TeamDetailPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = use(params)
  const router = useRouter()
  const [team, setTeam] = useState<TeamDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { setCurrentTeam } = useTeamStore()

  // Agent management state
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [deletingAgent, setDeletingAgent] = useState<Agent | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Task state
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [isLoadingTasks, setIsLoadingTasks] = useState(false)
  const [tasksLoaded, setTasksLoaded] = useState(false)

  // Results state
  const [results, setResults] = useState<ResultData[]>([])
  const [isLoadingResults, setIsLoadingResults] = useState(false)
  const [resultsLoaded, setResultsLoaded] = useState(false)

  const fetchTeam = useCallback(async () => {
    try {
      const data = await api.get<TeamDetail>(`/teams/${teamId}`)
      setTeam(data)
      setCurrentTeam(teamId)
    } catch (error) {
      const message = isApiError(error) ? error.message : '팀 정보를 불러오는데 실패했습니다.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [teamId, setCurrentTeam])

  useEffect(() => {
    fetchTeam()
  }, [fetchTeam])

  const fetchTasks = useCallback(async () => {
    if (isLoadingTasks) return
    setIsLoadingTasks(true)
    try {
      const data = await api.get<TaskData[]>(`/tasks?teamId=${teamId}`)
      setTasks(data)
      setTasksLoaded(true)
    } catch (error) {
      const message = isApiError(error) ? error.message : '업무 목록을 불러오는데 실패했습니다.'
      toast.error(message)
    } finally {
      setIsLoadingTasks(false)
    }
  }, [teamId, isLoadingTasks])

  const fetchResults = useCallback(async () => {
    if (isLoadingResults) return
    setIsLoadingResults(true)
    try {
      const data = await api.get<ResultData[]>(`/results?teamId=${teamId}`)
      setResults(data)
      setResultsLoaded(true)
    } catch (error) {
      const message = isApiError(error) ? error.message : '결과 목록을 불러오는데 실패했습니다.'
      toast.error(message)
    } finally {
      setIsLoadingResults(false)
    }
  }, [teamId, isLoadingResults])

  const handleTabChange = (value: string) => {
    if (value === 'tasks' && !tasksLoaded) {
      fetchTasks()
    }
    if (value === 'results' && !resultsLoaded) {
      fetchResults()
    }
  }

  // Agent handlers
  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent)
    setIsEditModalOpen(true)
  }

  const handleDeleteAgent = (agent: Agent) => {
    setDeletingAgent(agent)
    setIsDeleteDialogOpen(true)
  }

  const handleChatAgent = (agent: Agent) => {
    router.push(`/teams/${teamId}/chat/${agent.id}`)
  }

  const handleUpdateAgent = async (agentId: string, data: {
    name: string
    role: string
    status: string
    skills: string[]
    persona: {
      personality: string
      expertise: string[]
      communicationStyle: string
      background: string | null
    }
  }) => {
    try {
      await api.put(`/agents/${agentId}`, data)
      toast.success('팀원 정보가 수정되었습니다.')
      fetchTeam()
    } catch (error) {
      const message = isApiError(error) ? error.message : '팀원 수정에 실패했습니다.'
      toast.error(message)
      throw error
    }
  }

  const handleConfirmDelete = async (agentId: string) => {
    try {
      await api.delete(`/agents/${agentId}`)
      toast.success('팀원이 삭제되었습니다.')
      fetchTeam()
    } catch (error) {
      const message = isApiError(error) ? error.message : '팀원 삭제에 실패했습니다.'
      toast.error(message)
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    )
  }

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">팀을 찾을 수 없습니다</h2>
        <Button asChild variant="outline">
          <Link href="/teams">
            <ArrowLeft className="mr-2 h-4 w-4" />
            팀 목록으로
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/teams">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1>
            <Badge variant="secondary">
              {teamTypeLabels[team.type] || team.type}
            </Badge>
          </div>
          {team.description && (
            <p className="text-muted-foreground mt-1">{team.description}</p>
          )}
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">멤버</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.members.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">에이전트</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.agents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">태스크</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team._count.tasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">결과물</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team._count.results}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agents" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="agents">팀원 (에이전트)</TabsTrigger>
          <TabsTrigger value="members">멤버</TabsTrigger>
          <TabsTrigger value="tasks">업무</TabsTrigger>
          <TabsTrigger value="results">결과물</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">AI 팀원</h3>
            <Button asChild>
              <Link href={`/teams/${teamId}/agents/new`}>
                <Plus className="mr-2 h-4 w-4" />
                팀원 추가
              </Link>
            </Button>
          </div>
          {team.agents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <UserCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h4 className="font-semibold mb-2">아직 팀원이 없습니다</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  AI 팀원을 추가하여 업무를 자동화하세요.
                </p>
                <Button asChild>
                  <Link href={`/teams/${teamId}/agents/new`}>
                    <Plus className="mr-2 h-4 w-4" />
                    첫 번째 팀원 추가
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {team.agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onEdit={handleEditAgent}
                  onDelete={handleDeleteAgent}
                  onChat={handleChatAgent}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">팀 멤버</h3>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              멤버 초대
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {team.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.user.image || ''} />
                        <AvatarFallback>
                          {member.user.name?.[0] || member.user.email?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.user.name || '이름 없음'}</p>
                        <p className="text-sm text-muted-foreground">{member.user.email}</p>
                      </div>
                    </div>
                    <Badge variant={member.role === 'owner' ? 'default' : 'secondary'}>
                      {member.role === 'owner' ? '소유자' : member.role === 'admin' ? '관리자' : '멤버'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <TaskList
            tasks={tasks}
            teamId={teamId}
            isLoading={isLoadingTasks}
            onRefresh={fetchTasks}
          />
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <ResultList
            results={results}
            teamId={teamId}
            isLoading={isLoadingResults}
            onRefresh={fetchResults}
          />
        </TabsContent>
      </Tabs>

      {/* Agent Edit Modal */}
      <AgentEditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        agent={editingAgent}
        onSubmit={handleUpdateAgent}
      />

      {/* Agent Delete Dialog */}
      <AgentDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        agent={deletingAgent}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
