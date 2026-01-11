# Development Stacks

3-STEP AI CODING WORKFLOW에서 사용하는 개발 스택 정의 파일 모음.

## Available Stacks

| Stack ID | Framework | Default | Best For |
|----------|-----------|---------|----------|
| `rails8` | Ruby on Rails 8 | **Yes** | SaaS, 1인개발, AI서비스 |
| `nextjs` | Next.js 15 | No | React SPA, Vercel 배포 |
| `django` | Django 5 | No | Python/ML 연동, 관리자 중심 |
| `laravel` | Laravel 11 | No | PHP 생태계, 빠른 CRUD |

## Stack Selection Guide

### Decision Matrix

```
질문 1: 팀 규모?
├─ 1인 또는 소규모 (1-3명) → Rails 8 권장
└─ 중규모 이상 → 팀 기술 스택에 따라 선택

질문 2: 주요 언어 경험?
├─ Ruby → Rails 8
├─ Python → Django
├─ PHP → Laravel
├─ JavaScript/TypeScript → Next.js
└─ 경험 없음/상관없음 → Rails 8 (가장 생산적)

질문 3: 프론트엔드 복잡도?
├─ 간단한 UI → Rails 8 (Hotwire) 또는 Django (HTMX)
├─ 복잡한 SPA → Next.js
└─ 중간 수준 → Rails 8 또는 Laravel (Livewire)

질문 4: 배포 환경?
├─ Vercel 선호 → Next.js
├─ 단일 서버/VPS → Rails 8, Django, Laravel
├─ AWS/GCP → 모든 스택 가능
└─ Serverless → Next.js

질문 5: 특수 요구사항?
├─ ML/AI 통합 → Django (Python 생태계)
├─ 실시간 기능 중심 → Rails 8 (Solid Cable)
├─ 관리자 패널 중요 → Django (Admin)
└─ 빠른 MVP → Rails 8
```

## Usage in /prd

```bash
# 기본 (Rails 8)
/prd [feature-description]

# 스택 지정
/prd --stack nextjs [feature-description]
/prd --stack django [feature-description]
/prd --stack laravel [feature-description]

# 스택 선택 도움 요청
/prd --help-stack [feature-description]
```

## Adding New Stack

1. `dev-stacks/` 디렉토리에 `[stack-id].md` 파일 생성
2. 아래 섹션 필수 포함:
   - Overview
   - Stack Components (테이블)
   - Best For / Not Recommended For
   - Infrastructure (다이어그램)
   - Cost Estimate
   - Directory Structure
   - Key Dependencies
   - PRD/Tasks Generation Notes

## File Structure

```
dev-stacks/
├── README.md          # This file
├── rails8.md          # Rails 8 (Default)
├── nextjs.md          # Next.js
├── django.md          # Django
└── laravel.md         # Laravel
```
