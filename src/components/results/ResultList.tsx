'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { ResultCard, ResultData } from './ResultCard'
import { FileText, Search, Filter } from 'lucide-react'

interface ResultListProps {
  results: ResultData[]
  teamId: string
  isLoading?: boolean
  onRefresh?: () => void
}

export function ResultList({ results, teamId, isLoading, onRefresh }: ResultListProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredResults = results.filter((result) => {
    const matchesSearch = result.title.toLowerCase().includes(search.toLowerCase()) ||
      result.content.toLowerCase().includes(search.toLowerCase()) ||
      result.task.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || result.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const resultsByStatus = {
    pending: filteredResults.filter(r => r.status === 'PENDING'),
    approved: filteredResults.filter(r => r.status === 'APPROVED'),
    rejected: filteredResults.filter(r => r.status === 'REJECTED'),
    revisionRequested: filteredResults.filter(r => r.status === 'REVISION_REQUESTED'),
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="결과 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="PENDING">검토 대기</SelectItem>
              <SelectItem value="APPROVED">승인됨</SelectItem>
              <SelectItem value="REJECTED">반려됨</SelectItem>
              <SelectItem value="REVISION_REQUESTED">수정 요청</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result List */}
      {filteredResults.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">
            {results.length === 0 ? '아직 결과물이 없습니다' : '검색 결과가 없습니다'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {results.length === 0
              ? '업무를 실행하면 결과물이 이곳에 표시됩니다.'
              : '다른 검색어로 시도해보세요.'}
          </p>
        </div>
      ) : statusFilter === 'all' ? (
        <div className="space-y-8">
          {/* Pending Review */}
          {resultsByStatus.pending.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                검토 대기 ({resultsByStatus.pending.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {resultsByStatus.pending.map((result) => (
                  <ResultCard
                    key={result.id}
                    result={result}
                    teamId={teamId}
                    onStatusChange={onRefresh}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Revision Requested */}
          {resultsByStatus.revisionRequested.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                수정 요청 ({resultsByStatus.revisionRequested.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {resultsByStatus.revisionRequested.map((result) => (
                  <ResultCard
                    key={result.id}
                    result={result}
                    teamId={teamId}
                    onStatusChange={onRefresh}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Approved */}
          {resultsByStatus.approved.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                승인됨 ({resultsByStatus.approved.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {resultsByStatus.approved.map((result) => (
                  <ResultCard
                    key={result.id}
                    result={result}
                    teamId={teamId}
                    onStatusChange={onRefresh}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Rejected */}
          {resultsByStatus.rejected.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                반려됨 ({resultsByStatus.rejected.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {resultsByStatus.rejected.map((result) => (
                  <ResultCard
                    key={result.id}
                    result={result}
                    teamId={teamId}
                    onStatusChange={onRefresh}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredResults.map((result) => (
            <ResultCard
              key={result.id}
              result={result}
              teamId={teamId}
              onStatusChange={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  )
}
