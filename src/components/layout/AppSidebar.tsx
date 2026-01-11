'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Users,
  UserCircle,
  ListTodo,
  FileText,
  History,
  Settings,
} from 'lucide-react'
import { useTeamStore } from '@/stores'

const mainNavItems = [
  {
    title: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: '팀 관리',
    href: '/teams',
    icon: Users,
  },
]

const teamNavItems = [
  {
    title: '팀원 관리',
    href: '/agents',
    icon: UserCircle,
  },
  {
    title: '업무 수행',
    href: '/tasks',
    icon: ListTodo,
  },
  {
    title: '결과물',
    href: '/results',
    icon: FileText,
  },
  {
    title: '이력',
    href: '/history',
    icon: History,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { currentTeamId, getCurrentTeam } = useTeamStore()
  const currentTeam = getCurrentTeam()

  const getTeamHref = (basePath: string) => {
    if (currentTeamId) {
      return `/teams/${currentTeamId}${basePath}`
    }
    return '/teams'
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-bold text-sm">김</span>
          </div>
          <span className="font-bold text-lg">김팀장</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메인</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {currentTeam && (
          <SidebarGroup>
            <SidebarGroupLabel>{currentTeam.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {teamNavItems.map((item) => {
                  const href = getTeamHref(item.href)
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes(item.href)}
                      >
                        <Link href={href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith('/settings')}>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>설정</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
