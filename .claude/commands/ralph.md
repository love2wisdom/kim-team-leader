# /ralph - 개선된 Ralph Loop 명령어

간결한 문법으로 Ralph 자동화를 실행합니다.

## 권장 모델 설정

Ralph는 복잡한 자동화 작업을 수행하므로 **Opus 4.5** 모델 사용을 권장합니다.

### 시작 전
```bash
/model opus
```

### 완료 후
```bash
/model sonnet
```

> **참고**: 토큰 소진 또는 작업 완료 시 Sonnet으로 전환하여 비용을 절감하세요.

---

## 사용법

```bash
/ralph @<task-file> [options]
```

## 기본 문법

```bash
# 전체 Task 실행
/ralph @tasks/ralph-feature.md

# 옵션과 함께
/ralph @tasks/ralph-feature.md --max-iterations 30 --verify "npm test"
```

## 파라미터

### 필수
| 파라미터 | 설명 | 예시 |
|----------|------|------|
| `@<파일경로>` | Ralph Task 파일 참조 | `@tasks/ralph-api.md` |

### 선택
| 파라미터 | 설명 | 기본값 | 예시 |
|----------|------|--------|------|
| `--max-iterations N` | 최대 반복 횟수 | 30 | `--max-iterations 50` |
| `--phase N` | 특정 Phase만 실행 | 전체 | `--phase 2` |
| `--section NAME` | 특정 섹션만 실행 | 전체 | `--section discussion` |
| `--quality-target N` | 목표 품질 점수 | 85 | `--quality-target 90` |
| `--verify "CMD"` | 검증 명령어 | - | `--verify "npm test"` |
| `--log FILE` | 로그 파일 경로 | 자동생성 | `--log tasks/my-log.md` |
| `--step-by-step` | 항목별 순차 실행 + 확인 | false | |

## 예시

### 1. 기본 실행
```bash
/ralph @tasks/ralph-auth.md
```

### 2. Phase별 실행
```bash
/ralph @tasks/ralph-api.md --phase 1 --max-iterations 15
/ralph @tasks/ralph-api.md --phase 2 --max-iterations 15
```

### 3. 검증 명령어 포함
```bash
/ralph @tasks/ralph-feature.md --verify "npm test && npm run lint"
```

### 4. 논문 섹션별 실행
```bash
/ralph @tasks/ralph-paper.md --section discussion --quality-target 85
```

### 5. 상세 로깅
```bash
/ralph @tasks/ralph-complex.md --log tasks/detailed-log.md --step-by-step
```

---

## 실행 프로세스

이 명령어를 받으면 다음을 수행합니다:

### Step 1: Task 파일 분석
1. `@` 뒤의 파일 경로에서 Task 파일을 읽습니다
2. 파일 내용을 파싱하여 작업 항목을 추출합니다

### Step 2: 옵션 처리
- `--phase N`: 해당 Phase 항목만 필터링
- `--section NAME`: 해당 섹션만 필터링
- `--quality-target N`: 완료 조건에 품질 점수 추가
- `--verify "CMD"`: 검증 명령어를 완료 조건에 추가

### Step 3: 완료 조건 자동 생성
Task 파일과 옵션을 기반으로 completion-promise를 자동 결정:
- 기본: `RALPH_COMPLETE`
- Phase 지정 시: `PHASE_N_COMPLETE`
- Section 지정 시: `SECTION_NAME_COMPLETE`

### Step 4: Ralph Loop 실행
```bash
/ralph-loop "<생성된 프롬프트>" \
--completion-promise "<자동생성된 완료조건>" \
--max-iterations <지정값 또는 30>
```

---

## 생성되는 프롬프트 예시

### 입력:
```bash
/ralph @tasks/ralph-api.md --phase 2 --verify "npm test" --max-iterations 15
```

### 생성되는 내부 프롬프트:
```
tasks/ralph-api.md 파일을 읽고 다음 지시를 따르라:

## 실행 범위
- Phase 2 항목만 실행

## 실행 규칙
1. Phase 2의 미완료 항목(- [ ])을 순서대로 처리
2. 각 항목 완료 시 [x]로 표시
3. 항목 완료마다 검증 명령어 실행: npm test
4. 검증 실패 시 수정 후 재시도

## 완료 조건
- Phase 2의 모든 항목이 [x]로 표시됨
- 검증 명령어(npm test) 통과

## 진행 상황 기록
tasks/ralph-log-api.md에 각 반복마다 기록

## 완료 시 출력
모든 조건 충족 시: <promise>PHASE_2_COMPLETE</promise>
```

---

## 취소

```bash
/cancel-ralph
```

## 관련 명령어

- `/ralph-loop` - 원본 Ralph Loop 명령어 (직접 프롬프트 작성)
- `/cancel-ralph` - Ralph 루프 취소
- `/journal-setup` - 저널 가이드라인 수집
- `/ralph-paper-setup` - 논문용 Ralph Task 생성
