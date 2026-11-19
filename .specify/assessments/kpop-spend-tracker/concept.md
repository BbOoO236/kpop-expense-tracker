# Concept: K-pop Fandom Spending Tracker

- **Slug**: kpop-spend-tracker
- **Created**: 2026-11-12
- **Recommended option**: Option C — Differentiated Slice

## Options

### Option A — Buy / Do Nothing
- **Sketch**: Do not build. Recommend users to an existing tool (Stan Log, MyColor, 追星日记, 饭谷账 for tracking; 钱包请等等 for pre-purchase peer approval), or a DIY combo (spreadsheet + generic bookkeeping app). At most, publish a "how to track your 追星 spending" guide or a template.
- **Appetite**: none (0 days)
- **Trade-offs**: zero build risk and zero cost; but no ownership, no control over the specific *social visibility + peer input + offline trip* combination the problem implies, and no way to capture the niche. The opportunity cost is the unproven gap that this combination could fill.
- **Rabbit holes**: none.

### Option B — Smallest Thing That Could Work (core tracking loop)
- **Sketch**: A minimal **WeChat mini-program** that does one thing well: log a fandom expense (amount, category, idol/group, date) in multiple currencies, tag each entry with a visibility level (仅自己 / 好友 / 公开), and show a running total with simple per-group, per-category, and per-currency breakdown. No friend graph beyond a stub, no advisory-input flow, no offline module.
- **Appetite**: small (days to ~2 weeks)
- **Trade-offs**: fastest way to test whether the target audience actually adopts a dedicated tracker instead of their spreadsheets; lowest cost, and fits a personal-project launch on WeChat. But it rebuilds the *commoditized* half of the space — research found 6+ competitors already doing per-idol tracking, budgeting, and charts — so it only addresses problem-goal #1 (and partially #4), not the differentiators.
- **Rabbit holes**: multi-currency + exchange-rate handling; the three-level visibility/privacy model and any content-review implication of "公开" entries within WeChat.

### Option C — Differentiated Slice (tracking + advisory peer input)
- **Sketch**: Option B's tracking, plus an **advisory** "征询意见" loop: before a non-trivial purchase, a user picks a few friends and asks for input (opinions and comments only — **not** a binding gate). Friends see the proposed item and can approve/decline/comment; the asker sees a simple summary. The offline concert module is explicitly deferred.
- **Appetite**: medium (weeks)
- **Trade-offs**: adds the cheapest-to-build differentiator with clear user value, and begins to answer problem-goal #2. Research warns this has a direct generic analog (钱包请等等), so the win is *fandom-specific framing and integration with a fandom expense log*, not the mechanic itself. Sacrifices the offline-trip module (goal #3) for now.
- **Rabbit holes**: friend-graph mechanics (WeChat relationship vs. in-app friend code/QR), notification/push and response state, and moderation of any shared content within WeChat's review rules.

### Option D — Full Concept (all three features) — noted, not a first slice
- **Sketch**: B + C plus the offline concert module: per-trip records (origin/destination), per-expense and total cost, and a "cost range & suggestions" view for others planning the same destination.
- **Appetite**: large (months)
- **Trade-offs**: matches the original idea fully. But the offline module's "cost range & suggestions" depends on either a critical mass of user trip data (network effect) or seeded content, and the whole surface is large against a crowded field — high risk of over-building commodity features.
- **Rabbit holes**: offline-module data source; everything in B and C compounded.

## Recommendation

**Option C — Differentiated Slice.** Option B alone rebuilds a commodity (6+ existing trackers), so it is unlikely to win on its own; Option D's offline module is the long-term defensibility but depends on data/network effects a first slice can't bootstrap. Option C adds the one differentiator that is cheap to build and has immediate, articulable user value — **advisory** pre-purchase peer input — while keeping appetite to weeks, and fits a WeChat mini-program launched as a personal project. Within C, the first buildable step is still B's tracking loop, so the team validates adoption of the core before wiring the advisory flow.

Recommend **against** A if the intent is to build/own something; if the goal were purely to solve one's own tracking need, A (adopt an existing tool) would be the honest answer.

## Out of Scope (for the recommended option)

- The offline concert trip module (origin/destination, per-trip totals, "cost range & suggestions") — deferred to a later slice.
- A **binding** purchase-approval gate — peer input is advisory only (咨询意见), per the resolved clarification.
- Marketplace, resale, or payment processing — money never moves through the product.
- Financial advice, credit, investment, or tax tooling.
- General (non-fandom) personal-finance features.
- Monetizing or selling user spending data (monetization is deferred until/unless the user base grows).

## Assumptions to Validate

- Target users will switch from DIY spreadsheets/generic apps to a dedicated fandom tracker (research shows the need is stated, not yet proven as adoption).
- Advisory "征询意见" (opinions/comments, not binding) is sufficient to satisfy the user need — validated as the intended semantics.
- Multi-currency (KRW/JPY/USD/CNY) is a must-have that justifies the added complexity (flagged as a real gap in existing tools, but needs product confirmation).
- WeChat's built-in friend/social graph and reach can be used (or complemented by in-app codes) without running afoul of review/privacy rules. [NEEDS CLARIFICATION: friend-graph mechanics]
- Fandom-specific framing differentiates enough from generic peer-approval tools (钱包请等等) to matter. [NEEDS CLARIFICATION: differentiation evidence]
- Privacy/minor-compliance for "公开" and "好友" visibility can be handled without blocking launch.
