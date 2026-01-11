'use client'

import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Users } from 'lucide-react'
import { TeamCard } from '@/components/teams/TeamCard'
import { TeamCreateModal } from '@/components/teams/TeamCreateModal'
import { TeamEditModal } from '@/components/teams/TeamEditModal'
import { TeamDeleteDialog } from '@/components/teams/TeamDeleteDialog'
import { api, isApiError } from '@/lib/api'
import { useTeamStore } from '@/stores'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

interface Team {
  id: string
  name: string
  description: string | null
  purpose: string | null
  type: string
  _count: {
    agents: number
    members: number
    tasks: number
  }
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const { setTeams: setStoreTeams, setCurrentTeam } = useTeamStore()

  const fetchTeams = useCallback(async () => {
    try {
      const data = await api.get<Team[]>('/teams')
      setTeams(data)
      setStoreTeams(data.map(t => ({
        id: t.id,
        name: t.name,
        description: t.description || '',
        purpose: t.purpose || '',
        createdAt: new Date(),
        updatedAt: new Date(),
        memberCount: t._count.members,
      })))
    } catch (error) {
      const message = isApiError(error) ? error.message : '팀 목록을 불러오는데 실패했습니다.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [setStoreTeams])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  const handleCreateTeam = async (data: {
    name: string
    description: string
    purpose: string
    type: string
  }) => {
    const newTeam = await api.post<Team>('/teams', data)
    setTeams([newTeam, ...teams])
    setCurrentTeam(newTeam.id)
    toast.success('팀이 생성되었습니다.')
  }

  const handleEditTeam = async (teamId: string, data: {
    name: string
    description: string
    purpose: string
    type: string
  }) => {
    const updatedTeam = await api.put<Team>(`/teams/${teamId}`, data)
    setTeams(teams.map(t => t.id === teamId ? updatedTeam : t))
    toast.success('팀이 수정되었습니다.')
  }

  const handleDeleteTeam = async () => {
    if (!selectedTeam) return
    await api.delete(`/teams/${selectedTeam.id}`)
    setTeams(teams.filter(t => t.id !== selectedTeam.id))
    toast.success('팀이 삭제되었습니다.')
  }

  const openEditModal = (team: Team) => {
    setSelectedTeam(team)
    setEditModalOpen(true)
  }

  const openDeleteDialog = (teamId: string) => {
    const team = teams.find(t => t.id === teamId)
    if (team) {
      setSelectedTeam(team)
      setDeleteDialogOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">팀 관리</h1>
          <p className="text-muted-foreground">
            팀을 만들고 AI 팀원들을 배치하세요.
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          새 팀 만들기
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[180px] rounded-lg" />
          ))}
        </div>
      ) : teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">아직 팀이 없습니다</h3>
          <p className="text-sm text-muted-foreground mb-4">
            새 팀을 만들어 AI 팀원들과 함께 업무를 시작하세요.
          </p>
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            첫 번째 팀 만들기
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onEdit={openEditModal}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>
      )}

      <TeamCreateModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleCreateTeam}
      />

      <TeamEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        team={selectedTeam}
        onSubmit={handleEditTeam}
      />

      <TeamDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        teamName={selectedTeam?.name || ''}
        onConfirm={handleDeleteTeam}
      />
    </div>
  )
}
