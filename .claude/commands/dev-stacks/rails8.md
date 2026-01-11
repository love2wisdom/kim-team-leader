# Rails 8 Stack (Default)

**Stack ID**: `rails8`
**Status**: Default / Recommended

## Overview

Rails 8의 SQLite + Solid Trio 통합 스택. 1인 개발자/소규모 팀에 최적화된 풀스택 프레임워크.

## Stack Components

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Ruby on Rails 8 | Full-stack MVC framework |
| **Database** | SQLite (WAL mode) | Production-ready embedded DB |
| **Background Jobs** | Solid Queue | Database-backed job processing |
| **Caching** | Solid Cache | Database-backed caching |
| **WebSocket** | Solid Cable | Real-time communication |
| **Frontend** | Hotwire (Turbo + Stimulus) | SPA-like experience without JS framework |
| **CSS** | Tailwind CSS | Utility-first styling |
| **Deployment** | Kamal / Docker | Container-based deployment |

## Best For

- SaaS 애플리케이션
- CRUD 중심 웹앱
- 실시간 기능이 필요한 서비스
- MVP/초기 스타트업
- 1인 개발자 프로젝트
- AI Agent 기반 서비스

## Not Recommended For

- 수평 확장이 즉시 필요한 대규모 서비스
- 정적 사이트 (Jamstack 권장)
- 모바일 앱 전용 API (API-only 모드 가능하지만 다른 옵션 고려)

## Infrastructure

```
단일 서버 아키텍처:
┌─────────────────────────────────────┐
│           Single Server             │
│  ┌─────────────────────────────┐   │
│  │      Rails Application      │   │
│  │  ┌───────┬───────┬───────┐ │   │
│  │  │Solid  │Solid  │Solid  │ │   │
│  │  │Queue  │Cache  │Cable  │ │   │
│  │  └───────┴───────┴───────┘ │   │
│  │           │                 │   │
│  │     ┌─────▼─────┐          │   │
│  │     │  SQLite   │          │   │
│  │     │ (WAL mode)│          │   │
│  │     └───────────┘          │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

## Cost Estimate

| Item | Monthly Cost |
|------|--------------|
| VPS (4GB RAM) | ~$20 (₩27,000) |
| Domain | ~$1 (₩1,300) |
| SSL | Free (Let's Encrypt) |
| **Total** | **~$21/month** |

## Directory Structure

```
app/
├── app/
│   ├── controllers/
│   ├── models/
│   ├── views/
│   ├── jobs/          # Solid Queue jobs
│   ├── channels/      # Solid Cable channels
│   └── javascript/    # Stimulus controllers
├── config/
├── db/
│   └── production.sqlite3
├── Dockerfile
└── Gemfile
```

## Key Gems

```ruby
# Gemfile
gem "rails", "~> 8.0"
gem "sqlite3"
gem "solid_queue"
gem "solid_cache"
gem "solid_cable"
gem "turbo-rails"
gem "stimulus-rails"
gem "tailwindcss-rails"
gem "kamal"
```

## Migration Path

SQLite → PostgreSQL 마이그레이션 필요시:
1. `database.yml` 수정
2. `pg` gem 추가
3. 데이터 마이그레이션 스크립트 실행
4. 배포 환경 업데이트

## PRD/Tasks Generation Notes

PRD 생성 시 다음 고려사항 포함:
- Hotwire 기반 UI 인터랙션 설계
- Solid Queue 활용한 비동기 작업 설계
- Active Storage 기반 파일 업로드
- Action Mailer 이메일 처리
- Turbo Streams 실시간 업데이트

## References

- [Rails 8 Release Notes](https://rubyonrails.org)
- [Solid Queue GitHub](https://github.com/rails/solid_queue)
- [Hotwire Documentation](https://hotwired.dev)
