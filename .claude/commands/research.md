---
description: Academic research assistant for literature review, research planning, and paper writing
---

# Research Command

**Purpose**: Comprehensive academic research support from topic analysis to paper draft

**Auto-Activations**:
- Persona: analyzer, mentor, scribe (primary)
- MCP: Sequential (research planning), Context7 (academic patterns)
- Tools: WebSearch (literature), Write (drafts)
- Flags: --think-hard (deep analysis), --verbose (comprehensive output)

**Arguments**:
- `$ARGUMENTS` - Research topic or question
- `--phase <stage>` - literature | planning | writing | review | all
- `--field <domain>` - cs | ai | ml | bio | physics | engineering | social | business
- `--depth <level>` - survey | detailed | comprehensive
- `--output <format>` - markdown | latex | docx
- `--lang <language>` - en | ko (default: ko)

**Research Workflow**:

### Phase 1: Literature Review (문헌 조사)
1. 🔍 **Topic Analysis**: 연구 주제 분석 및 키워드 추출
2. 🌐 **Recent Research**: 최신 연구 동향 조사 (WebSearch)
3. 📚 **Theoretical Foundation**: 관련 이론 및 배경 지식 수집
4. 📊 **Gap Analysis**: 연구 공백 및 기회 식별
5. 📝 **Literature Summary**: 문헌 검토 요약 및 분류

### Phase 2: Research Planning (연구 계획)
1. 🎯 **Research Questions**: 연구 질문 및 가설 수립
2. 🏗️ **Methodology Design**: 연구 방법론 설계
3. 📈 **Timeline Planning**: 연구 일정 및 마일스톤
4. 📊 **Resource Planning**: 필요 자원 및 데이터 계획
5. ⚠️ **Risk Assessment**: 위험 요인 및 대응 방안

### Phase 3: Paper Writing (논문 작성)
1. 📋 **Outline Creation**: 논문 구조 설계
2. ✍️ **Abstract Writing**: 초록 작성
3. 📖 **Introduction**: 서론 작성 (배경, 동기, 기여)
4. 📚 **Related Work**: 관련 연구 작성
5. 🔬 **Methodology**: 연구 방법론 상세 기술
6. 📊 **Results Planning**: 결과 섹션 구조화
7. 💭 **Discussion**: 토론 및 분석 작성
8. 🎯 **Conclusion**: 결론 및 향후 연구 작성

### Phase 4: Review & Revision (검토 및 수정)
1. ✅ **Structure Review**: 논문 구조 검토
2. 📝 **Content Review**: 내용 완성도 검토
3. 🔍 **Citation Check**: 인용 및 참고문헌 검증
4. ✨ **Language Polish**: 문장 및 표현 개선
5. 📊 **Format Check**: 형식 및 스타일 검증

**Research Output**:

### Literature Review Package
```markdown
# 문헌 조사 보고서

## 연구 주제
[주제 및 키워드]

## 최신 연구 동향 (2023-2025)
### 주요 연구 논문
1. [논문 제목] (저자, 년도)
   - 핵심 기여: ...
   - 방법론: ...
   - 결과: ...

### 연구 트렌드
- 트렌드 1: ...
- 트렌드 2: ...

## 이론적 배경
### 핵심 이론
- 이론 1: ...
- 이론 2: ...

### 관련 개념
- 개념 1: ...
- 개념 2: ...

## 연구 공백 (Research Gap)
1. 공백 1: ...
2. 공백 2: ...

## 연구 기회
1. 기회 1: ...
2. 기회 2: ...

## 참고문헌
[자동 수집된 참고문헌 목록]
```

### Research Proposal (연구 계획서)
```markdown
# 연구 계획서

## 1. 연구 배경 및 필요성
[문헌 조사 기반 배경 설명]

## 2. 연구 목적 및 목표
### 주요 연구 질문
- RQ1: ...
- RQ2: ...

### 연구 가설
- H1: ...
- H2: ...

## 3. 연구 방법론
### 연구 설계
[실험/이론/시스템 설계]

### 데이터 수집
[데이터 소스 및 수집 방법]

### 분석 방법
[분석 기법 및 도구]

## 4. 연구 일정
| 단계 | 내용 | 기간 |
|------|------|------|
| 1 | 문헌 조사 | 1-2개월 |
| 2 | 방법론 개발 | 2-3개월 |
| 3 | 실험 및 분석 | 3-4개월 |
| 4 | 논문 작성 | 1-2개월 |

## 5. 예상 성과
### 학술적 기여
- 기여 1: ...
- 기여 2: ...

### 실용적 기여
- 기여 1: ...
- 기여 2: ...

## 6. 참고문헌
[자동 수집된 참고문헌 목록]
```

### Paper Draft (논문 초안)
```markdown
# [논문 제목]

## Abstract
[연구 배경, 목적, 방법, 결과, 결론 요약]

**Keywords**: keyword1, keyword2, keyword3

---

## 1. Introduction

### 1.1 Background
[연구 배경 및 맥락]

### 1.2 Motivation
[연구 동기 및 필요성]

### 1.3 Research Questions
- RQ1: ...
- RQ2: ...

### 1.4 Contributions
본 연구의 주요 기여는 다음과 같다:
1. 기여 1: ...
2. 기여 2: ...
3. 기여 3: ...

### 1.5 Paper Organization
논문의 구성은 다음과 같다...

---

## 2. Related Work

### 2.1 [관련 연구 주제 1]
[문헌 조사 기반 관련 연구 정리]

### 2.2 [관련 연구 주제 2]
[문헌 조사 기반 관련 연구 정리]

### 2.3 Comparison and Gap Analysis
[기존 연구와의 비교 및 본 연구의 차별점]

---

## 3. Methodology

### 3.1 Overview
[연구 방법론 개요]

### 3.2 [방법론 상세 1]
[상세 설명]

### 3.3 [방법론 상세 2]
[상세 설명]

### 3.4 Evaluation Metrics
[평가 지표 및 기준]

---

## 4. [Results / Implementation / Experiments]

### 4.1 Experimental Setup
[실험 환경 및 설정]

### 4.2 [결과 1]
[결과 및 분석]

### 4.3 [결과 2]
[결과 및 분석]

### 4.4 Discussion
[결과 해석 및 토론]

---

## 5. Conclusion

### 5.1 Summary
[연구 요약]

### 5.2 Contributions
[주요 기여 재강조]

### 5.3 Limitations
[연구 한계점]

### 5.4 Future Work
[향후 연구 방향]

---

## References
[자동 수집된 참고문헌 목록 - APA/IEEE/ACM 스타일]

---

## Appendix (선택)
[추가 자료, 증명, 코드 등]
```

**Quality Standards**:
- **Academic Rigor**: 엄격한 학술적 기준 준수
- **Citation Accuracy**: 정확한 인용 및 참고문헌
- **Logical Flow**: 논리적이고 일관된 서술
- **Clear Writing**: 명확하고 간결한 표현
- **Comprehensive Coverage**: 포괄적인 문헌 조사

**Research Best Practices**:
1. **최신성**: 2023-2025 최신 연구 우선 조사
2. **권위성**: 주요 학회/저널 논문 중심
3. **다양성**: 다양한 관점과 접근법 검토
4. **비판적 분석**: 기존 연구의 강점/약점 분석
5. **독창성**: 차별화된 연구 방향 제시

**Field-Specific Templates**:

### Computer Science / AI / ML
- Conference: NeurIPS, ICML, ICLR, CVPR, ACL
- Journal: JMLR, TPAMI, AIJ
- Format: IEEE, ACM
- Focus: Algorithm, Architecture, Performance, Ablation Study

### Engineering
- Conference: ICRA, IROS, AAAI
- Journal: IEEE Transactions
- Format: IEEE
- Focus: System Design, Implementation, Validation

### Business / Social Science
- Journal: Management Science, AMJ
- Format: APA
- Focus: Theory, Empirical Analysis, Case Study

**Examples**:

### 문헌 조사 및 연구 계획
```bash
/research "Transformer 모델의 효율성 개선" --phase all --field ai --depth comprehensive
# 결과:
# - 최신 Transformer 연구 동향 (2023-2025)
# - 효율성 개선 관련 이론 및 기법
# - 연구 계획서
# - 논문 초안
```

### 특정 분야 연구
```bash
/research "강화학습 기반 로봇 제어" --phase literature --field ai --depth detailed
# 결과:
# - RL in Robotics 문헌 조사
# - 주요 알고리즘 및 기법
# - 연구 공백 분석
```

### 논문 작성 지원
```bash
/research "자연어 처리를 이용한 감정 분석" --phase writing --output latex --lang en
# 결과:
# - LaTeX 형식 논문 초안
# - Introduction, Related Work, Methodology 섹션
# - 참고문헌 BibTeX
```

### 연구 계획 수립
```bash
/research "블록체인 기반 의료 데이터 보안" --phase planning --field cs
# 결과:
# - 연구 질문 및 가설
# - 방법론 설계
# - 연구 일정
# - 예상 성과
```

**Integration with SuperClaude**:
- Uses **WebSearch** for latest research papers and trends
- Uses **Sequential** for systematic research planning
- Uses **Context7** for academic writing patterns
- Uses **scribe persona** for professional academic writing
- Uses **analyzer persona** for critical literature review
- Uses **mentor persona** for research guidance

**Output Files**:
```
research-output/
├── 01-literature-review.md      # 문헌 조사 보고서
├── 02-research-proposal.md      # 연구 계획서
├── 03-paper-outline.md          # 논문 개요
├── 04-paper-draft.md            # 논문 초안
├── 05-references.bib            # 참고문헌 (BibTeX)
└── 06-research-notes.md         # 연구 노트
```

Execute academic research workflow following rigorous scholarly standards with comprehensive literature review and systematic planning.
