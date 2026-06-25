---
step: 049
title: 테스트 파일 매핑 chunk1
date: 2026-06-21
status: PASS
---

# Step 049 테스트 파일 매핑

## 대상 파일

- `src/core/TutorialState.js`: 상태 전환, 완료 조건, 시나리오 전환 테스트.
- `src/core/MetricsCalculator.js`: 조각 수에 따른 지표 변화는 TutorialState 테스트를 통해 간접 검증.
- `src/data/scenarios.js`: Repository를 통해 로드 경로 검증.
- `src/ui/TutorialView.js`: Playwright E2E에서 렌더링과 조작 검증.
- `src/ui/FlowCanvas.js`: `scripts/visual-check.mjs`에서 캔버스 픽셀 검증.

## 테스트 파일

- 유닛: `src/tests/TutorialState.test.js`
- E2E: `tests/tutorial.spec.js`
- 시각 검증: `scripts/visual-check.mjs`
- 접근성: `scripts/accessibility-check.mjs`
- c8 직접 커버리지: `scripts/c8-smoke.mjs`

## TRUST 5 r1

- Tested: 10
- Readable: 9
- Unified: 10
- Secured: 10
- Trackable: 10
- 총점: 49/50

Step 049/107 완료
