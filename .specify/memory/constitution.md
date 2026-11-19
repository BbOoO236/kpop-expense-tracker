<!--
Sync Impact Report
- Version change: (unfilled template) → 1.0.0 (initial ratification)
- Modified principles: none (first fill of placeholders)
- Added sections: Security & Compliance; Development Workflow
- Removed sections: none
- Follow-up TODOs: none
-->
# K-pop Fandom Spending Tracker Constitution

## Core Principles

### I. Privacy & Data Minimization (NON-NEGOTIABLE)

Spending records are personal financial data, and a meaningful share of users are minors.
Every feature MUST collect the minimum data needed, MUST default new records to the
least-permissive visibility (仅自己), and MUST NOT sell, export, or monetize user financial
data. Handling of minors' data MUST comply with applicable regulations (e.g., PIPL,
未成年人保护) and WeChat review rules.

Rationale: trust is the product; a single privacy failure or minor-protection violation is
fatal to a WeChat mini-program.

### II. Advisory-Only Social Interaction

Peer input ("征询意见") is advisory: friends share opinions and comments, never a binding
gate. Social features MUST NOT create purchase pressure, obligation, or automatic blocking.

Rationale: the product is a budgeting/awareness tool, not an approval-control tool; a binding
gate was explicitly excluded during assessment.

### III. Money Math Correctness

Amounts, running totals, and multi-currency conversion are correctness-critical. Every code
path that touches money MUST be covered by automated tests, and currency conversion MUST use
an explicit, documented exchange-rate source with deterministic rounding rules.

Rationale: a wrong total destroys user trust in the core value proposition.

### IV. Smallest Viable Slice

Ship the smallest thing that validates the hypothesis (tracking + advisory input first);
defer the offline-concert module until the core loop shows adoption. Prefer YAGNI over
speculative features.

Rationale: the niche is crowded and the differentiator is unproven; validate cheaply before
expanding.

### V. WeChat Platform-First

Build within WeChat mini-program constraints: use WeChat login and the friend/social graph
where possible, respect content-review and API limits, and target a launchable mini-program
rather than an abstract app.

Rationale: the platform choice (WeChat) was resolved as a project decision and drives
friend-graph, payment, and review rules.

## Security & Compliance

- HTTPS only; no plaintext storage of sensitive data.
- WeChat login as the identity provider; no separate credential storage.
- Minor-protection and content-review rules MUST be respected for 公开/好友 visibility.
- Multi-currency exchange-rate handling MUST be documented and deterministic.

## Development Workflow

- Follow Spec Kit: assess → specify → plan → tasks → implement → verify.
- Every change MUST pass automated tests before being considered done.
- Verify against a real mini-program runtime (not only unit tests) before claiming a feature
  works.

## Governance

- This constitution supersedes ad-hoc practices.
- Amendments MUST be documented with a semantic-version bump and a Sync Impact Report.
- Compliance with these principles MUST be verified during code review and before each
  release.
- Use `.specify/` artifacts (spec, plan, tasks) as the runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2026-11-12 | **Last Amended**: 2026-11-12
