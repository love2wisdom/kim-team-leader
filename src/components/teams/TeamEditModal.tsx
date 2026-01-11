'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Team {
  id: string
  name: string
  description: string | null
  purpose: string | null
  type: string
}

interface TeamEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  team: Team | null
  onSubmit: (teamId: string, data: {
    name: string
    description: string
    purpose: string
    type: string
  }) => Promise<void>
}

const teamTypes = [
  { value: 'general', label: '범용' },
  { value: 'marketing', label: '마케팅' },
  { value: 'development', label: '개발' },
  { value: 'design', label: '디자인' },
  { value: 'planning', label: '기획' },
  { value: 'sales', label: '영업' },
  { value: 'hr', label: '인사' },
  { value: 'finance', label: '재무' },
]

export function TeamEditModal({ open, onOpenChange, team, onSubmit }: TeamEditModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [purpose, setPurpose] = useState('')
  const [type, setType] = useState('general')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (team) {
      setName(team.name)
      setDescription(team.description || '')
      setPurpose(team.purpose || '')
      setType(team.type)
    }
  }, [team])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!team) return

    if (!name.trim()) {
      setError('팀 이름을 입력해주세요.')
      return
    }

    setIsLoading(true)
    try {
      await onSubmit(team.id, { name, description, purpose, type })
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : '팀 수정에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>팀 수정</DialogTitle>
          <DialogDescription>
            팀 정보를 수정합니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">팀 이름 *</Label>
              <Input
                id="edit-name"
                placeholder="예: 마케팅팀"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-type">팀 유형</Label>
              <Select value={type} onValueChange={setType} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="팀 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  {teamTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">설명</Label>
              <Textarea
                id="edit-description"
                placeholder="팀에 대한 간단한 설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-purpose">목적</Label>
              <Textarea
                id="edit-purpose"
                placeholder="이 팀이 수행할 주요 업무나 목표"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                disabled={isLoading}
                rows={2}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '저장 중...' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
