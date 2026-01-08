# /journal-setup - 저널 가이드라인 수집 및 완료 기준 생성

저널 투고 가이드라인을 수집하여 논문 작성 완료 기준 파일을 생성합니다.

## 사용법

```bash
/journal-setup [저널명] --url [가이드라인URL] --output [출력파일]
/journal-setup [저널명] --file [로컬파일] --output [출력파일]
```

## 인자

- `저널명`: 대상 저널 이름 (예: Nature, Science, PLOS ONE)
- `--url`: 저널 투고 가이드라인 URL
- `--file`: 로컬에 저장된 가이드라인 파일 경로
- `--output`: 출력 파일 경로 (기본값: `tasks/journal-[저널명].md`)

## 예시

```bash
# URL에서 가이드라인 수집
/journal-setup Nature --url https://www.nature.com/nature/for-authors

# 로컬 파일 사용
/journal-setup "PLOS ONE" --file ./plos-guidelines.pdf

# 출력 경로 지정
/journal-setup Science --url https://www.science.org/content/page/instructions-preparing-initial-manuscript --output tasks/journal-science.md
```

## 실행 프로세스

1. **가이드라인 수집**
   - URL인 경우: WebFetch로 페이지 내용 수집
   - 파일인 경우: Read로 파일 내용 읽기

2. **구조화된 정보 추출**
   - 포맷 요구사항 (단어 수, Figure 제한 등)
   - 섹션 구조 (필수/선택 섹션)
   - 인용 스타일
   - 제출 체크리스트
   - 윤리/공개 요구사항

3. **완료 기준 파일 생성**
   - `tasks/journal-[저널명].md` 저장
   - 체크리스트 형태로 구조화

## 생성되는 파일 구조

```markdown
# Journal Guidelines: {{저널명}}

## 메타 정보
- 저널명: {{저널명}}
- 가이드라인 소스: {{URL 또는 파일경로}}
- 수집일: {{날짜}}

## 포맷 요구사항
- Abstract 단어 수: {{N}}자
- 본문 단어 수: {{N}}자
- Figure 최대 개수: {{N}}개
- Table 최대 개수: {{N}}개
- Reference 스타일: {{스타일명}}

## 필수 섹션 체크리스트
- [ ] Title
- [ ] Abstract
- [ ] Keywords
- [ ] Introduction
- [ ] Methods
- [ ] Results
- [ ] Discussion
- [ ] Conclusions
- [ ] References
- [ ] Acknowledgments

## 품질 요구사항
- [ ] Figure 해상도: {{DPI}} 이상
- [ ] Figure 캡션 완비
- [ ] Table 제목 완비
- [ ] 통계 방법 명시
- [ ] 윤리 승인 명시 (해당 시)
- [ ] 이해 충돌 선언
- [ ] 데이터 가용성 명시
- [ ] 저자 기여도 명시

## 제출 전 체크리스트
- [ ] Cover letter 작성
- [ ] 모든 저자 정보 완비
- [ ] ORCID 연결
- [ ] 파일 형식 준수 (PDF/Word/LaTeX)
- [ ] Supplementary materials 준비 (해당 시)
```

## 다음 단계

저널 가이드라인 파일 생성 후:

1. **논문 작성 시작**:
   ```bash
   /paper-load @my-paper --journal tasks/journal-[저널명].md
   ```

2. **Ralph 자동화용 Task 파일 생성**:
   ```bash
   /ralph-paper-setup @my-paper --journal tasks/journal-[저널명].md
   ```

## 지원 저널 프리셋

자주 사용되는 저널은 URL 없이 프리셋 사용 가능:

```bash
/journal-setup Nature          # Nature 프리셋
/journal-setup Science         # Science 프리셋
/journal-setup "PLOS ONE"      # PLOS ONE 프리셋
/journal-setup Cell            # Cell 프리셋
/journal-setup NEJM            # New England Journal of Medicine
/journal-setup Lancet          # The Lancet
/journal-setup NeurIPS         # NeurIPS 학회
/journal-setup ICML            # ICML 학회
/journal-setup CHI             # CHI 학회
```

## 관련 명령어

- `/paper-load`: 논문 프로젝트 로드
- `/paper-format`: 저널 포맷팅
- `/ralph-paper-setup`: Ralph 자동화용 논문 Task 생성
