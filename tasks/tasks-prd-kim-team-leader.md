# Tasks: 김팀장 - AI 팀 관리 SaaS 플랫폼

**PRD 참조**: `tasks/prd-kim-team-leader.md`
**생성일**: 2026-01-08

---

## Relevant Files

### 프로젝트 구조
- `package.json` - 프로젝트 의존성 및 스크립트 정의
- `next.config.js` - Next.js 설정 파일
- `tailwind.config.ts` - Tailwind CSS 설정
- `.env.local` - 환경 변수 (API 키, DB 연결 등)
- `prisma/schema.prisma` - 데이터베이스 스키마 정의

### 공통 컴포넌트 및 유틸리티
- `src/components/ui/` - shadcn/ui 기반 공통 UI 컴포넌트
- `src/components/layout/Header.tsx` - 헤더 네비게이션 컴포넌트
- `src/components/layout/Sidebar.tsx` - 사이드바 컴포넌트
- `src/components/layout/Layout.tsx` - 전체 레이아웃 래퍼
- `src/lib/utils.ts` - 공통 유틸리티 함수
- `src/lib/api.ts` - API 클라이언트 설정

### 인증 관련
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth.js 인증 라우트
- `src/app/(auth)/login/page.tsx` - 로그인 페이지
- `src/app/(auth)/signup/page.tsx` - 회원가입 페이지
- `src/lib/auth.ts` - 인증 설정 및 헬퍼 함수
- `src/middleware.ts` - 인증 미들웨어

### 팀 관리 관련
- `src/app/(dashboard)/teams/page.tsx` - 팀 목록 페이지
- `src/app/(dashboard)/teams/[teamId]/page.tsx` - 팀 상세/대시보드 페이지
- `src/app/api/teams/route.ts` - 팀 CRUD API 라우트
- `src/app/api/teams/[teamId]/route.ts` - 개별 팀 API 라우트
- `src/components/teams/TeamCard.tsx` - 팀 카드 컴포넌트
- `src/components/teams/TeamCreateModal.tsx` - 팀 생성 모달
- `src/components/teams/TeamEditModal.tsx` - 팀 수정 모달
- `src/components/teams/TeamSelector.tsx` - 팀 전환 드롭다운
- `src/stores/teamStore.ts` - 팀 상태 관리 (Zustand)

### 에이전트/팀원 관련
- `src/app/(dashboard)/teams/[teamId]/agents/page.tsx` - 팀원 관리 페이지
- `src/app/api/agents/route.ts` - 에이전트 CRUD API 라우트
- `src/app/api/agents/[agentId]/route.ts` - 개별 에이전트 API 라우트
- `src/app/api/agents/templates/route.ts` - 기본 에이전트 템플릿 API
- `src/components/agents/AgentCard.tsx` - 에이전트 캐릭터 카드 컴포넌트
- `src/components/agents/AgentGallery.tsx` - 에이전트 갤러리 뷰
- `src/components/agents/AgentDetailPanel.tsx` - 에이전트 상세 정보 패널
- `src/components/agents/AgentCreateModal.tsx` - 에이전트 생성 모달
- `src/stores/agentStore.ts` - 에이전트 상태 관리

### 캐릭터/페르소나 생성 관련
- `src/app/(dashboard)/character/create/page.tsx` - 캐릭터 생성 페이지
- `src/app/api/persona/generate/route.ts` - 페르소나 자동 생성 API
- `src/app/api/persona/templates/route.ts` - 페르소나 템플릿 API
- `src/app/api/images/generate/route.ts` - AI 이미지 생성 API
- `src/app/api/images/upload/route.ts` - 이미지 업로드 API
- `src/app/api/resume/parse/route.ts` - 이력서 파싱 API
- `src/components/character/CreationMethodSelector.tsx` - 생성 방법 선택 UI
- `src/components/character/ResumeUploader.tsx` - 이력서 업로드 컴포넌트
- `src/components/character/PersonaEditor.tsx` - 페르소나 편집기
- `src/components/character/ChatPersonaBuilder.tsx` - 대화형 페르소나 빌더
- `src/components/character/ImageSelector.tsx` - 이미지 선택/생성/업로드 UI
- `src/components/character/CharacterCardPreview.tsx` - 카드 미리보기

### 업무 수행 관련
- `src/app/(dashboard)/teams/[teamId]/tasks/page.tsx` - 업무 수행 페이지
- `src/app/(dashboard)/teams/[teamId]/tasks/[taskId]/page.tsx` - 개별 태스크 상세
- `src/app/api/tasks/route.ts` - 태스크 CRUD API
- `src/app/api/tasks/[taskId]/route.ts` - 개별 태스크 API
- `src/app/api/tasks/[taskId]/execute/route.ts` - 태스크 실행 API
- `src/components/tasks/TaskInput.tsx` - 자연어 업무 지시 입력
- `src/components/tasks/AgentSelector.tsx` - 팀원 선택 인터페이스
- `src/components/tasks/WorkflowBuilder.tsx` - 워크플로우 빌더 (순차/병렬)
- `src/components/tasks/SupervisionSettings.tsx` - 감독 수준 설정
- `src/components/tasks/TaskProgress.tsx` - 실시간 진행 상황 표시
- `src/stores/taskStore.ts` - 태스크 상태 관리
- `src/lib/ai/orchestrator.ts` - 에이전트 오케스트레이션 로직

### AI 서비스 관련
- `src/lib/ai/llm.ts` - LLM API 클라이언트 (Google Gemini)
- `src/lib/ai/imageGen.ts` - 이미지 생성 API 클라이언트 (Google Imagen/Vertex AI)
- `src/lib/ai/documentParser.ts` - 문서 파싱 유틸리티
- `src/lib/ai/agentRunner.ts` - 에이전트 실행 로직

### 결과 관리 관련
- `src/app/(dashboard)/teams/[teamId]/results/page.tsx` - 결과 목록 페이지
- `src/app/(dashboard)/teams/[teamId]/results/[resultId]/page.tsx` - 결과 상세
- `src/app/api/results/route.ts` - 결과 조회 API
- `src/app/api/results/[resultId]/route.ts` - 개별 결과 API
- `src/app/api/results/[resultId]/approve/route.ts` - 결과 승인 API
- `src/app/api/results/[resultId]/download/route.ts` - 결과 다운로드 API
- `src/components/results/ResultPreview.tsx` - 결과물 미리보기 (마크다운/코드/이미지)
- `src/components/results/ApprovalActions.tsx` - 승인/반려 버튼
- `src/components/results/DownloadButton.tsx` - 다운로드 버튼
- `src/components/results/FeedbackInput.tsx` - 피드백 입력

### 이력 관리 관련
- `src/app/(dashboard)/history/page.tsx` - 작업 이력 페이지
- `src/app/api/history/route.ts` - 이력 조회 API
- `src/components/history/HistoryList.tsx` - 이력 목록 컴포넌트
- `src/components/history/HistoryItem.tsx` - 개별 이력 아이템

### 데이터베이스 모델 (Prisma)
- `prisma/schema.prisma` - 전체 스키마 (User, Team, Agent, Persona, Task, Result, History)

---

## Tasks

- [ ] **1.0 프로젝트 초기 설정 및 인프라 구축**
    - [ ] 1.1 Next.js 14 프로젝트 생성 (App Router, TypeScript)
    - [ ] 1.2 Tailwind CSS 및 shadcn/ui 설치 및 설정
    - [ ] 1.3 Zustand 상태 관리 라이브러리 설치 및 기본 스토어 구조 설정
    - [ ] 1.4 Prisma ORM 설치 및 PostgreSQL 연결 설정
    - [ ] 1.5 데이터베이스 스키마 설계 및 마이그레이션 (User, Team, Agent, Persona, Task, Result, History)
    - [ ] 1.6 NextAuth.js 설치 및 이메일/소셜 로그인 설정 (Google, GitHub)
    - [ ] 1.7 인증 미들웨어 구현 (보호된 라우트 설정)
    - [ ] 1.8 로그인/회원가입 페이지 UI 구현
    - [ ] 1.9 공통 레이아웃 컴포넌트 구현 (Header, Sidebar, Layout)
    - [ ] 1.10 공통 UI 컴포넌트 설정 (Button, Card, Modal, Input 등 shadcn/ui 컴포넌트)
    - [ ] 1.11 환경 변수 설정 (.env.local - DB, API 키 등)
    - [ ] 1.12 API 클라이언트 유틸리티 설정 (fetch wrapper, 에러 핸들링)

- [ ] **2.0 팀/부서 관리 기능 개발**
    - [ ] 2.1 팀 데이터 모델 정의 및 Prisma 스키마 작성
    - [ ] 2.2 팀 CRUD API 엔드포인트 구현 (GET, POST, PUT, DELETE)
    - [ ] 2.3 팀 목록 페이지 UI 구현 (카드 그리드 뷰)
    - [ ] 2.4 팀 카드 컴포넌트 구현 (이름, 설명, 팀원 수 표시)
    - [ ] 2.5 팀 생성 모달 구현 (이름, 설명, 목적 입력 폼)
    - [ ] 2.6 팀 수정 모달 구현 (기존 정보 편집)
    - [ ] 2.7 팀 삭제 기능 구현 (확인 다이얼로그 포함)
    - [ ] 2.8 팀 상세/대시보드 페이지 구현 (팀 개요, 활성 작업, 팀원 현황)
    - [ ] 2.9 팀 전환 드롭다운 컴포넌트 구현 (헤더에 배치)
    - [ ] 2.10 범용 팀 템플릿 데이터 생성 및 적용 로직 구현
    - [ ] 2.11 팀 상태 관리 스토어 구현 (Zustand - 현재 팀, 팀 목록)

- [ ] **3.0 팀원(에이전트) 관리 및 캐릭터 시스템 개발**
    - [ ] 3.1 에이전트/페르소나 데이터 모델 정의 및 Prisma 스키마 작성
    - [ ] 3.2 에이전트 CRUD API 엔드포인트 구현
    - [ ] 3.3 기본 에이전트 템플릿 API 구현 (범용 역할: 기획자, 개발자, 디자이너, 마케터, 분석가)
    - [ ] 3.4 팀원 관리 페이지 UI 구현 (갤러리 뷰)
    - [ ] 3.5 에이전트 캐릭터 카드 컴포넌트 구현 (게임 카드 스타일 - 이름, 역할, 능력치, 이미지)
    - [ ] 3.6 에이전트 상세 정보 패널 구현 (페르소나 정보, 스킬, 이력)
    - [ ] 3.7 에이전트 추가/편집 모달 구현
    - [ ] 3.8 캐릭터 생성 페이지 구현 - 생성 방법 선택 UI (이력서/템플릿/대화형)
    - [ ] 3.9 이력서 업로드 컴포넌트 구현 (PDF/DOCX 드래그앤드롭)
    - [ ] 3.10 이력서 파싱 API 구현 (문서에서 경력, 스킬 추출)
    - [ ] 3.11 이력서 기반 페르소나 자동 생성 API 구현 (LLM 활용)
    - [ ] 3.12 페르소나 템플릿 API 구현 (기본 템플릿 목록 제공)
    - [ ] 3.13 페르소나 편집기 컴포넌트 구현 (이름, 역할, 성격, 전문분야, 대화스타일 편집)
    - [ ] 3.14 대화형 페르소나 빌더 구현 (AI와 단계별 대화로 페르소나 구성)
    - [ ] 3.15 AI 이미지 생성 API 연동 구현 (Google Imagen 3 via Vertex AI)
    - [ ] 3.16 프리셋 이미지 선택 UI 구현 (미리 준비된 캐릭터 이미지)
    - [ ] 3.17 사용자 이미지 업로드 기능 구현 (Google Cloud Storage 연동)
    - [ ] 3.18 이미지 선택기 컴포넌트 통합 구현 (AI 생성/프리셋/업로드 탭)
    - [ ] 3.19 캐릭터 카드 미리보기 컴포넌트 구현 (실시간 프리뷰)
    - [ ] 3.20 팀장 페르소나 설정 기능 구현 (사용자 프로필에 연동)
    - [ ] 3.21 에이전트 상태 관리 스토어 구현 (Zustand)

- [ ] **4.0 업무 수행 및 워크플로우 시스템 개발**
    - [ ] 4.1 태스크 데이터 모델 정의 및 Prisma 스키마 작성
    - [ ] 4.2 태스크 CRUD API 엔드포인트 구현
    - [ ] 4.3 LLM API 클라이언트 구현 (Google Gemini API - @google/generative-ai 패키지)
    - [ ] 4.4 에이전트 실행 로직 구현 (페르소나 기반 프롬프트 생성 및 실행)
    - [ ] 4.5 업무 수행 페이지 UI 구현
    - [ ] 4.6 자연어 업무 지시 입력 컴포넌트 구현 (텍스트 영역 + 제출)
    - [ ] 4.7 팀원 선택 인터페이스 구현 (단일/다중 선택, 카드 기반)
    - [ ] 4.8 워크플로우 빌더 컴포넌트 구현 - 순차 처리 설정
    - [ ] 4.9 워크플로우 빌더 컴포넌트 구현 - 병렬 처리 설정
    - [ ] 4.10 워크플로우 빌더 컴포넌트 구현 - 순차/병렬 혼합 (드래그앤드롭)
    - [ ] 4.11 감독 수준 설정 컴포넌트 구현 (실시간/결과 리뷰/단계별 개입 선택)
    - [ ] 4.12 태스크 실행 API 구현 (워크플로우 기반 에이전트 오케스트레이션)
    - [ ] 4.13 에이전트 오케스트레이터 구현 (순차/병렬 실행 로직)
    - [ ] 4.14 실시간 진행 상황 표시 컴포넌트 구현 (SSE/WebSocket 연동)
    - [ ] 4.15 실시간 통신 백엔드 구현 (Server-Sent Events 또는 WebSocket)
    - [ ] 4.16 단계별 개입 기능 구현 (중간 결과 확인 및 피드백 입력)
    - [ ] 4.17 개별 태스크 상세 페이지 구현 (진행 상황, 로그, 결과)
    - [ ] 4.18 태스크 상태 관리 스토어 구현 (Zustand)

- [ ] **5.0 결과 관리 및 이력 기능 개발**
    - [ ] 5.1 결과(Result) 데이터 모델 정의 및 Prisma 스키마 작성
    - [ ] 5.2 결과 조회 API 엔드포인트 구현
    - [ ] 5.3 결과 목록 페이지 UI 구현 (최근 결과물 리스트)
    - [ ] 5.4 결과물 미리보기 컴포넌트 구현 - 마크다운 렌더링
    - [ ] 5.5 결과물 미리보기 컴포넌트 구현 - 코드 하이라이팅 (Prism.js/highlight.js)
    - [ ] 5.6 결과물 미리보기 컴포넌트 구현 - 이미지 뷰어
    - [ ] 5.7 결과 상세 페이지 구현 (전체 결과물 표시)
    - [ ] 5.8 승인/반려 기능 API 구현
    - [ ] 5.9 승인/반려 버튼 컴포넌트 구현
    - [ ] 5.10 수정 요청 시 피드백 입력 컴포넌트 구현
    - [ ] 5.11 결과물 다운로드 API 구현 (텍스트, 코드, 이미지 파일 생성)
    - [ ] 5.12 다운로드 버튼 컴포넌트 구현 (형식 선택 가능)
    - [ ] 5.13 이력(History) 데이터 모델 정의 및 Prisma 스키마 작성
    - [ ] 5.14 이력 조회 API 구현 (최근 작업 목록)
    - [ ] 5.15 작업 이력 페이지 UI 구현
    - [ ] 5.16 이력 목록 컴포넌트 구현 (날짜, 태스크명, 상태, 결과 요약)
    - [ ] 5.17 이력 상세 조회 기능 구현 (이전 결과물 다시 확인)

---

## Implementation Notes

### 우선순위 가이드
1. **Phase 1 (Core)**: 1.0 전체 → 2.0 전체 → 3.1~3.7 (기본 에이전트 관리)
2. **Phase 2 (Character)**: 3.8~3.21 (캐릭터/페르소나 시스템)
3. **Phase 3 (Workflow)**: 4.0 전체 (업무 수행 핵심)
4. **Phase 4 (Polish)**: 5.0 전체 (결과 및 이력)

### 기술 결정 사항 (PRD Open Questions 관련)
- **LLM**: Google AI (Gemini) 사용 - Gemini 1.5 Flash(일반), Gemini 1.5 Pro(복잡한 작업)
- **이미지 생성**: Google Imagen 3 (Vertex AI) 메인, Stable Diffusion 대안
- **실시간 통신**: Server-Sent Events (SSE) 사용 (WebSocket보다 구현 단순)
- **파일 저장**: Google Cloud Storage 사용 (Google 서비스 통합)

### 테스트 고려사항
- 각 API 엔드포인트에 대한 통합 테스트 작성
- 주요 컴포넌트에 대한 단위 테스트 (Jest + React Testing Library)
- E2E 테스트 (Playwright) - 핵심 사용자 플로우

---

*이 태스크 리스트는 PRD 변경에 따라 업데이트될 수 있습니다.*
