'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  User,
  Briefcase,
  Sparkles,
  Check,
  X,
  Plus,
  Loader2,
} from 'lucide-react'

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

interface AgentEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agent: Agent | null
  onSubmit: (id: string, data: AgentUpdateData) => Promise<void>
}

interface AgentUpdateData {
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
}

export function AgentEditModal({
  open,
  onOpenChange,
  agent,
  onSubmit,
}: AgentEditModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('idle')
  const [personality, setPersonality] = useState('')
  const [expertise, setExpertise] = useState<string[]>([])
  const [communicationStyle, setCommunicationStyle] = useState('')
  const [background, setBackground] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [newExpertise, setNewExpertise] = useState('')

  useEffect(() => {
    if (agent) {
      setName(agent.name)
      setRole(agent.role)
      setStatus(agent.status)
      setSkills(agent.skills || [])
      setPersonality(agent.persona?.personality || '')
      setExpertise(agent.persona?.expertise || [])
      setCommunicationStyle(agent.persona?.communicationStyle || '')
      setBackground(agent.persona?.background || '')
    }
  }, [agent])

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleAddExpertise = () => {
    if (newExpertise.trim() && !expertise.includes(newExpertise.trim())) {
      setExpertise([...expertise, newExpertise.trim()])
      setNewExpertise('')
    }
  }

  const handleRemoveExpertise = (exp: string) => {
    setExpertise(expertise.filter((e) => e !== exp))
  }

  const handleSubmit = async () => {
    if (!agent || !name.trim() || !role.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(agent.id, {
        name: name.trim(),
        role: role.trim(),
        status,
        skills,
        persona: {
          personality,
          expertise,
          communicationStyle,
          background: background || null,
        },
      })
      handleClose()
    } catch (error) {
      // Error handling is done in parent
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!agent) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>팀원 수정</DialogTitle>
          <DialogDescription>
            {agent.name}의 정보를 수정합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              기본 정보
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">이름 *</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 김기획"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">역할 *</Label>
                <Input
                  id="edit-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="예: 전략 기획 담당"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">상태</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">활성</SelectItem>
                  <SelectItem value="idle">대기</SelectItem>
                  <SelectItem value="busy">작업 중</SelectItem>
                  <SelectItem value="offline">오프라인</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 페르소나 설정 */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              페르소나 설정
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-personality">성격</Label>
                <Textarea
                  id="edit-personality"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="예: 체계적이고 분석적이며, 큰 그림을 보면서도 세부 사항을 놓치지 않습니다."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-communicationStyle">대화 스타일</Label>
                <Textarea
                  id="edit-communicationStyle"
                  value={communicationStyle}
                  onChange={(e) => setCommunicationStyle(e.target.value)}
                  placeholder="예: 명확하고 구조적인 의사소통을 선호하며, 데이터와 근거를 바탕으로 설명합니다."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-background">배경 (선택)</Label>
                <Textarea
                  id="edit-background"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="예: 10년간 대기업 전략기획실에서 근무한 경험이 있습니다."
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* 전문 분야 */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              전문 분야
            </h3>
            <div className="flex flex-wrap gap-2">
              {expertise.map((exp) => (
                <Badge key={exp} variant="secondary" className="gap-1">
                  {exp}
                  <button
                    onClick={() => handleRemoveExpertise(exp)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <div className="flex gap-1">
                <Input
                  value={newExpertise}
                  onChange={(e) => setNewExpertise(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddExpertise()}
                  placeholder="추가..."
                  className="h-7 w-32 text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddExpertise}
                  className="h-7"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* 스킬 */}
          <div className="space-y-4">
            <h3 className="font-semibold">스킬</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="gap-1">
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <div className="flex gap-1">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  placeholder="추가..."
                  className="h-7 w-32 text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddSkill}
                  className="h-7"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || !role.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                저장 중...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                저장
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
