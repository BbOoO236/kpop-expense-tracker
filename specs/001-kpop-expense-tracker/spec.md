# Feature Specification: K-pop Fandom Expense Tracker

**Feature Branch**: `001-kpop-expense-tracker`

**Created**: 2026-11-12

**Status**: Draft

**Input**: User description: "A WeChat mini-program for K-pop fans to record their fandom spending. Each expense records an amount, a currency (RMB primary; non-RMB converts to RMB via a user-entered exchange rate), an idol group, and a spending category, with totals breakable down by group and category. Each expense has a visibility level (仅自己 / 好友 / 公开). Users add friends via WeChat authorization and quick-add. Before a non-trivial purchase, a user can start an advisory 征询意见 request with selected friends to get opinions and comments (not a binding gate). The offline-concert module is out of scope (deferred)."

## Clarifications

### Session 2026-11-12

- Q: What does the "公开 (public)" visibility level do — a public feed or just a flag? → A: Flag only; v1 has no public browse feed (expenses are viewed by their owner and, for 好友-visible entries, by friends).
- Q: How should the "idol group" field be represented? → A: A preset list of groups to select from, with manual entry allowed when the group is not listed (structured for future extensibility and ease of selection).
- Q: Can invited friends see each other's responses to a 征询意见 request? → A: Yes — a shared thread where all invited friends can see each other's responses.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Record and see fandom spending (Priority: P1)

A K-pop fan logs each fandom purchase — albums, merchandise, concert tickets, and similar — recording the amount, currency, the idol group it is for, and a spending category. They can then see a running total and a breakdown by group and by category.

**Why this priority**: This is the core loop and the foundation every other feature builds on. It alone delivers value (seeing where the money goes) and is the first slice used to validate adoption before investing in social features.

**Independent Test**: A user can log several expenses and view total spending plus per-group and per-category totals without any friend or social feature present.

**Acceptance Scenarios**:

1. **Given** a signed-in user, **When** they record an expense with an amount, currency, idol group, and category, **Then** the expense appears in their list with the correct amount and (for non-RMB) the RMB equivalent.
2. **Given** several logged expenses across different groups and categories, **When** the user views the summary, **Then** they see the total and a breakdown by group and by category.
3. **Given** a logged expense, **When** the user edits its amount or deletes it, **Then** the expense list and the summary totals/breakdowns update accordingly.

---

### User Story 2 - Control visibility and add friends (Priority: P2)

Each expense can be marked 仅自己 (self-only), 好友 (friends), or 公开 (public). Users add friends through their WeChat account: after authorizing, the mini-program shows their WeChat friends who have also authorized it, with a quick-add control.

**Why this priority**: Visibility is the foundation of both privacy control and the social features; the friend graph enables the advisory flow. It is needed before the peer-input differentiator can work.

**Independent Test**: A user can set visibility on an expense and add a friend, and that friend can see 好友-visible expenses while 仅自己 expenses stay hidden.

**Acceptance Scenarios**:

1. **Given** a user creating a new expense, **When** they save it without changing visibility, **Then** it defaults to 仅自己.
2. **Given** a user who has authorized with WeChat, **When** they quick-add a WeChat friend who has also authorized, **Then** that friend appears in their friend list.
3. **Given** an expense marked 好友, **When** a friend views it, **Then** they can see it, while 仅自己 expenses remain hidden from them.

---

### User Story 3 - Advisory peer input (征询意见) (Priority: P3)

Before a non-trivial purchase, a user selects a few friends and asks for opinions. Friends respond with approve / decline / comment, and the user sees a summary. The input is advisory only — it never blocks the purchase.

**Why this priority**: This is the product's main differentiator (stronger friend interaction) and directly answers the goal of getting advice before an impulsive buy. It is built last because it depends on the friend graph from Story 2.

**Independent Test**: A user can create a 征询意见 request, a friend responds, and the requester sees the summary — with no purchase being blocked at any point.

**Acceptance Scenarios**:

1. **Given** a user with at least one friend, **When** they start a 征询意见 request for a purchase with selected friends, **Then** those friends receive the request.
2. **Given** a friend with a pending request, **When** they respond (approve/decline/comment), **Then** the requester sees the response.
3. **Given** any response, **When** the requester proceeds with the purchase, **Then** the purchase is never blocked (advisory only).
4. **Given** a request with multiple invited friends, **When** one friend responds, **Then** the other invited friends can see that response.

---

### Edge Cases

- A non-RMB expense is saved with a missing or invalid exchange rate → the system prompts for a valid rate before saving.
- A friend has not yet authorized the mini-program → they are not shown in the add-friends list.
- A 征询意见 request is started with no friends selected → the system prompts to select at least one friend.
- An expense is edited or deleted after logging → totals and group/category breakdowns update accordingly.
- An expense is marked 公开 → visibility is respected, with privacy and minor-protection considerations noted (see Assumptions).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to record an expense with an amount, a currency, an idol group, a spending category, and a date.
- **FR-002**: For an RMB expense, the amount is entered directly; for a non-RMB expense, the user MUST provide an exchange rate and the system MUST compute and store the RMB-equivalent amount.
- **FR-003**: The system MUST display each expense in its chosen currency, with the RMB equivalent shown alongside.
- **FR-004**: The system MUST aggregate totals by idol group and by spending category.
- **FR-005**: Every expense MUST have a visibility level of 仅自己 (self-only), 好友 (friends), or 公开 (public). 公开 is a stored visibility flag only — v1 provides no public browse feed (expenses are viewed only by their owner, and 好友-visible entries also by friends).
- **FR-006**: New expenses MUST default to the least-permissive visibility (仅自己).
- **FR-007**: Users MUST be able to add friends via WeChat authorization; the system shows WeChat friends who have also authorized the mini-program, with a quick-add control.
- **FR-008**: Users MUST be able to start an advisory 征询意见 request for a purchase, selecting one or more friends and including the item, price, and reason.
- **FR-009**: Selected friends MUST be able to respond to a request with an opinion (approve / decline / comment).
- **FR-010**: Peer input is advisory and MUST NOT block or cancel the purchase.
- **FR-011**: The requester MUST be able to see a summary of responses to their request.
- **FR-012**: The system MUST prevent creating an advisory request with zero selected friends (prompt to select at least one).
- **FR-013**: The idol group field MUST offer a preset list of groups to select from, and MUST allow manual entry of a group not in the list.
- **FR-014**: All invited friends MUST be able to see each other's responses to a 征询意见 request (a shared discussion thread).
- **FR-015**: Users MUST be able to edit and delete an existing expense; totals and group/category breakdowns MUST recompute accordingly.

### Key Entities

- **User**: A K-pop fan; has a WeChat identity and a friend list.
- **Expense**: amount, currency, RMB-equivalent, idol group, category, date, and visibility.
- **Idol Group**: the group/artist an expense relates to; sourced from a preset list with custom entries allowed when not listed.
- **Expense Category**: album, merchandise, concert, travel, fan-club, and others.
- **Advisory Request**: initiator, item, price, reason, selected friends, and status; responses are shared among invited friends.
- **Advisory Response**: friend, opinion (approve/decline/comment), and timestamp.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can record a single expense in under 30 seconds.
- **SC-002**: A user can view total spending and per-group/per-category breakdowns with a single action after logging.
- **SC-003**: A user can create an advisory request, receive at least one friend response, and view the summary without the purchase being blocked.
- **SC-004** (qualitative): Users report better awareness of their total fandom spending and fewer regretted impulse purchases.

## Assumptions

- WeChat account authorization is the login/identity mechanism (a product decision from the assessment).
- RMB is the primary currency; non-RMB amounts convert using a user-entered exchange rate (no live exchange-rate feed in v1).
- The category list starts with common fandom categories (专辑, 周边, 演唱会, 交通, 住宿, 粉丝会/会员, 其他) and also allows custom categories.
- Each expense belongs to one idol group and one category (tagging a single expense to multiple groups is out of scope for v1).
- The idol-group field uses a preset list of groups with manual entry for unlisted groups; the preset list is seeded with common groups and grows as users add custom entries.
- The offline-concert trip module is out of scope (deferred to a later slice).
- "Non-trivial purchase" is user-determined; any expense can trigger a 征询意见 request (no amount threshold enforced).
- Monetization is out of scope (personal project; deferred until/unless the user base grows).
- Privacy and minor-protection for 公开/好友 visibility must be respected and are expected to be handled within the platform's rules.
- 公开 is a visibility flag only — v1 has no public feed/discovery surface; adding a public feed later requires separate moderation and minor-privacy review.
