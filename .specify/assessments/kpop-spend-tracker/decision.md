# Decision: K-pop Fandom Spending Tracker

- **Slug**: kpop-spend-tracker
- **Decided**: 2026-11-12
- **Verdict**: go
- **Artifacts reviewed**: intake.md | research.md | problem.md | concept.md

## Scorecard

| Criterion | Rating | Justification |
|-----------|--------|---------------|
| Problem validity | adequate | Real, sizable audience (core fan base ~280M; high per-fan spend) with a documented pain (multi-currency gap in existing tools). Demand is *stated* more than *observed* (fans currently use DIY spreadsheets), so adoption is a hypothesis to validate. |
| Evidence strength | adequate | Overall medium confidence: strong prior art (6+ competitors) and market data from search summaries; product-level details are secondhand and some claims are assumptions. |
| Value vs. inaction | adequate | Real pain, but users cope today — the marginal value hinges on the differentiation now stated (fandom-specific spending + stronger friend interaction), not on the need's existence alone. |
| Feasibility / appetite | adequate | A credible medium-appetite option (Option C) exists for a WeChat mini-program; the large offline module is sensibly deferred. |
| Strategic fit | adequate | Aligned with the project constitution (v1.0.0: privacy-first, advisory-only, money-math correctness, smallest slice, WeChat platform-first), though the constitution is newly ratified. |
| Risk posture | adequate | Friend-graph and multi-currency mechanics are now resolved. Remaining risks — crowded niche, unproven differentiation, and minor privacy at "公开" visibility — are identified and scoped for a personal first slice. |

## Verdict & Rationale

**Go.** All previously blocking unknowns are now resolved: platform (WeChat mini-program), peer-input semantics (advisory, 咨询意见), strategic intent (personal project, monetize later), differentiation (fandom-specific spending + stronger friend interaction), friend-graph mechanics (WeChat friends + quick-add), and multi-currency scope (RMB-primary, per-expense currency with manual rate → auto-convert to RMB). Problem validity and evidence strength are adequate and a recommended concept (Option C) exists. This remains a measured go — the crowded niche and unproven differentiation mean the first slice should be treated as cheap validation — but it clears the bar for specification.

## If go — Handoff to `/speckit-specify`

- **Problem**: K-pop fans have no structured way to see their total, often multi-currency fandom spending, get advisory peer input before an impulsive purchase, or learn realistic offline-concert costs — leading to fragmented visibility, overspending, and regret.
- **Chosen approach**: Option C — Differentiated Slice, as a **WeChat mini-program**: multi-currency fandom expense logging with per-group/per-category tagging, per-entry visibility (仅自己 / 好友 / 公开), and an **advisory** pre-purchase "征询意见" loop with selected friends. The offline-concert module is deferred.
- **Resolved mechanics (fold into spec)**:
  - **Friend graph**: WeChat account authorized login; after login the mini-program shows the user's WeChat friends who have also authorized it, with a "quick add friend" button. Initially, friends can only be added via WeChat (no external/code-based add).
  - **Multi-currency**: each expense selects a currency type, with **人民币 (RMB) as primary** — RMB entries input the amount directly; non-RMB entries provide an exchange-rate field that auto-converts to RMB. The expense is displayed in the chosen currency, with the RMB equivalent shown in small text alongside.
- **In scope**: expense logging (multi-currency, category, idol/group, date), per-group and per-category aggregation, three-level visibility, WeChat-based friend graph, advisory peer-input requests (opinions/comments, not a binding gate), totals/dashboard.
- **Out of scope**: offline concert trip module (deferred); binding purchase-approval gate; marketplace/resale/payment; financial advice; non-fandom finance; monetizing/selling user data.
- **Success metrics**: activation (first expense logged within N days), retention (weekly logging at 30 days), peer-input usage (share of non-trivial purchases preceded by an advisory request), offline-trip coverage (deferred), and qualitative outcome (better spend awareness / fewer regretted impulse buys).
- **Carried-forward open questions**:
  - Validate the differentiation hypothesis: does fandom-specific framing + stronger friend interaction actually beat 钱包请等等 and the 6+ existing trackers?
  - (Deferred) offline-trip "cost range & suggestions" data source — user trip records vs. seeded content.
