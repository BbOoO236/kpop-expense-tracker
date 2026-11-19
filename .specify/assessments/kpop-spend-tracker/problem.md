# Problem Definition: K-pop Fandom Spending Tracker

- **Slug**: kpop-spend-tracker
- **Created**: 2026-11-12
- **Inputs used**: intake.md + research.md + user clarifications

## Problem Statement

K-pop fans make frequent, emotionally-driven, often high-value purchases across albums, merchandise, concerts, and travel — frequently in multiple currencies and spread across many channels — yet have no structured way to see their total fandom spending, get a trusted friend's input *before* an impulsive buy, or learn realistic cost expectations before committing to an offline concert trip. The result is fragmented visibility, overspending, and post-purchase regret, in a segment that spends heavily but where album-volume growth is already cooling.

## Affected Users & Stakeholders

- **Users (primary)**: K-pop fans, disproportionately young (18–35 is ~78% of the fan base; a meaningful share are minors) — they accrue recurring, trackable spending and currently cope with spreadsheets and repurposed generic bookkeeping apps. — [research: Users & Demand]
- **Users (secondary)**: fans planning *offline* concert trips (first-timers especially) — they lack peer-sourced cost ranges and realistic budgeting guidance. — [intake feature #3; research: Market & Context]
- **Stakeholder — builder/owner**: the user, as a **personal project** intended to launch as a WeChat mini-program; commercial value is deferred until/unless the user base grows. — [user clarification]
- **Stakeholder — platform**: **WeChat** (mini-program) — its friend/social graph, review rules, and data/privacy policies constrain what is feasible. — [user clarification]

## Goals

- Fans can see their **complete fandom spending in one place**, including across currencies, without manual consolidation.
- Fans can **break down** their total spending by idol group and by spending category, to see how much went to each group and each type of expense. — [intake feature #4]
- Fans can get **timely advisory input** from a few trusted friends before committing to a non-trivial purchase (opinions/comments, not a binding gate). — [user clarification: 咨询意见]
- Fans planning **offline concert trips** can find realistic per-trip cost expectations (range) and planning guidance from peers.
- Fans gain **awareness and control** over their total spending, reducing surprise and regretted impulse purchases.

## Non-Goals

- Not financial advice, investment, credit, or tax tooling.
- Not a marketplace, resale platform, or payment processor (recording only; money does not move through the product).
- Not a general-purpose personal-finance app for non-fandom spending.
- Not selling or monetizing user financial data (privacy of spending records is assumed required).
- Not a binding purchase gate — peer input is **advisory** (咨询意见), not an approval that blocks the purchase.

## Success Metrics

- **Activation**: share of new users who log their first expense within N days of signup. (baseline: unknown)
- **Retention**: share of users still logging at least weekly after 30 days. (baseline: unknown)
- **Peer-input usage**: share of non-trivial purchases preceded by an advisory friend-input request. (baseline: unknown)
- **Offline-trip coverage**: share of offline-trip users who log a *complete* trip (destination + per-expense + total). (baseline: unknown)
- **Outcome (qualitative)**: users report better awareness of total spend / fewer regretted impulse purchases. (baseline: unknown; qualitative)

## Cost of Inaction

Fans keep tracking in spreadsheets and generic bookkeeping apps, so records stay fragmented across currencies and channels; impulsive purchases go unchecked by friends; and offline concert costs remain opaque to newcomers. Overspending and post-purchase regret persist, and the fandom-tracking niche remains a crowded set of undifferentiated, mostly single-user tools — no one owns the combination of *social visibility + pre-purchase advisory input + offline trip budgeting* that the stated pain implies.

## Open Questions

- [NEEDS CLARIFICATION: How do users add friends — via WeChat's existing relationship, or a separate in-app friend code/QR? And what privacy rules govern "公开"/"好友" visibility, especially for minors?]
- [NEEDS CLARIFICATION: Multi-currency scope (KRW/JPY/USD/CNY) and exchange-rate handling.]
- [NEEDS CLARIFICATION: Where does the offline-trip "cost range & suggestions" data come from — users' own trip records, or seeded content?]
- [NEEDS CLARIFICATION: Differentiation — what concretely makes the fandom-framed tracking + advisory input beat 钱包请等等 and the 6+ existing trackers? (evidence, not opinion)]
- [NEEDS CLARIFICATION: Is the expense category list preset or user-defined, and can one expense be tagged to multiple idol groups?]
