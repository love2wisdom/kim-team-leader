# Ralph Loop Command

Ralph Wiggum 자동 반복 루프를 시작합니다.

## 사용법

```
/ralph-loop "PROMPT" [--max-iterations N] [--completion-promise TEXT]
```

## 파라미터

| 파라미터 | 설명 | 기본값 |
|----------|------|--------|
| PROMPT | 반복할 작업 프롬프트 (필수) | - |
| --max-iterations N | 최대 반복 횟수 | 30 |
| --completion-promise TEXT | 완료 시 출력할 약속 문구 | - |

## 예시

```bash
# 기본 사용
/ralph-loop "tests/todo.md 파일을 읽고 미완료 항목을 하나씩 완료하라"

# 최대 반복 횟수 지정
/ralph-loop "코드 품질 개선" --max-iterations 10

# 완료 조건 지정
/ralph-loop "모든 테스트 통과시키기" --completion-promise "ALL_TESTS_PASS"
```

---

## 실행 지시

이 명령어를 받으면:

1. `.claude/ralph-loop.local.md` 상태 파일을 생성합니다:

```markdown
---
iteration: 1
max_iterations: [지정값 또는 30]
completion_promise: "[지정값 또는 null]"
---

[사용자 프롬프트]
```

2. 프롬프트 작업을 시작합니다.

3. 세션 종료 시 Stop Hook이 상태 파일을 확인하고:
   - 완료 조건 미충족 시: 같은 프롬프트로 재시작
   - 완료 조건 충족 시: 루프 종료

## 완료 조건

completion-promise가 설정된 경우, 다음을 출력하면 루프가 종료됩니다:

```
<promise>COMPLETION_PROMISE_TEXT</promise>
```

**중요**: 약속 문구는 실제로 달성되었을 때만 출력하세요. 루프를 탈출하기 위해 거짓 약속을 출력하지 마세요.

## 취소

```bash
/cancel-ralph
```
