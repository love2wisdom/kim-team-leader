'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import {
  Textarea,
} from '@/components/ui/textarea'
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Loader2,
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { api, isApiError } from '@/lib/api'
import { toast } from 'sonner'

export interface ResultData {
  id: string
  title: string
  content: string
  contentType: string
  status: string
  feedback: string | null
  fileUrl: string | null
  fileName: string | null
  createdAt: string
  approvedAt: string | null
  task: {
    id: string
    title: string
    status: string
  }
}

interface ResultCardProps {
  result: ResultData
  teamId: string
  onStatusChange?: () => void
  showTaskInfo?: boolean
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: {
    label: '검토 대기',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    icon: <Clock className="h-3 w-3" />,
  },
  APPROVED: {
    label: '승인됨',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  REJECTED: {
    label: '반려됨',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    icon: <XCircle className="h-3 w-3" />,
  },
  REVISION_REQUESTED: {
    label: '수정 요청',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    icon: <AlertCircle className="h-3 w-3" />,
  },
}

export function ResultCard({ result, teamId, onStatusChange, showTaskInfo = true }: ResultCardProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [feedback, setFeedback] = useState('')

  const status = statusConfig[result.status] || statusConfig.PENDING

  const handleApprove = async () => {
    setIsApproving(true)
    try {
      await api.put(`/results/${result.id}`, { status: 'approved' })
      toast.success('결과가 승인되었습니다.')
      onStatusChange?.()
    } catch (error) {
      const message = isApiError(error) ? error.message : '승인에 실패했습니다.'
      toast.error(message)
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    setIsRejecting(true)
    try {
      await api.put(`/results/${result.id}`, {
        status: 'rejected',
        feedback: feedback.trim() || null,
      })
      toast.success('결과가 반려되었습니다.')
      setShowRejectDialog(false)
      setFeedback('')
      onStatusChange?.()
    } catch (error) {
      const message = isApiError(error) ? error.message : '반려에 실패했습니다.'
      toast.error(message)
    } finally {
      setIsRejecting(false)
    }
  }

  const handleRequestRevision = async () => {
    setIsRejecting(true)
    try {
      await api.put(`/results/${result.id}`, {
        status: 'revision_requested',
        feedback: feedback.trim() || null,
      })
      toast.success('수정이 요청되었습니다.')
      setShowRejectDialog(false)
      setFeedback('')
      onStatusChange?.()
    } catch (error) {
      const message = isApiError(error) ? error.message : '수정 요청에 실패했습니다.'
      toast.error(message)
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <h3 className="font-semibold truncate">{result.title}</h3>
              </div>
              {showTaskInfo && (
                <Link
                  href={`/teams/${teamId}/tasks/${result.task.id}`}
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-1 mt-1"
                >
                  {result.task.title}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
            <Badge className={cn('shrink-0', status.color)}>
              {status.icon}
              <span className="ml-1">{status.label}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="bg-muted/50 rounded-lg p-3 max-h-40 overflow-hidden relative">
            <p className="text-sm whitespace-pre-wrap line-clamp-5">{result.content}</p>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/50 to-transparent" />
          </div>

          {result.feedback && (
            <div className="mt-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>피드백:</strong> {result.feedback}
              </p>
            </div>
          )}

          <div className="mt-3 text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(result.createdAt), { addSuffix: true, locale: ko })}
            {result.approvedAt && (
              <> · {format(new Date(result.approvedAt), 'M/d HH:mm', { locale: ko })} 승인됨</>
            )}
          </div>
        </CardContent>

        {result.status === 'PENDING' && (
          <CardFooter className="pt-2 flex gap-2">
            <Button
              size="sm"
              onClick={handleApprove}
              disabled={isApproving}
              className="flex-1"
            >
              {isApproving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  승인
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowRejectDialog(true)}
              className="flex-1"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              반려
            </Button>
          </CardFooter>
        )}

        {(result.status === 'REJECTED' || result.status === 'REVISION_REQUESTED') && (
          <CardFooter className="pt-2">
            <Button size="sm" variant="outline" className="w-full" asChild>
              <Link href={`/teams/${teamId}/tasks/${result.task.id}`}>
                <RotateCcw className="h-4 w-4 mr-1" />
                태스크 확인
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>결과 검토</AlertDialogTitle>
            <AlertDialogDescription>
              피드백을 입력하고 조치를 선택하세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            placeholder="피드백을 입력하세요 (선택사항)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
          />
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel disabled={isRejecting}>취소</AlertDialogCancel>
            <Button
              variant="outline"
              onClick={handleRequestRevision}
              disabled={isRejecting}
            >
              {isRejecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                '수정 요청'
              )}
            </Button>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleReject()
              }}
              disabled={isRejecting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isRejecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                '반려'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
