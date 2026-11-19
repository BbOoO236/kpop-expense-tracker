# Data Model: K-pop Fandom Expense Tracker

- **Feature**: [spec.md](./spec.md)
- **Created**: 2026-11-17

Logical entities, fields, relationships, and validation rules. Types are illustrative (not
framework-specific). Amounts are stored as fixed-point numeric, never float.

## Entities

### User
- `id` (uuid, PK)
- `openid` (string, unique) — WeChat identity
- `nickname` (string, optional)
- `avatar` (string, optional)
- `created_at` (timestamp)

### IdolGroup
- `id` (uuid, PK)
- `name` (string, unique, case-insensitive normalized) — e.g. "BTS", "SEVENTEEN"
- `is_preset` (bool) — true for seeded common groups, false for user-added
- `created_at` (timestamp)

### ExpenseCategory
- `id` (uuid, PK)
- `name` (string, unique)
- `is_preset` (bool) — seeded categories (专辑, 周边, 演唱会, 交通, 住宿, 粉丝会/会员, 其他) are preset
- `created_at` (timestamp)

### Expense
- `id` (uuid, PK)
- `user_id` (FK → User)
- `group_id` (FK → IdolGroup)
- `category_id` (FK → ExpenseCategory)
- `currency` (string, 3-letter code, e.g. "CNY") — CNY/RMB primary
- `amount` (numeric) — amount in the chosen currency
- `exchange_rate` (numeric, nullable) — required when `currency != CNY`
- `amount_rmb` (numeric) — computed: `amount` (CNY) or `amount * exchange_rate` (non-CNY), rounded half-up to 2 dp
- `note` (string, optional)
- `visibility` (enum: `self` | `friends` | `public`) — default `self`; `public` is a flag only (no feed)
- `spent_at` (date)
- `created_at`, `updated_at` (timestamp)

### Friendship
- `id` (uuid, PK)
- `user_id` (FK → User)
- `friend_id` (FK → User)
- `created_at` (timestamp)
- Unique constraint on `(user_id, friend_id)` (each pair once)

### AdvisoryRequest
- `id` (uuid, PK)
- `initiator_id` (FK → User)
- `item` (string) — what is being considered for purchase
- `price` (numeric) — proposed price
- `reason` (string) — why / context
- `created_at` (timestamp)

### AdvisoryParticipant
- `request_id` (FK → AdvisoryRequest)
- `friend_id` (FK → User)
- Primary key `(request_id, friend_id)` — the selected friends for a request

### AdvisoryResponse
- `id` (uuid, PK)
- `request_id` (FK → AdvisoryRequest)
- `respondent_id` (FK → User)
- `opinion` (enum: `approve` | `decline` | `comment`)
- `comment` (string, optional) — required when `opinion = comment`
- `created_at` (timestamp)

## Relationships

- `User` 1—N `Expense` (an expense belongs to one owner)
- `Expense` N—1 `IdolGroup`, N—1 `ExpenseCategory` (single group + single category per expense, v1)
- `User` N—N `User` via `Friendship`
- `User` 1—N `AdvisoryRequest` (initiator)
- `AdvisoryRequest` N—N `User` via `AdvisoryParticipant` (selected friends)
- `AdvisoryRequest` 1—N `AdvisoryResponse` (responses are shared among participants, per FR-014)

## Validation Rules

- `Expense.amount` MUST be > 0.
- If `Expense.currency != "CNY"`, `exchange_rate` MUST be present and > 0; `amount_rmb` = `round(amount * exchange_rate, 2)`.
- `Expense.visibility` defaults to `self`; allowed values are `self` | `friends` | `public`.
- `AdvisoryRequest` MUST select at least one participant (FR-012); `item` and `reason` MUST be non-empty.
- `AdvisoryResponse.opinion` MUST be one of `approve` | `decline` | `comment`; `comment` is non-empty when `opinion = comment`.
- `IdolGroup.name` is unique after case-insensitive normalization (a preset list + user-added custom groups, per FR-013).

## Aggregation

Per-user totals are derived (not stored): total spend, and breakdowns by `group_id` and by
`category_id`, computed as `SUM(amount_rmb)` grouped over the user's expenses (optionally filtered
by visibility for friends viewing shared entries).

## State Transitions

- `Expense`: created → (edited →) deleted. Totals/breakdowns recompute on edit/delete.
- `AdvisoryRequest`: open (participants respond) — advisory only, no terminal "blocked" state;
  responses accumulate and remain visible to all participants.
