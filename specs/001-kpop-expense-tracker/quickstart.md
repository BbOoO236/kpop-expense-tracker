# Quickstart / Validation Guide: K-pop Fandom Expense Tracker

- **Feature**: [spec.md](./spec.md)
- **Created**: 2026-11-17

Runnable end-to-end validation scenarios that prove the feature works. Implementation details live
in `tasks.md`; this file only describes what to run and what to expect.

## Prerequisites

- Node.js 20+, a PostgreSQL 16 instance, WeChat DevTools with a test mini-program AppID.
- Backend env (database URL, WeChat AppID/Secret for `code2session`).

## Setup

1. Backend: install deps, migrate schema (per `data-model.md`), start on localhost.
2. Frontend: install deps, point the API client at the local backend, open in WeChat DevTools.

## Validation Scenarios

### 1. Log an expense and see totals (User Story 1, P1)
- **Given** a signed-in user, **When** they record: amount `30000`, currency `KRW`, rate `0.0054`,
  group `SEVENTEEN`, category `专辑`, **Then** the list shows `₩30,000` with RMB `¥162.00` alongside.
- **When** they record a second expense (`¥200`, group `BTS`, category `周边`), **Then** the summary
  shows total RMB and a breakdown by group (`SEVENTEEN ¥162.00`, `BTS ¥200.00`) and by category.

### 2. Currency validation (edge case)
- **Given** a non-RMB expense with a blank or `0` rate, **When** saved, **Then** the app prompts for
  a valid rate and does not save.

### 3. Visibility and friends (User Story 2, P2)
- **Given** a new expense, **When** saved without changing visibility, **Then** it defaults to 仅自己.
- **Given** the owner adds a WeChat friend who has authorized, **When** the friend views shared
  expenses, **Then** they see only `好友`/`公开` entries and never `仅自己` entries.

### 4. Advisory 征询意见 (User Story 3, P3)
- **Given** a user with ≥1 friend, **When** they start a request (item, price, reason, friends),
  **Then** the friends receive it; selecting zero friends is blocked.
- **Given** a participant responds `approve`, **When** another participant opens the request,
  **Then** they can see that response (shared thread).
- **Given** a `decline` response, **When** the requester proceeds anyway, **Then** the purchase is
  never blocked (advisory only).

## Expected outcomes

- Money math is correct and deterministic (half-up, 2 dp) across all scenarios.
- No `仅自己` expense leaks to friends; no public feed exists.
- Advisory responses are visible to all participants and never gate a purchase.
