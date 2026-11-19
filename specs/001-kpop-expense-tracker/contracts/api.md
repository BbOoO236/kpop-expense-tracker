# REST API Contract: K-pop Fandom Expense Tracker

- **Feature**: [spec.md](../spec.md)
- **Created**: 2026-11-17

All requests from the mini-program to the NestJS backend. Auth is a bearer token issued after
WeChat login. Amounts are returned as decimal strings (never floats) to preserve money precision.
Base path: `/api/v1`.

## Auth

### POST /auth/login
WeChat login.
- Request: `{ "code": string }` (from `wx.login`)
- Response: `{ "token": string, "user": { "id", "nickname", "avatar" } }`

## Expenses

### POST /expenses
Create an expense.
- Request: `{ "groupId", "categoryId", "currency", "amount", "exchangeRate"?, "note"?, "visibility"?, "spentAt" }`
  - `visibility` ∈ `self` | `friends` | `public` (default `self`)
  - `exchangeRate` required when `currency != "CNY"`
- Response: the created expense, including computed `amountRmb`.
- Errors: 400 invalid rate / amount; 404 group/category not found.

### GET /expenses
List the caller's own expenses, with optional filters.
- Query: `groupId?`, `categoryId?`, `visibility?`, `from?`, `to?`
- Response: `{ "items": [Expense], "totalRmb": string }`

### GET /expenses/summary
Aggregated totals for the caller.
- Response:
  ```json
  {
    "totalRmb": "1234.56",
    "byGroup":   [{ "groupId": "...", "name": "BTS", "totalRmb": "800.00" }],
    "byCategory":[{ "categoryId": "...", "name": "专辑", "totalRmb": "500.00" }]
  }
  ```

### PATCH /expenses/:id
Edit an expense (amount, group, category, currency/rate, visibility, date, note).
- Response: updated expense with recomputed `amountRmb`.

### DELETE /expenses/:id
Delete an expense. Response: 204.

## Idol Groups & Categories

### GET /groups
Preset + user-added groups. Response: `{ "items": [{ "id", "name", "isPreset" }] }`

### POST /groups
Add a custom group (FR-013). Request: `{ "name" }`. Response: created group.
- Errors: 409 if a case-insensitive duplicate exists.

### GET /categories
Preset + user-added categories. Response: `{ "items": [{ "id", "name", "isPreset" }] }`

### POST /categories
Add a custom category. Request: `{ "name" }`.

## Friends

### GET /friends
List the caller's friends (added via WeChat).
- Response: `{ "items": [{ "id", "nickname", "avatar" }] }`

### POST /friends
Add a friend. Request: `{ "friendUserId" }` (the friend must have authorized the mini-program).
- Errors: 409 already friends; 404 friend not found.

### GET /friends/:friendId/expenses
Expenses the friend has marked `friends` or `public` and shared with the caller.
- Response: `{ "items": [Expense] }` (only `friends`/`public` visibility; never `self`).

## Advisory (征询意见)

### POST /advisory-requests
Create an advisory request (FR-008, FR-012).
- Request: `{ "item", "price", "reason", "friendIds": [ ... ] }` — `friendIds` MUST be non-empty.
- Response: created request with its participants.

### GET /advisory-requests/:id
Fetch a request and its responses. The requester and all participants can view.
- Response: `{ "request": {...}, "responses": [ { "respondentId", "opinion", "comment", "createdAt" } ] }`

### POST /advisory-requests/:id/responses
A participant responds (FR-009, FR-014).
- Request: `{ "opinion": "approve" | "decline" | "comment", "comment"? }`
  - `comment` required when `opinion = "comment"`
- Response: the created response (visible to all participants).
- Errors: 403 if the caller is not a participant; 409 if already responded.

## Shared types

- **Expense**: `{ "id", "groupId", "categoryId", "currency", "amount", "amountRmb", "note", "visibility", "spentAt" }`
- **Advisory**: advisory only — no endpoint changes purchase state; responses never block a purchase (FR-010).
