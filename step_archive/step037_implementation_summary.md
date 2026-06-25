---
step: 037
title: 구현 요약
date: 2026-06-21
status: PASS
---

# Step 037 구현 요약

## 구현 범위

- Vanilla JS ES2022 + Vite 앱 스캐폴드 생성.
- Class 기반 구조 구현: `App`, `ScenarioRepository`, `TutorialState`, `MetricsCalculator`, `TutorialView`, `FlowCanvas`.
- 생성자 주입과 `async init()` 패턴 적용.
- 초보자용 코드 비노출 튜토리얼 UI 구현.
- 배달 앱, 음악 앱, 사진 앱 사례 탭 구현.
- 기능 조각 모으기, 단계 전환, 안전 체크, 실시간 지표, 추상 캔버스 흐름선 구현.

## 주요 파일

- `index.html`
- `src/main.js`
- `src/App.js`
- `src/core/*.js`
- `src/ui/*.js`
- `src/data/scenarios.js`
- `src/styles/*.css`

## 코드 비노출 준수

- 학습 화면에 `<pre>` 또는 `<code>` 요소 없음.
- 예제 코드 문법을 표시하지 않음.
- "흩어진 기능 조각"과 "센터" 은유로 리팩토링을 설명.

## Self-Calibration

- 요구사항 100% 구현: Y
- 빌드 통과: Y

Step 037/107 완료
