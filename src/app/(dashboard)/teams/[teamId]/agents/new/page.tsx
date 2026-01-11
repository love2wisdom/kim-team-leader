'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  User,
  FileText,
  MessageSquare,
  Sparkles,
  Upload,
  Briefcase,
  Plus,
  X,
  Check,
  Loader2,
} from 'lucide-react'
import { api, isApiError } from '@/lib/api'
import { toast } from 'sonner'
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

export default function NewAgentPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = use(params)
  const router = useRouter()
  const [templates, setTemplates] = useState<AgentTemplate[]>([])
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [createMode, setCreateMode] = useState<'template' | 'resume' | 'chat' | 'custom'>('template')
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null)
  const [step, setStep] = useState<'select' | 'customize'>('select')

  // Form state
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [personality, setPersonality] = useState('')
  const [expertise, setExpertise] = useState<string[]>([])
  const [communicationStyle, setCommunicationStyle] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [newExpertise, setNewExpertise] = useState('')

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await api.get<AgentTemplate[]>('/agents/templates')
        setTemplates(data)
      } catch (error) {
        const message = isApiError(error) ? error.message : '템플릿을 불러오는데 실패했습니다.'
        toast.error(message)
      } finally {
        setIsLoadingTemplates(false)
      }
    }
    fetchTemplates()
  }, [])

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
    if (!name.trim() || !role.trim()) {
      toast.error('이름과 역할은 필수입니다.')
      return
    }

    setIsSubmitting(true)
    try {
      await api.post('/agents', {
        teamId,
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
      toast.success('팀원이 추가되었습니다.')
      router.push(`/teams/${teamId}`)
    } catch (error) {
      const message = isApiError(error) ? error.message : '팀원 추가에 실패했습니다.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/teams/${teamId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">새 팀원 추가</h1>
          <p className="text-muted-foreground">
            AI 팀원을 추가하여 업무를 자동화하세요.
          </p>
        </div>
      </div>

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

          <TabsContent value="template" className="mt-6">
            {isLoadingTemplates ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-40" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md hover:border-primary',
                      selectedTemplate?.id === template.id && 'border-primary ring-2 ring-primary/20'
                    )}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={template.presetImageUrl} />
                        <AvatarFallback>{template.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.role}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {template.defaultSkills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {template.defaultSkills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.defaultSkills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="resume" className="mt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Upload className="h-16 w-16 text-muted-foreground mb-4" />
                <h4 className="font-semibold text-xl mb-2">이력서 업로드</h4>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  PDF 또는 Word 형식의 이력서를 업로드하면<br />
                  자동으로 페르소나를 생성합니다.
                </p>
                <Button variant="outline" size="lg" disabled>
                  <Upload className="mr-2 h-5 w-5" />
                  파일 선택 (준비 중)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <h4 className="font-semibold text-xl mb-2">대화로 생성</h4>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  AI와 대화하면서 원하는 팀원의<br />
                  성격과 능력을 정의하세요.
                </p>
                <Button variant="outline" size="lg" disabled>
                  <MessageSquare className="mr-2 h-5 w-5" />
                  대화 시작 (준비 중)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Sparkles className="h-16 w-16 text-muted-foreground mb-4" />
                <h4 className="font-semibold text-xl mb-2">직접 생성</h4>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  모든 설정을 직접 입력하여<br />
                  맞춤형 팀원을 만드세요.
                </p>
                <Button size="lg" onClick={() => setStep('customize')}>
                  <Plus className="mr-2 h-5 w-5" />
                  새로 만들기
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* 기본 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  기본 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            {/* 페르소나 설정 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  페르소나 설정
                </CardTitle>
                <CardDescription>
                  팀원의 성격과 대화 스타일을 정의합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personality">성격</Label>
                  <Textarea
                    id="personality"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    placeholder="예: 체계적이고 분석적이며, 큰 그림을 보면서도 세부 사항을 놓치지 않습니다."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="communicationStyle">대화 스타일</Label>
                  <Textarea
                    id="communicationStyle"
                    value={communicationStyle}
                    onChange={(e) => setCommunicationStyle(e.target.value)}
                    placeholder="예: 명확하고 구조적인 의사소통을 선호하며, 데이터와 근거를 바탕으로 설명합니다."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 전문 분야 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  전문 분야
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((exp) => (
                    <Badge key={exp} variant="secondary" className="gap-1 text-sm py-1">
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
                      placeholder="전문 분야 추가..."
                      className="h-8 w-40"
                    />
                    <Button variant="outline" size="sm" onClick={handleAddExpertise}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 스킬 */}
            <Card>
              <CardHeader>
                <CardTitle>스킬</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="gap-1 text-sm py-1">
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
                      placeholder="스킬 추가..."
                      className="h-8 w-40"
                    />
                    <Button variant="outline" size="sm" onClick={handleAddSkill}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 미리보기 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>미리보기</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <Avatar className="h-20 w-20 mx-auto mb-3">
                    <AvatarImage src={selectedTemplate?.presetImageUrl || ''} />
                    <AvatarFallback className="text-2xl">
                      {name?.[0] || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{name || '이름'}</h3>
                  <p className="text-sm text-muted-foreground">{role || '역할'}</p>
                </div>

                {personality && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">성격</p>
                    <p className="text-sm line-clamp-3">{personality}</p>
                  </div>
                )}

                {expertise.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">전문 분야</p>
                    <div className="flex flex-wrap gap-1">
                      {expertise.map((exp) => (
                        <Badge key={exp} variant="secondary" className="text-xs">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">스킬</p>
                    <div className="flex flex-wrap gap-1">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-2">
                  <Button
                    className="w-full"
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
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setStep('select')
                      setSelectedTemplate(null)
                    }}
                  >
                    이전으로
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
