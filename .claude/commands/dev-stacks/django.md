# Django Stack

**Stack ID**: `django`
**Status**: Alternative

## Overview

Python 기반 풀스택 프레임워크. 빠른 개발, 강력한 ORM, 관리자 패널 기본 제공.

## Stack Components

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Django 5.x | Python full-stack framework |
| **Database** | PostgreSQL / SQLite | Relational database |
| **Background Jobs** | Celery + Redis / Django-Q | Async task processing |
| **Caching** | Django Cache (Redis/Memcached) | Application caching |
| **Real-time** | Django Channels | WebSocket support |
| **Frontend** | HTMX + Alpine.js / Django Templates | Minimal JS approach |
| **CSS** | Tailwind CSS | Utility-first styling |
| **Deployment** | Docker / Railway / Render | Container deployment |

## Best For

- 데이터 중심 애플리케이션
- 관리자 패널이 중요한 서비스
- Python 생태계 활용 (ML/AI 연동)
- 콘텐츠 관리 시스템 (CMS)
- API 서버 (DRF)

## Not Recommended For

- 실시간 기능 중심 앱 (추가 설정 필요)
- 매우 가벼운 마이크로서비스
- Node.js 생태계 선호 팀

## Infrastructure

```
표준 아키텍처:
┌─────────────────────────────────────┐
│           App Server                │
│  ┌─────────────────────────────┐   │
│  │     Django Application      │   │
│  │  ┌───────────────────────┐ │   │
│  │  │ Django Admin / Views  │ │   │
│  │  │ Django REST Framework │ │   │
│  │  └───────────────────────┘ │   │
│  └─────────────────────────────┘   │
└───────────────┬─────────────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌───────┐  ┌───────┐  ┌───────┐
│Postgres│  │ Redis │  │Celery │
│       │  │(Cache)│  │Worker │
└───────┘  └───────┘  └───────┘
```

## Cost Estimate

| Item | Monthly Cost |
|------|--------------|
| Railway/Render | $5-20 |
| PostgreSQL | $0-15 |
| Redis (optional) | $0-10 |
| **Total** | **$5-45/month** |

## Directory Structure

```
project/
├── project/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── users/
│   ├── core/
│   └── api/
├── templates/
├── static/
├── manage.py
├── requirements.txt
└── Dockerfile
```

## Key Dependencies

```txt
# requirements.txt
Django>=5.0
psycopg2-binary
django-htmx
django-tailwind
celery
redis
django-rest-framework
```

## PRD/Tasks Generation Notes

PRD 생성 시 다음 고려사항 포함:
- Django Admin 커스터마이징 범위
- Django ORM 모델 설계
- Class-Based Views vs Function-Based Views
- HTMX 활용한 동적 UI
- Celery 태스크 설계

## References

- [Django Documentation](https://docs.djangoproject.com)
- [Django REST Framework](https://www.django-rest-framework.org)
- [HTMX Documentation](https://htmx.org/docs)
