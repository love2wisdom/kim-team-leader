'use client'

import { AgentCard, AgentData } from './AgentCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserPlus, Search, LayoutGrid, List, Filter } from 'lucide-react'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface AgentGalleryProps {
  agents: AgentData[]
  onAddAgent?: () => void
  onEditAgent?: (agent: AgentData) => void
  onDeleteAgent?: (agent: AgentData) => void
  onChatAgent?: (agent: AgentData) => void
  className?: string
}

export function AgentGallery({
  agents,
  onAddAgent,
  onEditAgent,
  onDeleteAgent,
  onChatAgent,
  className,
}: AgentGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesStatus =
        statusFilter === 'all' || agent.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [agents, searchQuery, statusFilter])

  return (
    <div className={cn('space-y-4', className)}>
      {/* 툴바 */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* 검색 */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="이름, 역할, 스킬로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* 필터 및 뷰 모드 */}
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="active">활성</SelectItem>
              <SelectItem value="idle">대기</SelectItem>
              <SelectItem value="busy">작업 중</SelectItem>
              <SelectItem value="offline">오프라인</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={onAddAgent}>
            <UserPlus className="mr-2 h-4 w-4" />
            팀원 추가
          </Button>
        </div>
      </div>

      {/* 결과 카운트 */}
      <div className="text-sm text-muted-foreground">
        총 {filteredAgents.length}명의 팀원
        {searchQuery && ` (검색: "${searchQuery}")`}
      </div>

      {/* 에이전트 그리드/리스트 */}
      {filteredAgents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
            {agents.length === 0 ? (
              <>
                <h4 className="font-semibold mb-2">아직 팀원이 없습니다</h4>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  AI 팀원을 추가하여 업무를 자동화하세요.
                </p>
                <Button onClick={onAddAgent}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  첫 번째 팀원 추가
                </Button>
              </>
            ) : (
              <>
                <h4 className="font-semibold mb-2">검색 결과가 없습니다</h4>
                <p className="text-sm text-muted-foreground">
                  다른 검색어나 필터를 시도해보세요.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onEdit={onEditAgent}
              onDelete={onDeleteAgent}
              onChat={onChatAgent}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAgents.map((agent) => (
            <AgentListItem
              key={agent.id}
              agent={agent}
              onEdit={onEditAgent}
              onDelete={onDeleteAgent}
              onChat={onChatAgent}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// 리스트 뷰 아이템
function AgentListItem({
  agent,
  onEdit,
  onDelete,
  onChat,
}: {
  agent: AgentData
  onEdit?: (agent: AgentData) => void
  onDelete?: (agent: AgentData) => void
  onChat?: (agent: AgentData) => void
}) {
  const statusConfig = {
    active: { label: '활성', color: 'bg-green-500' },
    idle: { label: '대기', color: 'bg-yellow-500' },
    busy: { label: '작업 중', color: 'bg-blue-500' },
    offline: { label: '오프라인', color: 'bg-gray-400' },
  }
  const status = statusConfig[agent.status as keyof typeof statusConfig] || statusConfig.idle

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
            {agent.imageUrl ? (
              <img
                src={agent.imageUrl}
                alt={agent.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              agent.name[0]
            )}
          </div>
          <span
            className={cn(
              'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
              status.color
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold truncate">{agent.name}</h4>
            <span className="text-xs text-muted-foreground">({status.label})</span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{agent.role}</p>
        </div>

        <div className="hidden md:flex flex-wrap gap-1 max-w-[200px]">
          {agent.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-0.5 bg-secondary rounded-full"
            >
              {skill}
            </span>
          ))}
          {agent.skills.length > 2 && (
            <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">
              +{agent.skills.length - 2}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onChat?.(agent)}>
            대화
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit?.(agent)}>
            수정
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
