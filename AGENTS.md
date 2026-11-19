# AGENTS.md — K-pop Fandom Expense Tracker

Instructions for AI agents working in this repository.

## Secrets & environment handling (STRICT — read before writing any code)

1. **Never hardcode secrets.** `WECHAT_APPID`, `WECHAT_SECRET`, `JWT_SECRET`,
   `DATABASE_URL`, and any other API key/token MUST be read from environment
   variables at runtime (Nest `ConfigService` / `process.env`), never written as
   literals in source files.
2. **Real secret values live only in `backend/.env`** (gitignored). Create it
   locally and never commit it.
3. **`backend/.env.example` is the committed template** — it MUST contain
   placeholder values only (e.g. `your-wechat-secret`, `change-me-to-a-long-random-string`),
   never real ones.
4. **Never commit** `.env`, `.env.*` (except `.env.example`), `*.pem`, `*.key`,
   or any credential file. They are already gitignored — do not `git add -f` them.
5. **When adding a new secret:** read it from config/env in code → add a
   placeholder line to `backend/.env.example` → document it there.
6. **If you find a real secret in a tracked file, stop and flag it** — treat it
   as compromised and rotate it.

## Documentation: keep README in sync (after each phase)

After finishing a phase (marking its tasks `[X]` in `specs/001-kpop-expense-tracker/tasks.md`),
update `README.md` in the **same commit**:
- the "当前进度" notice and the phase-status table;
- the completed-tasks checklist for the finished phase(s);
- the directory structure when new modules/directories were added;
- the "版本与回滚" tag table (add the new `<phase-slug>` tag).

Then create (or move) the `<phase-slug>` tag to that commit and push the branch
and tag together.
