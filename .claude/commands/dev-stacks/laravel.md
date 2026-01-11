# Laravel Stack

**Stack ID**: `laravel`
**Status**: Alternative

## Overview

PHP 기반 풀스택 프레임워크. 우아한 문법, 풍부한 에코시스템, 빠른 개발.

## Stack Components

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Laravel 11 | PHP full-stack framework |
| **Database** | MySQL / PostgreSQL / SQLite | Relational database |
| **Background Jobs** | Laravel Queue | Job processing |
| **Caching** | Laravel Cache (Redis/File) | Application caching |
| **Real-time** | Laravel Reverb / Pusher | WebSocket broadcasting |
| **Frontend** | Livewire / Inertia.js | SPA-like experience |
| **CSS** | Tailwind CSS | Utility-first styling |
| **Deployment** | Laravel Forge / Vapor | Managed deployment |

## Best For

- PHP 생태계 활용
- 빠른 CRUD 개발
- 전자상거래 (Shopify alternatives)
- SaaS with Spark/Jetstream
- 워드프레스 대체 CMS

## Not Recommended For

- Python/Ruby 선호 팀
- 마이크로서비스 아키텍처
- 서버리스 우선 프로젝트

## Infrastructure

```
표준 아키텍처:
┌─────────────────────────────────────┐
│           App Server                │
│  ┌─────────────────────────────┐   │
│  │     Laravel Application     │   │
│  │  ┌───────────────────────┐ │   │
│  │  │  Livewire / Inertia   │ │   │
│  │  │  Laravel Queue        │ │   │
│  │  │  Laravel Reverb       │ │   │
│  │  └───────────────────────┘ │   │
│  └─────────────────────────────┘   │
└───────────────┬─────────────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌───────┐  ┌───────┐  ┌───────┐
│ MySQL │  │ Redis │  │Queue  │
│       │  │(Cache)│  │Worker │
└───────┘  └───────┘  └───────┘
```

## Cost Estimate

| Item | Monthly Cost |
|------|--------------|
| Laravel Forge | $12 |
| DigitalOcean Droplet | $6-24 |
| Database | Included |
| **Total** | **$18-36/month** |

## Directory Structure

```
laravel/
├── app/
│   ├── Http/Controllers/
│   ├── Models/
│   ├── Jobs/
│   └── Livewire/
├── resources/
│   ├── views/
│   └── js/
├── routes/
├── database/
│   └── migrations/
├── composer.json
└── Dockerfile
```

## Key Dependencies

```json
{
  "require": {
    "php": "^8.2",
    "laravel/framework": "^11.0",
    "livewire/livewire": "^3.0",
    "laravel/reverb": "^1.0"
  }
}
```

## PRD/Tasks Generation Notes

PRD 생성 시 다음 고려사항 포함:
- Livewire vs Inertia.js 선택
- Eloquent ORM 모델 설계
- Laravel Queue 작업 설계
- Laravel Reverb 실시간 기능
- Laravel Sanctum/Passport 인증

## References

- [Laravel Documentation](https://laravel.com/docs)
- [Livewire Documentation](https://livewire.laravel.com)
- [Laravel Forge](https://forge.laravel.com)
