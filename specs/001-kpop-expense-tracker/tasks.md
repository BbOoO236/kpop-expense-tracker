# Tasks: K-pop Fandom Expense Tracker

**Input**: Design documents from `specs/001-kpop-expense-tracker/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are minimal and targeted at **constitutionally-mandated money-math correctness**
(constitution v1.0.0, Principle III "Money Math Correctness"). A full TDD suite was not requested,
so only the currency-conversion and aggregation paths get mandatory tests.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested
independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependencies)
- **[Story]**: which user story the task belongs to (US1, US2, US3)
- Exact file paths in every description.

## Path Conventions

- Frontend: `mini-program/src/` (uni-app, Vue 3 + TS)
- Backend: `backend/src/modules/<module>/` (NestJS, Node.js + TS)
- Backend tests: `backend/test/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize NestJS backend (Node.js + TypeScript) in `backend/`
- [X] T002 Initialize uni-app (Vue 3 + TypeScript + Vite) project in `mini-program/`
- [X] T003 [P] Configure PostgreSQL connection and migration framework (TypeORM/Prisma) in `backend/src/`
- [X] T004 [P] Configure environment management (DB URL, WeChat AppID/Secret) in `backend/.env.example`
- [X] T005 [P] Configure linting/formatting (ESLint + Prettier) for both `backend/` and `mini-program/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Set up database connection + migration bootstrap (TypeORM/Prisma) in `backend/src/`
- [ ] T007 Create `User` entity (`id`, `openid` unique, `nickname`, `avatar`, `created_at`) in `backend/src/modules/auth/user.entity.ts`
- [ ] T008 Implement WeChat login `POST /auth/login` (`wx.login` code → `code2session` → issue bearer token) in `backend/src/modules/auth/auth.controller.ts`
- [ ] T009 [P] Set up global validation (class-validator DTOs), error handling, and request logging in `backend/src/`
- [ ] T010 Implement mini-program auth flow (`wx.login` → call `/auth/login` → store token) in `mini-program/src/api/auth.ts` and `mini-program/src/store/`

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 — Record and see fandom spending (Priority: P1) 🎯 MVP

**Goal**: A user logs multi-currency expenses (amount, currency, group, category, date), sees them
in a list, edits/deletes them, and views total + per-group + per-category breakdown.

**Independent Test**: Log several expenses, see them listed, edit/delete one, and view total +
per-group + per-category totals — with no friend/social feature present.

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create `IdolGroup` entity (`name` unique case-insensitive normalized, `is_preset`) in `backend/src/modules/groups/idol-group.entity.ts`
- [ ] T012 [P] [US1] Create `ExpenseCategory` entity (`name` unique, `is_preset`) in `backend/src/modules/categories/expense-category.entity.ts`
- [ ] T013 [US1] Create `Expense` entity (`currency`, `amount`, `exchange_rate` nullable, `amount_rmb`, `visibility` enum `self|friends|public` default `self`, `group_id`, `category_id`, `spent_at`) in `backend/src/modules/expenses/expense.entity.ts`
- [ ] T014 [US1] Implement money-math helper: `amount_rmb = amount` (CNY) else `round(amount * exchange_rate, 2)` half-up, in `backend/src/modules/expenses/money.util.ts`
- [ ] T015 [US1] Unit test for currency conversion + deterministic half-up rounding (constitution: Money Math Correctness) in `backend/test/money.util.spec.ts`
- [ ] T016 [US1] Implement `GET /groups` (preset + custom) and `POST /groups` (custom; 409 on case-insensitive duplicate) in `backend/src/modules/groups/groups.controller.ts`
- [ ] T017 [US1] Implement `GET /categories` and `POST /categories` in `backend/src/modules/categories/categories.controller.ts`
- [ ] T018 [US1] Implement `POST /expenses` (validate: amount > 0; non-CNY requires `exchange_rate` > 0) and `GET /expenses` (filters) in `backend/src/modules/expenses/expenses.controller.ts`
- [ ] T019 [US1] Implement `PATCH /expenses/:id` (edit, recompute `amount_rmb`) and `DELETE /expenses/:id` in `backend/src/modules/expenses/expenses.controller.ts`
- [ ] T020 [US1] Implement `GET /expenses/summary` (total + `byGroup` + `byCategory` aggregation) in `backend/src/modules/expenses/expenses.controller.ts`
- [ ] T021 [US1] Unit test for aggregation correctness (total and group/category breakdowns) in `backend/test/expenses.aggregation.spec.ts`
- [ ] T022 [US1] Implement expense entry page (amount, currency, group select + manual fallback, category, date) in `mini-program/src/pages/expense/add.vue`
- [ ] T023 [US1] Implement expense list page (individual expenses showing currency + RMB equivalent, with edit/delete actions) in `mini-program/src/pages/expense/list.vue`
- [ ] T024 [US1] Implement summary page (total + per-group + per-category breakdown) in `mini-program/src/pages/summary/index.vue`

**Checkpoint**: User Story 1 fully functional and independently testable (this is the MVP).

---

## Phase 4: User Story 2 — Control visibility and add friends (Priority: P2)

**Goal**: Each expense has visibility (仅自己 / 好友 / 公开, default 仅自己); users add friends via
WeChat; friends see only 好友/公开 entries.

**Independent Test**: Set visibility on an expense and add a friend; the friend sees 好友-visible
entries while 仅自己 entries stay hidden.

### Implementation for User Story 2

- [ ] T025 [P] [US2] Create `Friendship` entity (`user_id`, `friend_id`, unique pair) in `backend/src/modules/friends/friendship.entity.ts`
- [ ] T026 [US2] Implement `POST /friends` (add; 409 already friends, 404 friend not found) in `backend/src/modules/friends/friends.controller.ts`
- [ ] T027 [US2] Implement `GET /friends` (list) in `backend/src/modules/friends/friends.controller.ts`
- [ ] T028 [US2] Implement `GET /friends/:friendId/expenses` (only `friends`/`public` visibility; never `self`) in `backend/src/modules/friends/friends.controller.ts`
- [ ] T029 [US2] Implement visibility enforcement on expense reads (self sees own; friends see shared only; 公开 is a flag with no public feed) in `backend/src/modules/expenses/expenses.service.ts`
- [ ] T030 [US2] Implement visibility selector (仅自己 / 好友 / 公开, default 仅自己) in `mini-program/src/pages/expense/add.vue`
- [ ] T031 [US2] Implement friend list + quick-add (WeChat friends who authorized) in `mini-program/src/pages/friends/index.vue`

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 — Advisory peer input (征询意见) (Priority: P3)

**Goal**: Before a non-trivial purchase, a user asks selected friends for opinions; friends respond
(approve/decline/comment) in a shared thread; input is advisory only.

**Independent Test**: Create a 征询意见 request, a friend responds, the requester sees the summary —
with no purchase blocked.

### Implementation for User Story 3

- [ ] T032 [P] [US3] Create `AdvisoryRequest` entity (`initiator_id`, `item`, `price`, `reason`, `created_at`) in `backend/src/modules/advisory/advisory-request.entity.ts`
- [ ] T033 [P] [US3] Create `AdvisoryParticipant` entity (`request_id` + `friend_id` composite PK) in `backend/src/modules/advisory/advisory-participant.entity.ts`
- [ ] T034 [P] [US3] Create `AdvisoryResponse` entity (`request_id`, `respondent_id`, `opinion` enum `approve|decline|comment`, `comment`) in `backend/src/modules/advisory/advisory-response.entity.ts`
- [ ] T035 [US3] Implement `POST /advisory-requests` (require non-empty `friendIds`, FR-012) in `backend/src/modules/advisory/advisory.controller.ts`
- [ ] T036 [US3] Implement `GET /advisory-requests/:id` (requester + participants can view; responses shared, FR-014) in `backend/src/modules/advisory/advisory.controller.ts`
- [ ] T037 [US3] Implement `POST /advisory-requests/:id/responses` (opinion enum; `comment` required when `opinion=comment`; 403 non-participant, 409 already responded; advisory only, FR-010) in `backend/src/modules/advisory/advisory.controller.ts`
- [ ] T038 [US3] Implement advisory request creation page (item, price, reason, select friends) in `mini-program/src/pages/advisory/create.vue`
- [ ] T039 [US3] Implement advisory detail/response view (shared thread) in `mini-program/src/pages/advisory/detail.vue`

**Checkpoint**: All user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T040 [P] Run `quickstart.md` validation scenarios end-to-end and record results
- [ ] T041 [P] Security/privacy hardening: confirm no 仅自己 expense leaks to friends; minor-privacy review for 公开 visibility
- [ ] T042 [P] Documentation updates (`README.md` at repo root, run/deploy notes)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately.
- **Foundational (Phase 2)**: depends on Setup; BLOCKS all user stories.
- **User Stories (Phase 3–5)**: all depend on Foundational; proceed in priority order (or in parallel if staffed).
- **Polish (Phase 6)**: depends on the desired user stories.

### User Story Dependencies

- **US1 (P1)**: after Foundational; no story dependencies.
- **US2 (P2)**: after Foundational; reuses `Expense` visibility (from US1) but independently testable.
- **US3 (P3)**: after Foundational; reuses the friend graph (US2) but independently testable.

### Within Each User Story

- Money-math tests (US1) MUST be written and FAIL before the helper/aggregation are implemented.
- Entities before services/controllers.
- Controller before the matching mini-program page.

### Parallel Opportunities

- T003, T004, T005 (Setup) can run in parallel.
- T009 (foundational) is independent of T007/T008.
- Within US1: T011, T012 (entities) in parallel; T015, T021 (tests) in parallel.
- Within US3: T032, T033, T034 (entities) in parallel.
- Once Foundational completes, US1/US2/US3 can be split across developers.

---

## Parallel Example: User Story 1

```bash
# Entities (parallel):
Task: "T011 [P] [US1] Create IdolGroup entity in backend/src/modules/groups/idol-group.entity.ts"
Task: "T012 [P] [US1] Create ExpenseCategory entity in backend/src/modules/categories/expense-category.entity.ts"

# Tests (parallel, before helper/aggregation are implemented):
Task: "T015 [US1] Unit test for currency conversion + rounding in backend/test/money.util.spec.ts"
Task: "T021 [US1] Unit test for aggregation correctness in backend/test/expenses.aggregation.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (US1).
3. **STOP and VALIDATE** US1 independently (log/list/edit/delete expenses, view breakdown).
4. Deploy/demo if ready.

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. Add US1 → validate → demo (MVP!).
3. Add US2 → validate → demo.
4. Add US3 → validate → demo.

---

## Notes

- [P] tasks touch different files with no cross-dependencies.
- [Story] labels map tasks to spec user stories for traceability.
- Commit after each task or logical group; stop at checkpoints to validate independently.
- Money-math tests are non-optional per constitution v1.0.0 Principle III.
