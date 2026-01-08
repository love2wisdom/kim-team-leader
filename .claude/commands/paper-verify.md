# /paper-verify - 논문 분석 결과 데이터 검증

논문에 기술된 통계 결과를 원시 데이터와 분석 코드로 재현/검증합니다.

## 사용법

```bash
/paper-verify @<data-path> @<manuscript-path> [options]
```

## 파라미터

### 필수
| 파라미터 | 설명 | 예시 |
|----------|------|------|
| `@<data-path>` | 데이터 파일 경로 (CSV, Excel) | `@DATA&CODE/data.csv` |
| `@<manuscript-path>` | 논문 원고 경로 | `@SUBMISSION_PACKAGE/manuscript.docx` |

### 선택
| 파라미터 | 설명 | 기본값 | 예시 |
|----------|------|--------|------|
| `--claims <file>` | 검증할 주장 목록 파일 | 자동추출 | `--claims claims.json` |
| `--mapping <file>` | 변수 매핑 파일 | 자동생성 | `--mapping var_map.json` |
| `--output <report>` | 검증 리포트 출력 경로 | `verification-report.md` | `--output report.md` |
| `--tolerance <N>` | 수치 오차 허용 범위 | 0.01 | `--tolerance 0.001` |
| `--phase <N>` | 특정 Phase만 실행 | 전체 | `--phase 2` |
| `--script <path>` | 커스텀 검증 스크립트 | 내장 스크립트 | `--script verify.py` |

## 예시

### 1. 기본 검증
```bash
/paper-verify @DATA&CODE/scripts/updated_merged_data.csv \
  @SUBMISSION_PACKAGE/MANUSCRIPT_COMPLETE_WITH_FIGURES.docx
```

### 2. 상세 리포트 생성
```bash
/paper-verify @DATA&CODE/scripts/data.csv @manuscript.docx \
  --output tasks/verification-report.md \
  --tolerance 0.001
```

### 3. Ralph와 연계 실행
```bash
# Step 1: 검증 Task 파일 생성
/paper-verify @data.csv @manuscript.docx --output tasks/ralph-paper-verify.md

# Step 2: Ralph로 체계적 검증
/ralph @tasks/ralph-paper-verify.md --step-by-step
```

---

## 실행 워크플로우

이 명령어를 받으면 다음을 수행합니다:

### Phase 1: Claim Extraction (논문 주장 추출)

1. **논문 파싱**
   - 원고 파일 로드 (DOCX → Markdown 변환)
   - 정규식으로 통계 수치 추출:
     - 회귀계수: `β = X.XXX`, `b = X.XXX`
     - 유의수준: `p < 0.05`, `p = 0.XXX`
     - 효과크기: `R² = 0.XXX`, `ΔR² = 0.XXX`
     - 표본크기: `N = XXX`, `n = XXX`

2. **주장 목록 생성**
   ```json
   {
     "sample_size": {"expected": 330},
     "hypothesis_1": {
       "path": "AI_adoption → Legacy_collaboration",
       "beta": 0.118,
       "p_value": 0.017
     },
     "hypothesis_2": {
       "path": "Legacy_collaboration → Operating_profit",
       "beta": 0.290,
       "p_value": 0.029
     }
   }
   ```

### Phase 2: Data Validation (데이터 검증)

1. **데이터 로드**
   ```python
   df = pd.read_csv(data_path, encoding='utf-8-sig')
   ```

2. **기본 검증**
   - 표본 크기 확인
   - 결측치 비율
   - 변수 타입 확인

3. **변수 매핑 생성**
   - 논문 변수명 ↔ CSV 컬럼명 매핑
   - 사용자 확인 요청 (AskUserQuestion)

### Phase 3: Descriptive Statistics Verification (기술통계 검증)

1. **Table 1 재현**
   - 평균, 표준편차 계산
   - 상관관계 행렬 생성
   - 논문 수치와 비교

2. **불일치 탐지**
   ```
   ✅ Mean(AI_adoption): Expected 3.42, Got 3.42 (Δ=0.00)
   ⚠️ SD(Legacy_collab): Expected 1.21, Got 1.23 (Δ=0.02)
   ```

### Phase 4: Regression Analysis Verification (회귀분석 검증)

1. **위계적 회귀분석 재현**
   - Model 1: 통제변수
   - Model 2: 독립변수 추가
   - Model 3: 매개변수 추가

2. **계수 비교**
   ```
   Model 2 - AI_adoption:
     Expected: β = 0.118, p = 0.017
     Actual:   β = 0.117, p = 0.018
     Status:   ✅ Match (within tolerance)
   ```

### Phase 5: Mediation Analysis Verification (매개분석 검증)

1. **PROCESS Model 재현**
   - Path a: X → M (AI → Legacy Collaboration)
   - Path b: M → Y (Legacy Collaboration → Profit)
   - Indirect effect: a × b
   - Bootstrap CI (5000 iterations)

2. **조절된 매개효과 검증**
   - IT 산업 vs 비IT 산업 비교
   - 조절효과 크기 확인

### Phase 6: Report Generation (리포트 생성)

```markdown
# Paper Verification Report

## Summary
- Total Claims Verified: 15
- Matches: 13 (86.7%)
- Discrepancies: 2 (13.3%)
- Verification Status: ⚠️ REVIEW NEEDED

## Detailed Results

### Sample Size
| Metric | Expected | Actual | Status |
|--------|----------|--------|--------|
| N | 330 | 330 | ✅ |

### Hypothesis Tests
| Hypothesis | Expected β | Actual β | Expected p | Actual p | Status |
|------------|------------|----------|------------|----------|--------|
| H1: AI → Legacy | 0.118 | 0.117 | 0.017 | 0.018 | ✅ |
| H2: Legacy → Profit | 0.290 | 0.285 | 0.029 | 0.031 | ⚠️ |

### Discrepancies
1. H2 coefficient slightly lower than reported (Δ=0.005)
   - Recommendation: Verify rounding in manuscript

## Reproducibility Code
```python
# Full analysis code saved to: DATA&CODE/scripts/verify_paper_claims.py
```
```

---

## 출력 파일

| 파일 | 설명 |
|------|------|
| `verification-report.md` | 검증 결과 종합 리포트 |
| `claims_extracted.json` | 논문에서 추출된 주장 목록 |
| `variable_mapping.json` | 변수 매핑 테이블 |
| `verification_log.md` | 상세 검증 로그 |

---

## Ralph 연계

### Ralph Task 자동 생성

`/paper-verify` 실행 시 Ralph Task 파일을 자동 생성할 수 있습니다:

```bash
/paper-verify @data.csv @manuscript.docx --output tasks/ralph-paper-verify.md
```

### 생성되는 Task 구조

```markdown
# Ralph Task: Paper Data Verification

## Phase 1: Data Preparation [CRITICAL]
- [ ] 데이터 로드 및 구조 확인
- [ ] 변수 매핑 검증

## Phase 2: Descriptive Stats [HIGH]
- [ ] Table 1 재현
- [ ] 상관관계 검증

## Phase 3: Regression [HIGH]
- [ ] 위계적 회귀분석 재현

## Phase 4: Mediation [CRITICAL]
- [ ] PROCESS 모형 재현
- [ ] 간접효과 검증

## Phase 5: Report [MEDIUM]
- [ ] 최종 리포트 생성
```

---

## 관련 명령어

| 명령어 | 설명 |
|--------|------|
| `/paper-load` | 논문 프로젝트 로드 및 분석 |
| `/paper-review` | 논문 품질 검토 |
| `/ralph` | Ralph Loop 실행 |
| `/ralph-paper-setup` | 논문용 Ralph Task 생성 |

---

## 검증 기준

### 수치 일치 기준
| 수준 | 허용 오차 | 상태 |
|------|-----------|------|
| Exact | Δ = 0.000 | ✅ Perfect |
| Match | Δ < 0.010 | ✅ Match |
| Close | Δ < 0.050 | ⚠️ Review |
| Mismatch | Δ ≥ 0.050 | ❌ Discrepancy |

### 유의수준 기준
- p < 0.001: ***
- p < 0.01: **
- p < 0.05: *
- p ≥ 0.05: ns

---

## 트러블슈팅

### 변수 매핑 실패
```bash
# 수동 매핑 파일 지정
/paper-verify @data.csv @manuscript.docx --mapping my_mapping.json
```

### 분석 방법 차이
- SPSS vs Python 차이로 인한 미세 오차 발생 가능
- `--tolerance 0.02` 옵션으로 허용 범위 조정

### 데이터 인코딩 문제
- UTF-8-sig 인코딩 권장
- Excel에서 CSV 저장 시 "UTF-8 CSV" 선택
