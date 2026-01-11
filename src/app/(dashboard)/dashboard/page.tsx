'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, UserCircle, ListTodo, FileText, Plus } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    {
      title: '팀',
      value: '0',
      description: '생성된 팀',
      icon: Users,
      href: '/teams',
    },
    {
      title: '팀원',
      value: '0',
      description: '활성 에이전트',
      icon: UserCircle,
      href: '/teams',
    },
    {
      title: '진행 중인 업무',
      value: '0',
      description: '현재 진행 중',
      icon: ListTodo,
      href: '/teams',
    },
    {
      title: '결과물',
      value: '0',
      description: '생성된 결과물',
      icon: FileText,
      href: '/teams',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            안녕하세요, {session?.user?.name || '사용자'}님
          </h1>
          <p className="text-muted-foreground">
            김팀장과 함께 AI 팀을 관리하세요.
          </p>
        </div>
        <Button asChild>
          <Link href="/teams/new">
            <Plus className="mr-2 h-4 w-4" />
            새 팀 만들기
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>시작하기</CardTitle>
            <CardDescription>
              김팀장을 처음 사용하시나요? 아래 단계를 따라해보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">팀 생성하기</h4>
                <p className="text-sm text-muted-foreground">
                  마케팅, 개발, 기획 등 원하는 목적의 팀을 만드세요.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">팀원(에이전트) 배치하기</h4>
                <p className="text-sm text-muted-foreground">
                  기본 템플릿을 사용하거나 이력서로 맞춤 에이전트를 만드세요.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">업무 지시하기</h4>
                <p className="text-sm text-muted-foreground">
                  자연어로 업무를 지시하고 팀원들이 수행하도록 하세요.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>팀의 최근 활동을 확인하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                아직 활동 이력이 없습니다.
              </p>
              <p className="text-sm text-muted-foreground">
                팀을 만들고 업무를 시작해보세요!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
