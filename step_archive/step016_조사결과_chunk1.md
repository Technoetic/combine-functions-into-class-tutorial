---
step: 016
title: 전체 조사 결과 chunk1
date: 2026-06-21
status: PASS
---

# Step 016 조사 결과

## Step-Back

- 핵심 목적: "Combine Functions into Class"의 의미를 공식 근거로 확인하고, 코드 비노출 초보자용 인터랙션으로 번역할 설계 재료를 확보한다.
- 영향 Step: step025 기획, step030 설계, step037 구현, step085 이후 E2E/접근성 검증.
- 핵심 확인 3가지: 공식 리팩토링 구조, 초보자에게 전달할 행동 보존 원칙, 조작 가능한 UI 패턴.

## 수집 방식

- Playwright 실행 스크립트: `scripts/research-pages.cjs`
- manifest: `step_archive/research-manifest.json`
- 스크린샷: `step_archive/screenshots/research/*.png`
- 원문: `step_archive/research-raw-*.txt`

## 출처별 관찰

### Martin Fowler catalog

- URL: https://refactoring.com/catalog/combineFunctionsIntoClass.html
- 원문 파일: `step_archive/research-raw-fowler-combine-functions-into-class.txt`
- 스크린샷: `step_archive/screenshots/research/fowler-combine-functions-into-class.png`
- 관찰: 공식 카탈로그는 "여러 기능이 같은 읽기 데이터 주변에서 움직이는 상태"에서 "Reading이라는 클래스 안으로 기능을 모으는 상태"로 변환되는 구조를 보여준다.
- 튜토리얼 반영: 화면에는 코드 대신 "흩어진 작업 조각"과 "하나의 기능 센터"로 시각화한다.

### Martin Fowler Refactoring book page

- URL: https://martinfowler.com/books/refactoring.html
- 원문 파일: `step_archive/research-raw-fowler-refactoring-book.txt`
- 스크린샷: `step_archive/screenshots/research/fowler-refactoring-book.png`
- 관찰: 리팩토링은 작은 행동 보존 변화의 누적으로 설계를 개선하는 활동이다.
- 튜토리얼 반영: 사용자가 조각을 모아도 "앱 결과는 그대로"라는 안전 확인 패널을 둔다.

### Material Design gestures

- URL: https://m3.material.io/foundations/interaction/gestures
- 원문 파일: `step_archive/research-raw-material-design-navigation.txt`
- 스크린샷: `step_archive/screenshots/research/material-design-navigation.png`
- 관찰: 탭, 스크롤, 스와이프 같은 제스처가 이동, 행동, 변형에 쓰이며 UI는 실시간으로 반응해야 한다.
- 튜토리얼 반영: 탭으로 앱 사례를 전환하고, 조각 버튼/드롭 존으로 즉시 상태가 바뀌는 구조를 채택한다.

### Awwwards education / interactive

- URL: https://www.awwwards.com/websites/education/
- URL: https://www.awwwards.com/websites/interactive/
- 원문 파일: `step_archive/research-raw-awwwards-education.txt`, `step_archive/research-raw-awwwards-interactive.txt`
- 스크린샷: `step_archive/screenshots/research/awwwards-education.png`, `step_archive/screenshots/research/awwwards-interactive.png`
- 관찰: 큰 이미지 카드, 넓은 여백, 제작자/수상 메타데이터, 필터 바가 반복된다.
- 튜토리얼 반영: 감상용 갤러리보다 학습 도구에 맞게 조밀한 작업대 레이아웃을 쓰되, 필터형 탭과 넓은 시각 캔버스는 참고한다.

## 제외한 근거

- `https://refactoring.guru/combine-functions-into-class`는 Playwright 수집 결과 404 페이지로 확인되어 기획 근거에서 제외한다.

## CoVe

- 핵심 항목 3가지 조사: 완료
- 조사 결과 청크 저장: 완료
- 이후 Step 참조 가능 형식: 완료

Step 016/107 완료
