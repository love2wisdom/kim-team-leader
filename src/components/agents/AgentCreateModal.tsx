'use client'

import { useState } from 'react'
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
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  User,
  Briefcase,
  Sparkles,
  Upload,
  FileText,
  MessageSquare,
  Check,
  X,
  Plus,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AgentTemplate {
  id: string
  name: string
  role: string
  description: string
  category: string
  defaultPersona: {
    personality: string
    expertise: string[]
    communicationStyle: string
  }
  defaultSkills: string[]
  presetImageUrl: string
}

interface AgentCreateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templates: AgentTemplate[]
  onSubmit: (data: AgentFormData) => Promise<void>
}

interface AgentFormData {
  name: string
  role: string
  skills: string[]
  imageUrl: string | null
  imageType: string | null
  persona: {
    name: string
    role: string
    personality: string
    expertise: string[]
    communicationStyle: string
    background: string | null
    sourceType: string | null
    sourceData: string | null
  } | null
}

export function AgentCreateModal({
  open,
  onOpenChange,
  templates,
  onSubmit,
}: AgentCreateModalProps) {
  const [step, setStep] = useState<'select' | 'customize'>('select')
  const [createMode, setCreateMode] = useState<'template' | 'resume' | 'chat' | 'custom'>('template')
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [personality, setPersonality] = useState('')
  const [expertise, setExpertise] = useState<string[]>([])
  const [communicationStyle, setCommunicationStyle] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [newExpertise, setNewExpertise] = useState('')

  const resetForm = () => {
    setStep('select')
    setCreateMode('template')
    setSelectedTemplate(null)
    setName('')
    setRole('')
    setPersonality('')
    setExpertise([])
    setCommunicationStyle('')
    setSkills([])
    setNewSkill('')
    setNewExpertise('')
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  const handleTemplateSelect = (template: AgentTemplate) => {
    setSelectedTemplate(template)
    setName(template.name)
    setRole(template.role)
    setPersonality(template.defaultPersona.personality)
    setExpertise(template.defaultPersona.expertise)
    setCommunicationStyle(template.defaultPersona.communicationStyle)
    setSkills(template.defaultSkills)
    setStep('customize')
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
    if (!name.trim() || !role.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        role: role.trim(),
        skills,
        imageUrl: selectedTemplate?.presetImageUrl || null,
        imageType: selectedTemplate ? 'preset' : null,
        persona: {
          name: name.trim(),
          role: role.trim(),
          personality,
          expertise,
          communicationStyle,
          background: null,
          sourceType: createMode,
          sourceData: selectedTemplate?.id || null,
        },
      })
      handleClose()
    } catch (error) {
      // Error handling is done in parent
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 'select' ? '새 팀원 추가' : '팀원 설정'}
          </DialogTitle>
          <DialogDescription>
            {step === 'select'
              ? 'AI 팀원을 추가하는 방법을 선택하세요.'
              : '팀원의 상세 정보를 설정하세요.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'select' ? (
          <Tabs value={createMode} onValueChange={(v) => setCreateMode(v as typeof createMode)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="template">
                <User className="mr-2 h-4 w-4" />
                템플릿
              </TabsTrigger>
              <TabsTrigger value="resume">
                <FileText className="mr-2 h-4 w-4" />
                이력서
              </TabsTrigger>
              <TabsTrigger value="chat">
                <MessageSquare className="mr-2 h-4 w-4" />
                대화
              </TabsTrigger>
              <TabsTrigger value="custom">
                <Sparkles className="mr-2 h-4 w-4" />
                직접 생성
              </TabsTrigger>
            </TabsList>

            <TabsContent value="template" className="mt-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md hover:border-primary',
                      selectedTemplate?.id === template.id && 'border-primary ring-2 ring-primary/20'
                    )}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarImage src={template.presetImageUrl} />
                          <AvatarFallback>{template.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-xs text-muted-foreground">{template.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.defaultSkills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resume" className="mt-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <h4 className="font-semibold mb-2">이력서 업로드</h4>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    PDF 또는 Word 형식의 이력서를 업로드하면<br />
                    자동으로 페르소나를 생성합니다.
                  </p>
                  <Button variant="outline" disabled>
                    <Upload className="mr-2 h-4 w-4" />
                    파일 선택 (준비 중)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="mt-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h4 className="font-semibold mb-2">대화로 생성</h4>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    AI와 대화하면서 원하는 팀원의<br />
                    성격과 능력을 정의하세요.
                  </p>
                  <Button variant="outline" disabled>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    대화 시작 (준비 중)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custom" className="mt-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                  <h4 className="font-semibold mb-2">직접 생성</h4>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    모든 설정을 직접 입력하여<br />
                    맞춤형 팀원을 만드세요.
                  </p>
                  <Button onClick={() => setStep('customize')}>
                    <Plus className="mr-2 h-4 w-4" />
                    새로 만들기
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-6">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <User className="h-4 w-4" />
                기본 정보
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 김기획"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">역할 *</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="예: 전략 기획 담당"
                  />
                </div>
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
                  <Label htmlFor="personality">성격</Label>
                  <Textarea
                    id="personality"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    placeholder="예: 체계적이고 분석적이며, 큰 그림을 보면서도 세부 사항을 놓치지 않습니다."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="communicationStyle">대화 스타일</Label>
                  <Textarea
                    id="communicationStyle"
                    value={communicationStyle}
                    onChange={(e) => setCommunicationStyle(e.target.value)}
                    placeholder="예: 명확하고 구조적인 의사소통을 선호하며, 데이터와 근거를 바탕으로 설명합니다."
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
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          {step === 'customize' && (
            <Button variant="outline" onClick={() => setStep('select')}>
              이전
            </Button>
          )}
          <Button variant="outline" onClick={handleClose}>
            취소
          </Button>
          {step === 'customize' && (
            <Button
              onClick={handleSubmit}
              disabled={!name.trim() || !role.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  팀원 추가
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
