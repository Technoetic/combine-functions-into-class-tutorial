---
step: 030
title: 전체 설계 chunk1
date: 2026-06-21
status: PASS
---

# Step 030 전체 설계

## 클래스 구조

```text
App
  -> ScenarioRepository
  -> TutorialState
  -> TutorialView
       -> FlowCanvas
```

## 책임

- App: 의존성 생성, async init, 시작 순서 관리.
- ScenarioRepository: 앱 사례 데이터를 비동기로 제공.
- TutorialState: 선택된 사례, 단계, 모은 조각, 안전 체크 상태를 관리.
- TutorialView: DOM 렌더링, 이벤트 연결, 접근성 속성 업데이트.
- FlowCanvas: 추상 흐름선을 캔버스에 그린다.
- MetricsCalculator: 조각이 모이는 정도에 따라 지표를 계산한다.

## Public API

- `App.init(): Promise<void>`
- `ScenarioRepository.load(): Promise<Scenario[]>`
- `TutorialState.init(scenarios): Promise<void>`
- `TutorialState.collectFragment(id): void`
- `TutorialState.resetScenario(): void`
- `TutorialView.init(): Promise<void>`
- `FlowCanvas.start(): Promise<void>`

## 비동기 흐름

```text
new App
  -> await repository.load()
  -> await state.init(scenarios)
  -> await view.init()
  -> await flowCanvas.start()
```

## 구현 계약

- 생성자는 가볍게 유지하고 무거운 초기화는 async init에서 수행한다.
- 의존성은 생성자 주입으로 전달한다.
- 전역 함수와 전역 상태를 만들지 않는다.
- 이벤트는 EventTarget 기반으로 연결한다.
- 화면에는 코드 스니펫을 렌더링하지 않는다.

Step 030 전체 설계 완료
