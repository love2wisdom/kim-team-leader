import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Team {
  id: string
  name: string
  description: string
  purpose: string
  createdAt: Date
  updatedAt: Date
  memberCount: number
}

interface TeamState {
  teams: Team[]
  currentTeamId: string | null
  isLoading: boolean
  error: string | null

  // Actions
  setTeams: (teams: Team[]) => void
  setCurrentTeam: (teamId: string | null) => void
  addTeam: (team: Team) => void
  updateTeam: (teamId: string, updates: Partial<Team>) => void
  removeTeam: (teamId: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getCurrentTeam: () => Team | undefined
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set, get) => ({
      teams: [],
      currentTeamId: null,
      isLoading: false,
      error: null,

      setTeams: (teams) => set({ teams }),

      setCurrentTeam: (teamId) => set({ currentTeamId: teamId }),

      addTeam: (team) => set((state) => ({
        teams: [...state.teams, team]
      })),

      updateTeam: (teamId, updates) => set((state) => ({
        teams: state.teams.map((team) =>
          team.id === teamId ? { ...team, ...updates } : team
        ),
      })),

      removeTeam: (teamId) => set((state) => ({
        teams: state.teams.filter((team) => team.id !== teamId),
        currentTeamId: state.currentTeamId === teamId ? null : state.currentTeamId,
      })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      getCurrentTeam: () => {
        const state = get()
        return state.teams.find((team) => team.id === state.currentTeamId)
      },
    }),
    {
      name: 'team-storage',
      partialize: (state) => ({ currentTeamId: state.currentTeamId }),
    }
  )
)
