---
type: hosting
date: 2026-06-25
status: planned
---

# Hosting Decision

## 결정

- 새 GitHub 공개 저장소: `Technoetic/combine-functions-into-class-tutorial`
- 호스팅: GitHub Pages, GitHub Actions 배포
- Vite `base`: `./`
- 제외 파일: `.claude/`, `.kilo/`, `.mcp.json`, `AGENTS.md`, `CLAUDE.md`, `node_modules/`, `dist/`, `coverage/`, `test-results/`, 하네스 원본/로컬 규칙 아카이브

## 사유

- 사용자가 새 레포 푸시와 호스팅을 요청했다.
- 정적 Vite 앱이므로 GitHub Pages가 가장 단순하고 재현 가능하다.
- 공개 저장소로 결정했다. 별도 권한 질문 없이 즉시 배포하라는 프로젝트 자율주행 규칙을 따른다.
- `.claude/`와 `.kilo/`는 앱 소스가 아닌 로컬 자동화/에이전트 운영 파일이라 새 앱 레포에서 제외한다.
- `AGENTS.md`, `CLAUDE.md`, `.mcp.json`은 공개 호스팅 앱 실행에 필요하지 않고 로컬 경로를 포함하므로 제외한다.
