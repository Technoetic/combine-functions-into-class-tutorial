---
step: 050
title: 테스트 코드 작성 및 실행
date: 2026-06-21
status: PASS
---

# Step 050 테스트 결과

## Vitest

- 명령: `npm.cmd run test`
- 결과: 1 files passed, 3 tests passed

## c8

- 명령: `npx.cmd c8 --include "src/core/**/*.js" --include "src/data/**/*.js" --reporter=json --reporter=text node scripts/c8-smoke.mjs`
- Statements: 97.12%
- Branch: 73.52%
- Functions: 100%
- Lines: 97.12%

Step 050/107 완료
