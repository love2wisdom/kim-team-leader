'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreVertical,
  Edit,
  Trash2,
  MessageSquare,
  User,
  Sparkles,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AgentData {
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

export interface AgentCardProps {
  agent: AgentData
  onEdit?: (agent: AgentData) => void
  onDelete?: (agent: AgentData) => void
  onChat?: (agent: AgentData) => void
  className?: string
}

const statusConfig = {
  active: {
    label: '활성',
    color: 'bg-green-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  idle: {
    label: '대기',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  busy: {
    label: '작업 중',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  offline: {
    label: '오프라인',
    color: 'bg-gray-400',
    textColor: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
}

export function AgentCard({
  agent,
  onEdit,
  onDelete,
  onChat,
  className,
}: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const status = statusConfig[agent.status as keyof typeof statusConfig] || statusConfig.idle

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        'border-2 hover:border-primary/50',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 상태 표시 배경 효과 */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          'bg-gradient-to-br from-primary/5 to-primary/10'
        )}
      />

      {/* 카드 헤더 - 이미지 영역 */}
      <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
            <AvatarImage src={agent.imageUrl || ''} alt={agent.name} />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              {agent.name[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* 상태 인디케이터 */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className={cn('gap-1', status.bgColor, status.textColor)}
          >
            <span className={cn('h-2 w-2 rounded-full animate-pulse', status.color)} />
            {status.label}
          </Badge>
        </div>

        {/* 더보기 메뉴 */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/80 hover:bg-white shadow-sm"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onChat?.(agent)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                대화하기
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(agent)}>
                <Edit className="mr-2 h-4 w-4" />
                수정
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(agent)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 레벨/경험치 표시 (게임 요소) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
            style={{ width: '65%' }}
          />
        </div>
      </div>

      <CardContent className="pt-4 pb-4 relative z-10">
        {/* 이름과 역할 */}
        <div className="text-center mb-3">
          <h3 className="font-bold text-lg leading-tight">{agent.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <User className="h-3 w-3" />
            {agent.role}
          </p>
        </div>

        {/* 스킬 태그 */}
        <div className="flex flex-wrap gap-1 justify-center mb-3">
          {agent.skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-xs px-2 py-0"
            >
              {skill}
            </Badge>
          ))}
          {agent.skills.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0">
              +{agent.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* 페르소나 특성 (호버 시 표시) */}
        {agent.persona && (
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="pt-2 border-t text-xs text-muted-foreground">
              <div className="flex items-start gap-1">
                <Sparkles className="h-3 w-3 mt-0.5 text-primary" />
                <span className="line-clamp-2">{agent.persona.personality}</span>
              </div>
            </div>
          </div>
        )}

        {/* 액션 버튼 */}
        <div
          className={cn(
            'flex gap-2 mt-3 transition-all duration-300',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          )}
        >
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => onChat?.(agent)}
          >
            <MessageSquare className="mr-1 h-3 w-3" />
            대화
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit?.(agent)}
          >
            <Zap className="mr-1 h-3 w-3" />
            업무
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
