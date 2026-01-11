'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Users, UserCircle, ListTodo, MoreVertical, Pencil, Trash2 } from 'lucide-react'

interface TeamCardProps {
  team: {
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
  onEdit?: (team: TeamCardProps['team']) => void
  onDelete?: (teamId: string) => void
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

export function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">
              <Link
                href={`/teams/${team.id}`}
                className="hover:underline"
              >
                {team.name}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {team.description || '설명 없음'}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(team)}>
                <Pencil className="mr-2 h-4 w-4" />
                수정
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onDelete?.(team.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Badge variant="secondary" className="w-fit">
          {teamTypeLabels[team.type] || team.type}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{team._count.members} 멤버</span>
          </div>
          <div className="flex items-center gap-1">
            <UserCircle className="h-4 w-4" />
            <span>{team._count.agents} 에이전트</span>
          </div>
          <div className="flex items-center gap-1">
            <ListTodo className="h-4 w-4" />
            <span>{team._count.tasks} 태스크</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
