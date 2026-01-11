# Next.js Full-Stack

**Stack ID**: `nextjs`
**Status**: Alternative

## Overview

React 기반 풀스택 프레임워크. SSR/SSG 지원, Vercel 배포 최적화.

## Stack Components

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 15 (App Router) | React full-stack framework |
| **Database** | PostgreSQL / Prisma | Relational database + ORM |
| **Auth** | NextAuth.js / Clerk | Authentication |
| **Background Jobs** | Inngest / Trigger.dev | Serverless job processing |
| **Caching** | Vercel KV / Redis | Key-value caching |
| **Real-time** | Pusher / Ably | WebSocket service |
| **CSS** | Tailwind CSS | Utility-first styling |
| **Deployment** | Vercel / Railway | Serverless/Container deployment |

## Best For

- React 기반 SPA/SSR 앱
- JAMstack 사이트
- 정적 사이트 + 동적 기능
- Vercel 에코시스템 활용
- 프론트엔드 중심 팀

## Not Recommended For

- 복잡한 백엔드 로직 중심 앱
- 실시간 기능이 핵심인 서비스 (별도 서비스 필요)
- 서버 사이드 복잡성이 높은 프로젝트

## Infrastructure

```
Serverless 아키텍처:
┌─────────────────────────────────────┐
│            Vercel Edge              │
│  ┌─────────────────────────────┐   │
│  │     Next.js Application     │   │
│  │  ┌───────────────────────┐ │   │
│  │  │  API Routes / Actions │ │   │
│  │  └───────────────────────┘ │   │
│  └─────────────────────────────┘   │
└───────────────┬─────────────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌───────┐  ┌───────┐  ┌───────┐
│Postgres│  │ Redis │  │ Blob  │
│(Neon) │  │(Upstash)│ │Storage│
└───────┘  └───────┘  └───────┘
```

## Cost Estimate

| Item | Monthly Cost |
|------|--------------|
| Vercel Pro | $20 |
| Neon PostgreSQL | $0-19 |
| Upstash Redis | $0-10 |
| **Total** | **$20-50/month** |

## Directory Structure

```
app/
├── app/
│   ├── (auth)/
│   ├── api/
│   ├── dashboard/
│   └── layout.tsx
├── components/
├── lib/
│   ├── db.ts        # Prisma client
│   └── auth.ts      # Auth config
├── prisma/
│   └── schema.prisma
└── package.json
```

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "@prisma/client": "^5.0.0",
    "next-auth": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "zod": "^3.0.0"
  }
}
```

## PRD/Tasks Generation Notes

PRD 생성 시 다음 고려사항 포함:
- Server Components vs Client Components 구분
- Server Actions 활용
- API Routes 설계
- 외부 서비스 연동 (DB, Auth, Real-time)
- Edge Functions 활용 가능성

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
