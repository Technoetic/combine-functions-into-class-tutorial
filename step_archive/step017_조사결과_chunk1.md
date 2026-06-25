---
step: 017
title: GitHub 조사 결과 chunk1
date: 2026-06-21
status: PASS
---

# Step 017 GitHub 조사 결과

## Step-Back

- 핵심 목적: 같은 리팩토링 주제와 JavaScript 튜토리얼 사례가 공개 저장소에서 어떤 형태로 다뤄지는지 확인한다.
- 영향 Step: step025 기획, step037 구현 파일 구조, step049 테스트 매핑.
- 핵심 확인 3가지: 주제 일치 저장소 존재 여부, JavaScript 사용 여부, 학습/커밋 이력 중심 구성 여부.

## API 호출

- 명령: `curl.exe -L -# "https://api.github.com/search/repositories?q=refactoring%20tutorial%20javascript&per_page=5"`
- 저장: `step_archive/github-api/step017-refactoring-tutorial-javascript.json`
- 명령: `curl.exe -L -# "https://api.github.com/search/repositories?q=%22combine%20functions%20into%20class%22&per_page=5"`
- 저장: `step_archive/github-api/step017-combine-functions-into-class.json`

## 관찰

- `refactoring tutorial javascript` 검색은 총 16개 결과를 반환했다.
- 주제명 정확 검색은 `kaiosilveira/combine-functions-into-class-refactoring` 1개 결과를 반환했다.
- 해당 저장소 설명은 Fowler 책의 "Combine Functions Into Class" 리팩토링에 대한 JavaScript 예제와 커밋 이력을 다룬다고 밝힌다.

## 구현 반영 결정

- 저장소 코드를 복제하지 않는다. 사용자 요구가 코드 비노출 튜토리얼이므로, 공개 예제는 "단계가 작고 추적 가능해야 한다"는 구조적 참고로만 사용한다.
- 앱 내부는 예제 코드 대신 상태 변화, 조각 이동, 지표 변화, 안전 확인으로 리팩토링 전후를 설명한다.
- 테스트는 pure state와 E2E를 분리해 "작은 변화가 결과를 깨지 않는다"는 리팩토링 원칙을 검증한다.

## CoVe

- 핵심 항목 3가지 조사: 완료
- GitHub API 실제 호출: 완료
- 결과 청크 저장: 완료

Step 017/107 완료
