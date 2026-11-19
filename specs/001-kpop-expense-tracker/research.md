# Phase 0 Research: K-pop Fandom Expense Tracker

- **Feature**: [spec.md](./spec.md)
- **Created**: 2026-11-17

Each entry resolves one Technical Context decision with rationale and rejected alternatives.

## 1. Frontend framework

- **Decision**: uni-app (Vue 3 + TypeScript) targeting the WeChat mini-program.
- **Rationale**: the owner already knows Vue (their other project uses a Vue frontend), so uni-app's Vue syntax lowers the learning curve; it compiles to WeChat now and to H5 / Alipay / native apps later, directly serving "便于二次开发 / 加功能"; TypeScript improves maintainability as features grow.
- **Alternatives considered**:
  - Native WeChat mini-program (WXML/WXSS/JS) — most "official" and no compile layer, but Vue/React skills don't transfer and it is single-platform only. Rejected for extensibility.
  - Taro (React + TS) — same cross-platform benefit but React syntax; rejected because the owner's familiarity is Vue, not React.

## 2. Backend framework

- **Decision**: NestJS (Node.js 20+, TypeScript) exposing a REST API.
- **Rationale**: TypeScript end-to-end (one language across frontend and backend) reduces context-switching and eases secondary development; NestJS's module system maps cleanly to "add a new feature = add a module"; a self-hosted REST API is portable (a future H5/app/web dashboard can reuse it).
- **Alternatives considered**:
  - 微信云开发 CloudBase (serverless) — fastest to ship and zero server ops, and WeChat auth is built in; rejected as the *primary* choice because it is more tightly coupled to Tencent/WeChat, which works against long-term portability, though it remains a valid fallback for a minimal MVP.
  - Spring Boot (Java) — the owner knows it from another project and it is very mature; rejected here as heavier than needed for a personal project and it breaks the TypeScript end-to-end benefit.

## 3. Database

- **Decision**: PostgreSQL 16 (relational).
- **Rationale**: expenses, groups, categories, friendships, and advisory requests are strongly relational with referential integrity and aggregation needs (per-group/per-category totals), which a relational store handles naturally.
- **Alternatives considered**:
  - MySQL — equally fine; PostgreSQL chosen for JSON/aggregation flexibility and its richer query features for future additions.
  - A document/NoSQL store — rejected because relationships and aggregates are core here.

## 4. Authentication / identity

- **Decision**: WeChat Login (`wx.login` → backend `code2session`) as the sole identity provider; no separate credentials.
- **Rationale**: required by the "WeChat Platform-First" constitution principle and by FR-007 (friend graph via WeChat authorization).
- **Alternatives considered**: none material — WeChat login is the only identity that also yields the friend relationship.

## 5. Multi-currency handling

- **Decision**: RMB (CNY) is primary. Non-CNY expenses carry a user-entered exchange rate; the system computes `amount_rmb = amount * rate` with deterministic rounding to 2 decimal places (half-up), stored alongside. Display shows the chosen currency with the RMB equivalent in small text.
- **Rationale**: matches the spec (FR-002/FR-003) and the "Money Math Correctness" principle (explicit rate source + deterministic rounding). No live FX feed in v1 (documented assumption).
- **Alternatives considered**: live FX API — rejected for v1 (external dependency + latency + cost); can be added later behind the same rounding contract.

## 6. Testing strategy

- **Decision**: Vitest (frontend), Jest (backend unit + e2e), WeChat DevTools simulator for UI/manual checks.
- **Rationale**: money-math paths (currency conversion, aggregation) are constitutionally correctness-critical and MUST be unit-tested; e2e covers the auth → expense → aggregation → advisory flows.
- **Alternatives considered**: a single test runner — rejected because frontend (uni-app) and backend (NestJS) have different toolchain conventions.

## 7. Deployment

- **Decision**: backend on a Linux/cloud server (Docker optional); frontend published via WeChat mini-program review.
- **Rationale**: standard for a WeChat mini-program with a self-hosted backend; keeps full control for future features.
- **Alternatives considered**: CloudBase (see §2) — fallback if minimal-ops is preferred later.
