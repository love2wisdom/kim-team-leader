import { create } from 'zustand'

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled'
export type SupervisionLevel = 'realtime' | 'result_review' | 'step_intervention'
export type WorkflowType = 'sequential' | 'parallel' | 'mixed'

export interface WorkflowStep {
  id: string
  agentId: string
  order: number
  parallelGroup?: number
  instruction?: string
  status: TaskStatus
  result?: string
}

export interface Task {
  id: string
  teamId: string
  title: string
  description: string
  instruction: string
  assignedAgentIds: string[]
  workflow: WorkflowStep[]
  workflowType: WorkflowType
  supervisionLevel: SupervisionLevel
  status: TaskStatus
  progress: number
  currentStep?: number
  result?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

interface TaskState {
  tasks: Task[]
  currentTaskId: string | null
  isExecuting: boolean
  executionLogs: string[]
  isLoading: boolean
  error: string | null

  // Actions
  setTasks: (tasks: Task[]) => void
  setCurrentTask: (taskId: string | null) => void
  addTask: (task: Task) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  removeTask: (taskId: string) => void
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  updateTaskProgress: (taskId: string, progress: number) => void
  updateWorkflowStep: (taskId: string, stepId: string, updates: Partial<WorkflowStep>) => void
  setExecuting: (executing: boolean) => void
  addExecutionLog: (log: string) => void
  clearExecutionLogs: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getTasksByTeam: (teamId: string) => Task[]
  getCurrentTask: () => Task | undefined
  getActiveTasks: () => Task[]
}

export const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: [],
  currentTaskId: null,
  isExecuting: false,
  executionLogs: [],
  isLoading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),

  setCurrentTask: (taskId) => set({ currentTaskId: taskId }),

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),

  updateTask: (taskId, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task
    ),
  })),

  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId),
    currentTaskId: state.currentTaskId === taskId ? null : state.currentTaskId,
  })),

  updateTaskStatus: (taskId, status) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status,
            updatedAt: new Date(),
            completedAt: status === 'completed' ? new Date() : task.completedAt,
          }
        : task
    ),
  })),

  updateTaskProgress: (taskId, progress) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, progress, updatedAt: new Date() } : task
    ),
  })),

  updateWorkflowStep: (taskId, stepId, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            workflow: task.workflow.map((step) =>
              step.id === stepId ? { ...step, ...updates } : step
            ),
            updatedAt: new Date(),
          }
        : task
    ),
  })),

  setExecuting: (executing) => set({ isExecuting: executing }),

  addExecutionLog: (log) => set((state) => ({
    executionLogs: [...state.executionLogs, `[${new Date().toISOString()}] ${log}`],
  })),

  clearExecutionLogs: () => set({ executionLogs: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  getTasksByTeam: (teamId) => {
    return get().tasks.filter((task) => task.teamId === teamId)
  },

  getCurrentTask: () => {
    const state = get()
    return state.tasks.find((task) => task.id === state.currentTaskId)
  },

  getActiveTasks: () => {
    return get().tasks.filter((task) =>
      task.status === 'pending' || task.status === 'in_progress'
    )
  },
}))
