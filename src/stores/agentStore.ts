import { create } from 'zustand'

export interface Persona {
  name: string
  role: string
  personality: string
  expertise: string[]
  communicationStyle: string
  background?: string
}

export interface Agent {
  id: string
  teamId: string
  name: string
  role: string
  persona: Persona
  imageUrl: string | null
  skills: string[]
  status: 'active' | 'inactive' | 'busy'
  createdAt: Date
  updatedAt: Date
}

interface AgentState {
  agents: Agent[]
  selectedAgentIds: string[]
  isLoading: boolean
  error: string | null

  // Actions
  setAgents: (agents: Agent[]) => void
  addAgent: (agent: Agent) => void
  updateAgent: (agentId: string, updates: Partial<Agent>) => void
  removeAgent: (agentId: string) => void
  selectAgent: (agentId: string) => void
  deselectAgent: (agentId: string) => void
  clearSelection: () => void
  toggleAgentSelection: (agentId: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getAgentsByTeam: (teamId: string) => Agent[]
  getSelectedAgents: () => Agent[]
}

export const useAgentStore = create<AgentState>()((set, get) => ({
  agents: [],
  selectedAgentIds: [],
  isLoading: false,
  error: null,

  setAgents: (agents) => set({ agents }),

  addAgent: (agent) => set((state) => ({
    agents: [...state.agents, agent]
  })),

  updateAgent: (agentId, updates) => set((state) => ({
    agents: state.agents.map((agent) =>
      agent.id === agentId ? { ...agent, ...updates } : agent
    ),
  })),

  removeAgent: (agentId) => set((state) => ({
    agents: state.agents.filter((agent) => agent.id !== agentId),
    selectedAgentIds: state.selectedAgentIds.filter((id) => id !== agentId),
  })),

  selectAgent: (agentId) => set((state) => ({
    selectedAgentIds: state.selectedAgentIds.includes(agentId)
      ? state.selectedAgentIds
      : [...state.selectedAgentIds, agentId],
  })),

  deselectAgent: (agentId) => set((state) => ({
    selectedAgentIds: state.selectedAgentIds.filter((id) => id !== agentId),
  })),

  clearSelection: () => set({ selectedAgentIds: [] }),

  toggleAgentSelection: (agentId) => set((state) => ({
    selectedAgentIds: state.selectedAgentIds.includes(agentId)
      ? state.selectedAgentIds.filter((id) => id !== agentId)
      : [...state.selectedAgentIds, agentId],
  })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  getAgentsByTeam: (teamId) => {
    return get().agents.filter((agent) => agent.teamId === teamId)
  },

  getSelectedAgents: () => {
    const state = get()
    return state.agents.filter((agent) =>
      state.selectedAgentIds.includes(agent.id)
    )
  },
}))
