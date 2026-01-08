# API 설정 가이드 - 김팀장 프로젝트

**작성일**: 2026-01-08
**수정일**: 2026-01-08 (OpenAI → Google AI 변경)

이 문서는 김팀장 프로젝트 개발에 필요한 외부 API와 서비스 목록입니다.

---

## 1. AI/LLM API (필수)

### 1.1 Google AI (Gemini) - 메인

| 항목 | 내용 |
|-----|------|
| **용도** | 에이전트 대화, 페르소나 생성, 업무 수행 |
| **홈페이지** | https://ai.google.dev |
| **발급 페이지** | https://aistudio.google.com/app/apikey |
| **가격** | Gemini 1.5 Flash: 무료 tier 제공, Gemini 1.5 Pro: $1.25/1M input, $5/1M output |
| **환경변수** | `GOOGLE_AI_API_KEY` |

**발급 절차**:
1. Google AI Studio 접속: https://aistudio.google.com
2. Google 계정으로 로그인
3. 좌측 메뉴 "Get API key" 클릭
4. "Create API key" 버튼 클릭
5. 프로젝트 선택 또는 새 프로젝트 생성
6. 생성된 API 키 복사

**지원 모델**:
- `gemini-1.5-flash` - 빠르고 저렴 (일반 대화, 간단한 작업)
- `gemini-1.5-pro` - 고성능 (복잡한 추론, 긴 컨텍스트)
- `gemini-2.0-flash-exp` - 최신 실험 모델

**무료 한도** (Gemini 1.5 Flash 기준):
- 분당 15 요청
- 일일 1,500 요청
- 분당 100만 토큰

---

### 1.2 Anthropic API (Claude) - 대안

| 항목 | 내용 |
|-----|------|
| **용도** | 에이전트 대화, 페르소나 생성 (Google AI 대안) |
| **홈페이지** | https://www.anthropic.com |
| **발급 페이지** | https://console.anthropic.com/settings/keys |
| **가격** | Claude 3.5 Sonnet: $3/1M input, $15/1M output |
| **환경변수** | `ANTHROPIC_API_KEY` |

**발급 절차**:
1. Anthropic Console 계정 생성
2. Settings > API Keys 접속
3. "Create Key" 클릭
4. 키 복사

---

## 2. 이미지 생성 API (필수)

### 2.1 Google Imagen 3 (Vertex AI) - 메인

| 항목 | 내용 |
|-----|------|
| **용도** | 캐릭터 카드 이미지 자동 생성 |
| **콘솔** | https://console.cloud.google.com |
| **API 활성화** | Vertex AI API 활성화 필요 |
| **가격** | $0.020/image (1024x1024) |
| **환경변수** | `GOOGLE_CLOUD_PROJECT_ID`, `GOOGLE_APPLICATION_CREDENTIALS` |

**발급 절차**:
1. Google Cloud Console 접속
2. 프로젝트 생성 또는 선택
3. "APIs & Services" > "Enable APIs" > "Vertex AI API" 활성화
4. IAM에서 서비스 계정 생성
5. JSON 키 파일 다운로드
6. 환경변수에 경로 설정

---

### 2.2 Google AI (Gemini) 이미지 생성 - 대안 (통합)

| 항목 | 내용 |
|-----|------|
| **용도** | Gemini API로 이미지 생성 (Imagen 2 기반) |
| **발급** | Google AI API 키와 동일 (위 1.1 참조) |
| **가격** | 유료 플랜 필요 |
| **환경변수** | `GOOGLE_AI_API_KEY` (동일) |

**참고**: Gemini API에서 이미지 생성은 현재 제한적으로 지원됩니다.

---

### 2.3 Stability AI (Stable Diffusion) - 대안

| 항목 | 내용 |
|-----|------|
| **용도** | 캐릭터 이미지 생성 (Google 대안) |
| **홈페이지** | https://stability.ai |
| **발급 페이지** | https://platform.stability.ai/account/keys |
| **가격** | $0.002~$0.006/image (모델에 따라 다름) |
| **환경변수** | `STABILITY_API_KEY` |

**발급 절차**:
1. Stability AI 계정 생성
2. Account > API Keys 접속
3. "Create API Key" 클릭

---

### 2.4 Replicate - 대안 (다양한 모델)

| 항목 | 내용 |
|-----|------|
| **용도** | 다양한 이미지 생성 모델 사용 가능 (Flux, SDXL 등) |
| **홈페이지** | https://replicate.com |
| **발급 페이지** | https://replicate.com/account/api-tokens |
| **가격** | 모델별 상이 (초당 과금) |
| **환경변수** | `REPLICATE_API_TOKEN` |

---

## 3. 소셜 로그인 OAuth (필수)

### 3.1 Google OAuth

| 항목 | 내용 |
|-----|------|
| **용도** | Google 계정으로 로그인 |
| **콘솔** | https://console.cloud.google.com |
| **발급 경로** | APIs & Services > Credentials > OAuth 2.0 Client IDs |
| **가격** | 무료 |
| **환경변수** | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` |

**발급 절차**:
1. Google Cloud Console 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "APIs & Services" > "Credentials" 이동
4. "Create Credentials" > "OAuth client ID" 선택
5. OAuth 동의 화면 설정 (처음인 경우)
6. Application type: "Web application" 선택
7. Authorized redirect URIs 추가:
   - 개발: `http://localhost:3000/api/auth/callback/google`
   - 운영: `https://yourdomain.com/api/auth/callback/google`
8. Client ID와 Client Secret 복사

---

### 3.2 GitHub OAuth

| 항목 | 내용 |
|-----|------|
| **용도** | GitHub 계정으로 로그인 |
| **설정 페이지** | https://github.com/settings/developers |
| **발급 경로** | OAuth Apps > New OAuth App |
| **가격** | 무료 |
| **환경변수** | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` |

**발급 절차**:
1. GitHub Settings > Developer settings 접속
2. "OAuth Apps" > "New OAuth App" 클릭
3. 정보 입력:
   - Application name: 김팀장
   - Homepage URL: `http://localhost:3000` (개발) 또는 실제 URL
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. "Register application" 클릭
5. Client ID 확인, "Generate a new client secret" 클릭하여 Secret 생성

---

### 3.3 Kakao OAuth (선택 - 한국 사용자용)

| 항목 | 내용 |
|-----|------|
| **용도** | 카카오 계정으로 로그인 |
| **콘솔** | https://developers.kakao.com |
| **발급 경로** | 내 애플리케이션 > 앱 추가 |
| **가격** | 무료 |
| **환경변수** | `KAKAO_CLIENT_ID`, `KAKAO_CLIENT_SECRET` |

**발급 절차**:
1. Kakao Developers 접속 및 로그인
2. "내 애플리케이션" > "애플리케이션 추가하기"
3. 앱 이름, 사업자명 입력
4. 앱 설정 > 플랫폼 > Web 플랫폼 등록
5. 카카오 로그인 활성화
6. Redirect URI 등록: `http://localhost:3000/api/auth/callback/kakao`
7. 앱 키 > REST API 키 복사

---

## 4. 데이터베이스 (필수)

### 4.1 Supabase (PostgreSQL) - 추천

| 항목 | 내용 |
|-----|------|
| **용도** | PostgreSQL 데이터베이스 호스팅 |
| **홈페이지** | https://supabase.com |
| **대시보드** | https://app.supabase.com |
| **가격** | Free tier: 500MB, Pro: $25/월 |
| **환경변수** | `DATABASE_URL` |

**발급 절차**:
1. Supabase 계정 생성
2. "New Project" 클릭
3. 프로젝트 이름, 비밀번호 설정, 리전 선택 (Northeast Asia 추천)
4. Settings > Database > Connection string 복사
5. `[YOUR-PASSWORD]` 부분을 실제 비밀번호로 교체

---

### 4.2 Neon (PostgreSQL) - 대안

| 항목 | 내용 |
|-----|------|
| **용도** | Serverless PostgreSQL |
| **홈페이지** | https://neon.tech |
| **가격** | Free tier: 0.5GB, Pro: $19/월 |
| **환경변수** | `DATABASE_URL` |

---

### 4.3 Google Cloud SQL - 대안 (Google 통합)

| 항목 | 내용 |
|-----|------|
| **용도** | Google Cloud 관리형 PostgreSQL |
| **콘솔** | https://console.cloud.google.com/sql |
| **가격** | $7/월부터 (db-f1-micro) |
| **환경변수** | `DATABASE_URL` |

---

## 5. 파일 저장소 (필수)

### 5.1 Google Cloud Storage - 추천 (Google 통합)

| 항목 | 내용 |
|-----|------|
| **용도** | 이미지, 이력서, 결과물 파일 저장 |
| **콘솔** | https://console.cloud.google.com/storage |
| **가격** | $0.020/GB (Standard), 월 5GB 무료 |
| **환경변수** | `GCS_BUCKET`, `GOOGLE_APPLICATION_CREDENTIALS` |

**발급 절차**:
1. Google Cloud Console 접속
2. Cloud Storage > 버킷 만들기
3. 버킷 이름, 리전 설정 (asia-northeast3 서울)
4. 서비스 계정 생성 및 Storage 권한 부여
5. JSON 키 다운로드

---

### 5.2 AWS S3 - 대안

| 항목 | 내용 |
|-----|------|
| **용도** | 이미지, 이력서, 결과물 파일 저장 |
| **콘솔** | https://aws.amazon.com/console |
| **발급 경로** | IAM > Users > Security credentials |
| **가격** | $0.023/GB (처음 50TB) |
| **환경변수** | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`, `AWS_REGION` |

---

### 5.3 Cloudflare R2 - 대안 (저렴)

| 항목 | 내용 |
|-----|------|
| **용도** | S3 호환 저장소 (출력 무료) |
| **홈페이지** | https://www.cloudflare.com/products/r2 |
| **대시보드** | https://dash.cloudflare.com |
| **가격** | 저장: $0.015/GB, 출력: 무료 |
| **환경변수** | `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_ENDPOINT` |

---

## 6. 인증 (NextAuth.js)

### 6.1 NextAuth Secret

| 항목 | 내용 |
|-----|------|
| **용도** | JWT 토큰 암호화 |
| **생성 방법** | `openssl rand -base64 32` 또는 온라인 생성기 |
| **환경변수** | `NEXTAUTH_SECRET` |

---

## 7. 호스팅/배포 (선택)

### 7.1 Vercel - 추천

| 항목 | 내용 |
|-----|------|
| **용도** | Next.js 앱 호스팅 |
| **홈페이지** | https://vercel.com |
| **가격** | Hobby: 무료, Pro: $20/월 |

### 7.2 Google Cloud Run - 대안 (Google 통합)

| 항목 | 내용 |
|-----|------|
| **용도** | 컨테이너 기반 서버리스 호스팅 |
| **콘솔** | https://console.cloud.google.com/run |
| **가격** | 월 200만 요청 무료 |

### 7.3 Firebase Hosting - 대안 (정적 + Functions)

| 항목 | 내용 |
|-----|------|
| **용도** | 정적 호스팅 + Cloud Functions |
| **홈페이지** | https://firebase.google.com |
| **가격** | Spark: 무료, Blaze: 종량제 |

---

## 환경변수 템플릿 (.env.local)

```bash
# ============================================
# 김팀장 프로젝트 환경변수
# ============================================

# ----- Database -----
DATABASE_URL="postgresql://user:password@host:5432/database"

# ----- NextAuth -----
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# ----- OAuth Providers -----
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# KAKAO_CLIENT_ID="your-kakao-client-id"
# KAKAO_CLIENT_SECRET="your-kakao-client-secret"

# ----- Google AI (Gemini) -----
GOOGLE_AI_API_KEY="your-google-ai-api-key"

# ----- Google Cloud (Vertex AI, Storage) -----
GOOGLE_CLOUD_PROJECT_ID="your-project-id"
GOOGLE_APPLICATION_CREDENTIALS="./path/to/service-account-key.json"
GCS_BUCKET="your-gcs-bucket-name"

# ----- Alternative: Anthropic Claude -----
# ANTHROPIC_API_KEY="sk-ant-your-anthropic-api-key"

# ----- Alternative: Image Generation -----
# STABILITY_API_KEY="sk-your-stability-api-key"
# REPLICATE_API_TOKEN="your-replicate-token"

# ----- Alternative: AWS S3 -----
# AWS_ACCESS_KEY_ID="your-aws-access-key"
# AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
# AWS_S3_BUCKET="your-bucket-name"
# AWS_REGION="ap-northeast-2"
```

---

## 비용 예상 (MVP 기준)

| 서비스 | 월 예상 비용 | 비고 |
|-------|------------|------|
| Google AI (Gemini) | $0~20 | 무료 tier 활용 가능 |
| Vertex AI (Imagen) | $10~20 | 이미지 생성 횟수에 따라 |
| Supabase | $0 (Free) | Free tier 사용 시 |
| Vercel | $0 (Hobby) | Hobby 플랜 사용 시 |
| Google Cloud Storage | $0~5 | 5GB 무료 후 종량제 |
| **합계** | **$10~45** | 개발/초기 운영 기준 |

**Google AI 장점**: OpenAI 대비 저렴하고 무료 tier가 넉넉함

---

## 우선순위 체크리스트

MVP 개발을 위한 최소 필수 API:

- [ ] **Google AI API (Gemini)** - LLM (필수)
- [ ] **Google Cloud 프로젝트** - Vertex AI + Storage (필수)
- [ ] **Google OAuth** - 소셜 로그인 (필수)
- [ ] **Supabase** - 데이터베이스 (필수)
- [ ] GitHub OAuth - 추가 로그인 옵션 (권장)
- [ ] Stability AI - 이미지 생성 대안 (선택)
- [ ] Kakao OAuth - 한국 사용자용 (선택)

---

## Google Cloud 통합 구성 (추천)

Google 서비스를 통합하면 관리가 편리합니다:

```
┌─────────────────────────────────────────┐
│           Google Cloud Project          │
├─────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────────────┐  │
│  │ Gemini AI │  │ Vertex AI (Imagen)│  │
│  └───────────┘  └───────────────────┘  │
│  ┌───────────┐  ┌───────────────────┐  │
│  │Cloud      │  │ Google OAuth      │  │
│  │Storage    │  │                   │  │
│  └───────────┘  └───────────────────┘  │
└─────────────────────────────────────────┘
         + Supabase (DB) + Vercel (호스팅)
```

---

## 바로가기 링크

### Google 서비스
- Google AI Studio: https://aistudio.google.com/app/apikey
- Google Cloud Console: https://console.cloud.google.com
- Vertex AI: https://console.cloud.google.com/vertex-ai

### 기타 서비스
- Supabase: https://app.supabase.com
- GitHub Developer: https://github.com/settings/developers
- Vercel: https://vercel.com
- Stability AI: https://platform.stability.ai

---

*이 가이드는 서비스 정책 변경에 따라 업데이트가 필요할 수 있습니다.*
