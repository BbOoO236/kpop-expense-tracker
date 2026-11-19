# Idea Research: K-pop Fandom Spending Tracker

- **Slug**: kpop-spend-tracker
- **Created**: 2026-11-12
- **Evidence confidence (overall)**: medium

> Method note: all findings below come from web **search-result summaries**, not from fetched pages (no URLs were fetched under the URL Trust Policy). Where a specific product/stat is cited, the source is the search result's own attribution; confidence reflects how reliably the underlying claim could be verified without opening the page.

## Users & Demand

- K-pop fans are high-spend: in the US they average **~$35/month** on merch — the highest of any music genre (~$418/year), with BTS fans averaging **~$826/year**. — [source: Custom Ink survey / Statista via search] (confidence: medium, cited)
- In 2024, **41%** of US K-pop fans spent **> $100/year** on CDs, and **68%** bought merchandise — evidence the target audience genuinely has recurring, trackable spending. — [source: Billboard "K-Pop Fandom in the U.S." via search] (confidence: medium, cited)
- China's "fan economy" is large: ~**¥1.23 trillion** total in 2024 (idol economy ~¥420B), core fan base ~**280M** people; **72.2%** of Z-gen fans have paid for singles/albums/concerts. — [source: ChinaIRN / 华经 / 中国演出行业协会 via search] (confidence: medium, cited)
- There is visible *stated* demand for tracking this spending: multiple fan blogs/social posts discuss "追星要不要记账" and DIY solutions (Google Sheets, generic bookkeeping apps repurposed). — [source: lattekorea.com, xiaohongshu posts via search] (confidence: medium, cited)
- **Assumption**: stated interest in *tracking* may not equal willingness to adopt a dedicated new app — the DIY workarounds (spreadsheets, repurposing 喵喵记账/归物) suggest fans are currently getting by without a purpose-built tool. (confidence: low, ASSUMPTION)

## Prior Art

- **Dedicated fandom budget trackers already exist and are actively maintained**, mostly personal-tracking apps: **饭谷账** (追星/周边记账 mini-program), **追星日记** (multi-function CN app incl. bookkeeping), **Stan Log / "Prove your love with numbers"** (per-idol spend + share cards), **MyColor: Fandom Budget Tracker**, **MyFanClub / Oshi Tracker**, and Japanese apps **推しごと (Oshigoto)** and **推しメモリー**. — [source: app store / mergeek / foxdata via search] (confidence: high, cited)
- The core "record each expense, categorize, budget, see totals" loop is therefore **commoditized**; several competitors already do per-idol expense logging, budgets, charts, and CSV export. — [source: app-store summaries via search] (confidence: high, cited)
- **Per-group/per-category categorization (idea feature #4) is already standard**: Stan Log, MyColor, MyFanClub, and Oshigoto all tag expenses by idol and by category (goods/tickets/travel/etc.) and provide per-idol/per-category breakdowns — so this is a required baseline feature, not a differentiator. — [source: app-store summaries via search] (confidence: high, cited)
- **Closest analog to the "消费审批" feature**: **钱包请等等** (WeChat mini-program) is a *pre-purchase* approval flow — fill an application (item, price, reason, alternatives), friends approve (1–5 approvers) before purchase, with chat-style approval history and a public "square". This is a direct near-match to idea feature #2. — [source: cr173 / 52pk via search] (confidence: medium, cited)
- **Multi-person ledger / approval apps** (adjacent, not fandom-specific): **易账簿** (shared ledger, approve/no-approve entry modes), **腾讯小经费** (community fund with review/reimbursement), **百事AA记账** (AA split + likes/comments). These cover the "friends see shared accounts" mechanics but not the fandom angle. — [source: mp.weixin.qq.com / baike via search] (confidence: medium, cited)
- **Multi-currency gap noted in prior art**: the 归物 app is criticized for forcing a single currency — a real pain point for K-pop fans buying in KRW/JPY/USD/CNY. — [source: xiaohongshu summary via search] (confidence: medium, cited)

## Market & Context

- The fan economy is large and growing (idol economy ~¥420B, ~12.2% CAGR), and offline concerts are a major driver (large-concert box office ~¥29.6B, ~38M attendees in 2025) — supports the "线下追星" module's relevance. — [source: 界面新闻/天眼, 封面新闻 via search] (confidence: medium, cited)
- **Counter-signal**: K-pop physical album sales fell **~19.5% YoY in 2024** (Circle Chart) — the first decline in 14 years — while per-fan spend stays high, suggesting a possible cooling in the volume-driven, bulk-buy segment the tracker targets. — [source: Circle Chart via search] (confidence: medium, cited)
- **Counter-signal**: a Weibo piece titled "追星这门生意正在关服" flags headwinds in fan-economy monetization. — [source: weibo via search] (confidence: low, cited)
- Users today cope with spreadsheets and generic bookkeeping apps (天天记账, 喵喵记账, Google Sheets), so the "cost of doing nothing" for the *user* is low — the barrier is differentiation, not awareness of a need. — [source: lattekorea.com / xiaohongshu via search] (confidence: medium, cited)

## Data & Constraints

- **Multi-currency** is a hard requirement for K-pop spending (KRW albums, JPY concerts, CNY domestic) and is a documented gap in existing tools. — [source: 归物 critique via search] (confidence: medium, cited)
- **Privacy/minor compliance**: fandom skews young (18–35 is 78% of fans; a meaningful share are minors) — handling financial records, friend-graph, and "public" expense visibility raises privacy and possibly regulatory (data-protection / minor-protection) questions. — [source: ChinaIRN demographics via search] (confidence: medium, partially ASSUMPTION)
- **Platform constraints**: the idea says "小程序" but does not specify WeChat vs Alipay vs other; friend-graph mechanics, payment, and content review rules differ materially per platform. — [NEEDS CLARIFICATION: platform]
- **Data source for the "cost range & suggestions"** in the offline module is undefined — is it derived from users' own trip records (requires enough users) or seeded/aggregated? — [NEEDS CLARIFICATION]

## Evidence Against the Idea

- The single-feature "record my fandom spending" app is **already a crowded, commoditized niche** — at least 6+ dedicated competitors (Stan Log, MyColor, MyFanClub, Oshigoto, 追星日记, 饭谷账) plus generic bookkeeping apps fans already repurpose. — [source: app-store summaries via search] (confidence: high, cited)
- The most distinctive feature (#2, "发起消费审批 征询意见") has a **direct existing analog** in 钱包请等等, meaning the idea's differentiator is not obviously novel. — [source: 钱包请等等 listing via search] (confidence: medium, cited)
- Physical album volume is **declining** (-19.5% YoY), the single most-recorded expense type in this category. — [source: Circle Chart via search] (confidence: medium, cited)
- No evidence yet that the *social visibility + approval + offline trip* combination is what fans are asking for — the observable behavior today is DIY spreadsheets and generic apps, i.e. low switching incentive. — [confidence: low, ASSUMPTION]

## Gaps & Open Questions

- [NEEDS CLARIFICATION: Platform — WeChat mini-program, Alipay, or standalone app?]
- [NEEDS CLARIFICATION: How do users form the friend graph, and what privacy rules govern "public" visibility (and minors)?]
- [NEEDS CLARIFICATION: Multi-currency support scope (KRW/JPY/USD/CNY) and exchange-rate handling?]
- [NEEDS CLARIFICATION: Is "消费审批" binding (blocks purchase) or advisory (opinions/comments only)?]
- [NEEDS CLARIFICATION: Where does the offline-concert "花销范围和建议" data come from — user trip records, or seeded content?]
- [NEEDS CLARIFICATION: Monetization / business goal, and target scale (personal project vs product)?]

## Sources

- https://www.statista.com (host: statista.com, policy: search-summary, not fetched)
- https://www.customink.com/blog/merch-booth-trends/ (host: customink.com, policy: search-summary, not fetched)
- https://lattekorea.com/kpop-spending/ (host: lattekorea.com, policy: search-summary, not fetched)
- https://www.mergeek.cn/latest/KvEVrAKzyxGn7POx (host: mergeek.cn, policy: search-summary, not fetched)
- https://apps.apple.com/cn/app/prove-your-love-with-numbers/id6760804101 (host: apps.apple.com, policy: search-summary, not fetched)
- https://apps.apple.com/cn/app/myfanclub-.../id6758578516 (host: apps.apple.com, policy: search-summary, not fetched)
- https://m.cr173.com/x/1704125 (host: cr173.com, policy: search-summary, not fetched)
- https://www.52pk.com/soft/52012gyhwqt.html (host: 52pk.com, policy: search-summary, not fetched)
- https://baike.baidu.com/item/腾讯小经费 (host: baike.baidu.com, policy: search-summary, not fetched)
- https://www.jiemian.com/article/13097065.html (host: jiemian.com, policy: search-summary, not fetched)
- https://www.huaon.com/channel/finance/993066.html (host: huaon.com, policy: search-summary, not fetched)
- https://weibo.com/2/detail/5346583392814419 (host: weibo.com, policy: search-summary, not fetched)
