'use client'

import { useState } from 'react'
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

interface TeamCreateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
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

export function TeamCreateModal({ open, onOpenChange, onSubmit }: TeamCreateModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [purpose, setPurpose] = useState('')
  const [type, setType] = useState('general')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('팀 이름을 입력해주세요.')
      return
    }

    setIsLoading(true)
    try {
      await onSubmit({ name, description, purpose, type })
      // Reset form
      setName('')
      setDescription('')
      setPurpose('')
      setType('general')
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : '팀 생성에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 팀 만들기</DialogTitle>
          <DialogDescription>
            새로운 팀을 만들어 AI 팀원들과 함께 업무를 수행하세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">팀 이름 *</Label>
              <Input
                id="name"
                placeholder="예: 마케팅팀"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">팀 유형</Label>
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
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="팀에 대한 간단한 설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purpose">목적</Label>
              <Textarea
                id="purpose"
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
              {isLoading ? '생성 중...' : '팀 만들기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
