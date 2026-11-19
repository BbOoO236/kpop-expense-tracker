# Implementation Plan: K-pop Fandom Expense Tracker

**Branch**: `001-kpop-expense-tracker` | **Date**: 2026-11-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-kpop-expense-tracker/spec.md`

## Summary

A WeChat mini-program for K-pop fans to record multi-currency fandom spending (with per-group and per-category tagging and aggregation), control per-expense visibility (仅自己 / 好友 / 公开), add friends via WeChat, and get advisory pre-purchase input from friends (征询意见, advisory-only). Technical approach: a uni-app (Vue 3 + TypeScript) mini-program frontend talking to a NestJS (Node.js + TypeScript) REST backend with PostgreSQL.

## Technical Context

**Language/Version**: TypeScript 5.x (frontend + backend); Vue 3 (uni-app); Node.js 20+

**Primary Dependencies**: uni-app (Vue 3 + Vite) for the mini-program; NestJS + an ORM (TypeORM/Prisma) for the backend; WeChat Login (`wx.login` → `code2session`)

**Storage**: PostgreSQL 16

**Testing**: Vitest (frontend unit); Jest (backend unit + e2e); WeChat DevTools simulator (manual/UI)

**Target Platform**: WeChat mini-program (frontend); Linux/cloud server for backend

**Project Type**: web application (mini-program frontend + REST API backend)

**Performance Goals**: expense save/list/summary renders locally in under ~1s; backend API p95 < 300ms for a single user's data (personal-project scale)

**Constraints**: must run within WeChat review rules; minor/privacy handling; money math correct (deterministic rounding); offline-concert module deferred

**Scale/Scope**: personal-project MVP — tens to low thousands of users; ~dozens of screens; single-region (CN) deployment

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Privacy & Data Minimization** — PASS: FR-006 defaults new expenses to 仅自己; non-goal "not selling/monetizing user data".
- **Advisory-Only Social Interaction** — PASS: FR-010 peer input is advisory, never blocks purchase.
- **Money Math Correctness** — PASS: FR-002/FR-003 require an explicit exchange rate and RMB equivalent; design specifies deterministic rounding and tests for all money paths.
- **Smallest Viable Slice** — PASS: offline-concert module is out of scope (deferred).
- **WeChat Platform-First** — PASS: FR-007 uses WeChat authorization for login + friend graph.

No violations → no Complexity Tracking required.

## Project Structure

### Documentation (this feature)

```text
specs/001-kpop-expense-tracker/
├── plan.md              # This file
├── research.md          # Phase 0 output (tech stack + decisions)
├── data-model.md        # Phase 1 output (entities)
├── quickstart.md        # Phase 1 output (validation guide)
├── contracts/           # Phase 1 output (REST API)
│   └── api.md
└── tasks.md             # Phase 2 output (NOT created here)
```

### Source Code (repository root)

```text
mini-program/            # uni-app (Vue 3 + TypeScript)
├── src/
│   ├── pages/           # 记账 / 汇总 / 好友 / 征询意见 pages
│   ├── components/
│   ├── api/             # backend API client
│   └── store/           # Pinia state
└── tests/

backend/                 # NestJS (Node.js + TypeScript)
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── expenses/
│   │   ├── groups/
│   │   ├── categories/
│   │   ├── friends/
│   │   └── advisory/
│   └── main.ts
└── test/
```

**Structure Decision**: two top-level directories — `mini-program/` (uni-app frontend) and `backend/` (NestJS API). Backend is organized into feature modules (`expenses`, `groups`, `categories`, `friends`, `advisory`, `auth`) so each future feature is added as a new module.
