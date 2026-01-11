'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-react'

interface AgentDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agent: {
    id: string
    name: string
    role: string
  } | null
  onConfirm: (agentId: string) => Promise<void>
}

export function AgentDeleteDialog({
  open,
  onOpenChange,
  agent,
  onConfirm,
}: AgentDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    if (!agent) return

    setIsDeleting(true)
    try {
      await onConfirm(agent.id)
      onOpenChange(false)
    } catch (error) {
      // Error handling is done in parent
    } finally {
      setIsDeleting(false)
    }
  }

  if (!agent) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>팀원을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong>{agent.name}</strong> ({agent.role})을(를) 삭제합니다.
            <br />
            이 작업은 되돌릴 수 없으며, 해당 팀원의 모든 대화 기록과 업무 결과가 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                삭제 중...
              </>
            ) : (
              '삭제'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
