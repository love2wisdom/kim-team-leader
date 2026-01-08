# /ralph-paper-setup - 논문 Ralph Task 파일 생성

저널 가이드라인 기반으로 논문 작성용 Ralph Task 파일을 생성합니다.

## 사용법

```bash
/ralph-paper-setup @[논문경로] --journal [저널가이드라인파일]
```

## 인자

- `@[논문경로]`: 논문 프로젝트 디렉토리 경로
- `--journal`: 저널 가이드라인 파일 경로 (기본값: `tasks/journal-*.md` 자동 탐색)
- `--analysis`: paper-load 분석 보고서 파일 경로 (없으면 자동 실행)
- `--sections`: 특정 섹션만 포함 (예: `--sections intro,methods,results`)
- `--quality-score`: 목표 품질 점수 (기본값: 85)
- `--output`: 출력 파일 경로 (기본값: `tasks/ralph-paper-[프로젝트명].md`)

## 예시

```bash
# 기본: 분석 보고서 없으면 자동 생성
/ralph-paper-setup @my-paper --journal tasks/journal-nature.md

# 추천: paper-load 분석 보고서 활용 (2단계 워크플로우)
# Step 1: 분석 보고서 생성
/paper-load @my-paper --journal tasks/journal-nature.md --output tasks/paper-analysis.md
# Step 2: 분석 기반 Ralph Task 생성
/ralph-paper-setup @my-paper --journal tasks/journal-nature.md --analysis tasks/paper-analysis.md

# 특정 섹션만 자동화
/ralph-paper-setup @my-paper --journal tasks/journal-nature.md --sections discussion,conclusions

# 품질 점수 기준 설정
/ralph-paper-setup @my-paper --journal tasks/journal-nature.md --quality-score 90 --analysis tasks/paper-analysis.md
```

## 실행 프로세스

### 자동 모드 (--analysis 없을 때)

1. **paper-load 자동 실행**
   - `/paper-load @논문경로 --journal [저널] --output tasks/paper-analysis-[프로젝트명].md`
   - 분석 보고서 자동 생성

2. **분석 보고서 파싱**
   - 섹션별 완성도, 품질 점수 추출
   - Gap Analysis (HIGH/MEDIUM/LOW) 추출
   - Journal Compliance Checklist 추출

3. **우선순위 기반 Task 생성**
   - HIGH Priority → Phase 1
   - MEDIUM Priority → Phase 2
   - LOW Priority → Phase 3
   - 구체적인 갭을 체크리스트로 변환

4. **Ralph Task 파일 생성**
   - 분석 기반 현재 상태 요약 포함
   - 우선순위별 Phase 구성
   - 섹션별 검증 명령어 및 목표 점수 설정

### 수동 모드 (--analysis 있을 때)

1. **기존 분석 보고서 로드**
   - `--analysis` 파일 읽기
   - 이미 생성된 paper-load 보고서 활용

2. **분석 보고서 파싱**
   - 섹션별 데이터 추출
   - Gap Analysis 및 Compliance 정보 활용

3. **Ralph Task 생성**
   - 보고서 내용 기반으로 정확한 Task 생성

## 생성되는 파일 구조

```markdown
# Ralph Paper Task: {{프로젝트명}}

> 자동 생성됨: {{DATE}}
> 대상 저널: {{저널명}}
> 저널 가이드라인: tasks/journal-{{저널명}}.md
> 분석 보고서: {{분석보고서경로}} (paper-load 결과)

## 작업 지시

이 논문을 {{저널명}} 투고 기준에 맞게 완성하라.

## 현재 상태 요약 (paper-load 분석 기반)

| 섹션 | 완성도 | 현재 품질 | 목표 품질 | 우선순위 | 주요 이슈 |
|------|--------|-----------|-----------|----------|-----------|
| Abstract | {{완성도}}% | {{현재점수}} | {{목표점수}} | {{우선순위}} | {{이슈요약}} |
| Introduction | {{완성도}}% | {{현재점수}} | {{목표점수}} | {{우선순위}} | {{이슈요약}} |
| Methods | {{완성도}}% | {{현재점수}} | {{목표점수}} | {{우선순위}} | {{이슈요약}} |
| Results | {{완성도}}% | {{현재점수}} | {{목표점수}} | {{우선순위}} | {{이슈요약}} |
| Discussion | {{완성도}}% | {{현재점수}} | {{목표점수}} | {{우선순위}} | {{이슈요약}} |

**전체 준비도**: {{전체준비도}}% (저널 컴플라이언스 기준)

## 저널 컴플라이언스 갭

### 현재 상태 vs 요구사항

| 요구사항 | 목표 | 현재 | 상태 | 갭 |
|----------|------|------|------|-----|
| 단어 수 | {{목표}} | {{현재}} | {{상태}} | {{갭}} |
| Abstract 길이 | {{목표}} | {{현재}} | {{상태}} | {{갭}} |
| Figure 수 | ≤{{목표}} | {{현재}} | {{상태}} | {{갭}} |
| Table 수 | ≤{{목표}} | {{현재}} | {{상태}} | {{갭}} |
| 인용 스타일 | {{스타일}} | {{현재}} | {{상태}} | - |

## Phase 1: Critical Issues (HIGH Priority)

### Abstract (현재: {{현재점수}}점 → 목표: {{목표점수}}점)
- [ ] {{구체적갭1}} (예: 단어 수 150 → 120으로 축소)
- [ ] {{구체적갭2}} (예: 목적-방법 누락 → 4-part 구조 완성)
- [ ] {{구체적갭3}} (예: 핵심 수치 없음 → 주요 결과 추가)
- **검증**: `/paper-review --focus abstract`
- **목표**: 품질 점수 {{목표점수}}+

### Methods (현재: {{현재점수}}점 → 목표: {{목표점수}}점)
- [ ] {{구체적갭1}}
- [ ] {{구체적갭2}}
- **검증**: `/paper-review --focus methods`
- **목표**: 품질 점수 {{목표점수}}+

## Phase 2: Important Issues (MEDIUM Priority)

### Introduction (현재: {{현재점수}}점 → 목표: {{목표점수}}점)
- [ ] {{구체적갭1}}
- [ ] {{구체적갭2}}
- **검증**: `/paper-review --focus introduction`
- **목표**: 품질 점수 {{목표점수}}+

## Phase 3: Minor Issues (LOW Priority)

### Formatting & Polish
- [ ] {{구체적갭1}}
- [ ] {{구체적갭2}}

## 최종 검증

- [ ] 전체 단어 수: {{목표}}자 이내
- [ ] Reference 스타일: {{스타일명}} 준수
- [ ] Figure 해상도: ≥{{DPI}} DPI
- [ ] 모든 필수 섹션 완성
- [ ] 저널 컴플라이언스 100%
- **검증**: `/paper-format {{저널명}} --validate`
- **검증**: `/paper-cite validate`

## 실행 규칙

1. 각 섹션을 순서대로 처리
2. 섹션 완료 후 `/paper-review` 실행
3. 품질 점수가 목표 미달이면 `/paper-write --improve` 반복
4. 목표 달성 시 체크리스트에 [x] 표시
5. 다음 섹션으로 이동
6. 모든 섹션 완료 후 전체 검증

## 진행 상황 기록

매 반복마다 `tasks/ralph-paper-log-{{프로젝트명}}.md`에 기록:

```markdown
## Iteration {{N}} - {{TIMESTAMP}}
- 작업 섹션: {{섹션명}}
- 이전 품질 점수: {{점수}}
- 현재 품질 점수: {{점수}}
- 수행한 개선: {{내용}}
- 남은 항목: {{N}}개
```

## 완료 조건

다음 조건이 **모두** 충족되어야 완료:

- [ ] 모든 섹션 체크리스트 완료
- [ ] 모든 섹션 품질 점수 {{QUALITY_SCORE}}+ 달성
- [ ] `/paper-format {{저널명}} --validate` 통과
- [ ] `/paper-cite validate` 통과 (깨진 인용 0)

## 막힌 경우

5회 반복 후에도 특정 섹션 품질 점수가 향상되지 않으면:
1. 문제 상황을 `tasks/ralph-paper-blocked-{{프로젝트명}}.md`에 기록
2. 현재까지 시도한 개선 방법 나열
3. 추가 데이터나 인용이 필요한지 분석
4. 대안 제안

## 완료 시 출력

모든 조건 충족 시 반드시 다음을 출력:

<promise>RALPH_PAPER_COMPLETE</promise>
```

## 관련 명령어

- `/journal-setup`: 저널 가이드라인 수집
- `/paper-load`: 논문 프로젝트 로드
- `/paper-write`: 섹션 작성
- `/paper-review`: 품질 검토
- `/paper-format`: 저널 포맷팅
