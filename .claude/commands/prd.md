---
command: "/prd"
category: "Planning"
purpose: "Generate Product Requirements Document (PRD) with stack selection"
---

# Create Product Requirements Document

Reference: @3-step-AI-coding-workflow/create-prd.mdc

## Purpose

Guide AI in creating a detailed Product Requirements Document (PRD) based on user's initial feature request. The PRD should be clear, actionable, and suitable for a junior developer to understand and implement.

## Usage

```bash
# Basic (Rails 8 default)
/prd [feature-description]

# With stack selection
/prd --stack rails8 [feature-description]   # Rails 8 (default)
/prd --stack nextjs [feature-description]   # Next.js
/prd --stack django [feature-description]   # Django
/prd --stack laravel [feature-description]  # Laravel

# Stack selection help
/prd --help-stack [feature-description]
```

**Examples**:
- `/prd user profile editing feature`
- `/prd --stack nextjs data export functionality`
- `/prd --help-stack AI agent management system`

## Development Stack Selection

### Default Stack: Rails 8

Rails 8 + SQLite + Solid Trio 스택이 기본값입니다:
- 1인 개발자/소규모 팀에 최적화
- 인프라 비용 최소화 (월 ~$20)
- 단일 서버 아키텍처
- 빠른 MVP 개발

### Stack Options

| Stack ID | Framework | Best For |
|----------|-----------|----------|
| `rails8` | Rails 8 + Solid Trio | SaaS, 1인개발, AI서비스 (Default) |
| `nextjs` | Next.js 15 + Prisma | React SPA, Vercel 배포 |
| `django` | Django 5 + DRF | Python/ML 연동, 관리자 중심 |
| `laravel` | Laravel 11 + Livewire | PHP 생태계, 빠른 CRUD |

Stack 상세 정보: `@dev-stacks/[stack-id].md` 참조

### --help-stack 사용 시

스택 선택 도움이 필요하면 다음 질문으로 적합한 스택을 추천:

1. **팀 규모**: 1인/소규모 → Rails 8 권장
2. **주요 언어 경험**: Ruby/Python/PHP/JS
3. **프론트엔드 복잡도**: 간단/중간/복잡
4. **배포 환경**: VPS/Vercel/AWS
5. **특수 요구사항**: ML연동/실시간/관리자패널

## Process

1. **Receive Initial Prompt**: User provides brief feature description
2. **Stack Selection**:
   - If `--stack` specified: Use that stack
   - If `--help-stack`: Ask stack selection questions first
   - Otherwise: Use Rails 8 (default)
3. **Ask Clarifying Questions**:
   - Use numbered format with nested sub-questions (e.g., 1, 2, 2.1, 2.2, 3)
   - One atomic question per list item
   - Cover: Problem/Goal, Target User, Core Functionality, User Stories, Acceptance Criteria, Scope/Boundaries, Data, Design/UI, Edge Cases
4. **Generate PRD**: Based on answers, create comprehensive PRD
5. **Save PRD**: Save as `tasks/prd-[feature-name].md`

## PRD Structure

Generated PRD must include:

1. **Introduction/Overview**: Feature description and problem it solves
2. **Development Stack**: Selected stack with rationale
3. **Goals**: Specific, measurable objectives
4. **User Stories**: User narratives describing usage and benefits
5. **Functional Requirements**: Specific functionalities (numbered, clear language)
6. **Non-Goals (Out of Scope)**: What feature will NOT include
7. **Design Considerations** (Optional): UI/UX requirements, mockups, components
8. **Technical Considerations**: Stack-specific constraints, dependencies, integrations
9. **Success Metrics**: How success will be measured
10. **Open Questions**: Remaining clarifications needed

## Stack-Specific Technical Considerations

### Rails 8 (`rails8`)

```markdown
### Stack: Rails 8 + Solid Trio

**Components**:
- Framework: Ruby on Rails 8
- Database: SQLite (WAL mode)
- Background Jobs: Solid Queue
- Caching: Solid Cache
- Real-time: Solid Cable + Hotwire
- Frontend: Turbo + Stimulus + Tailwind

**Infrastructure**: Single server (~$20/month)

**Key Patterns**: Hotwire, Turbo Frames/Streams, Stimulus, Active Storage
```

### Next.js (`nextjs`)

```markdown
### Stack: Next.js 15 + Prisma

**Components**:
- Framework: Next.js 15 (App Router)
- Database: PostgreSQL + Prisma
- Auth: NextAuth.js
- Background Jobs: Inngest/Trigger.dev
- Real-time: Pusher/Ably

**Infrastructure**: Serverless/Vercel ($20-50/month)

**Key Patterns**: Server/Client Components, Server Actions, Edge Functions
```

### Django (`django`)

```markdown
### Stack: Django 5 + DRF

**Components**:
- Framework: Django 5
- Database: PostgreSQL
- Background Jobs: Celery + Redis
- Frontend: HTMX + Alpine.js

**Infrastructure**: Single/Multi server ($5-45/month)

**Key Patterns**: Django Admin, DRF, HTMX
```

### Laravel (`laravel`)

```markdown
### Stack: Laravel 11 + Livewire

**Components**:
- Framework: Laravel 11
- Database: MySQL/PostgreSQL
- Background Jobs: Laravel Queue
- Real-time: Laravel Reverb
- Frontend: Livewire 3

**Infrastructure**: Laravel Forge ($18-36/month)

**Key Patterns**: Livewire, Eloquent ORM, Laravel Queue
```

## Target Audience

Primary reader: **Junior Developer**
- Requirements should be explicit and unambiguous
- Avoid jargon where possible
- Provide enough detail for understanding purpose and core logic

## Final Instructions

1. **Do NOT start implementing the PRD**
2. **Make sure to ask clarifying questions first**
3. **Include stack selection in PRD**
4. **Take user's answers and improve the PRD**
5. **Save to tasks/ directory**

## Auto-Activations

- Persona: `--persona-scribe` (professional writing)
- Persona: `--persona-mentor` (clear explanations for junior devs)
- Persona: `--persona-architect` (stack-specific technical decisions)
