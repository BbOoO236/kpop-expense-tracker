# K-pop Fandom Expense Tracker

一款微信小程序：帮 K-pop 粉丝记录多币种追星花费（按「团体」「分类」打标签并聚合），控制单笔支出的可见性（仅自己 / 好友 / 公开），通过微信添加好友，并在下单前获取好友的**征询意见**（仅建议、不强制）。

## 当前进度

> ⚠️ **仅完成 Phase 1: Setup（共享基础设施）**，尚未实现任何业务功能。

| Phase | 内容 | 状态 |
|-------|------|------|
| **Phase 1** | Setup（Shared Infrastructure）— 项目初始化 | ✅ 已完成 |
| Phase 2 | Foundational（数据库实体 / 微信登录 / 全局校验） | ⬜ 待开始 |
| Phase 3 | User Story 1 — 记录与查看追星花费（P1 🎯 MVP） | ⬜ 待开始 |
| Phase 4 | User Story 2 — 控制可见性、添加好友（P2） | ⬜ 待开始 |
| Phase 5 | User Story 3 — 征询意见（P3） | ⬜ 待开始 |
| Phase 6 | Polish & Cross-Cutting Concerns | ⬜ 待开始 |

Phase 1 已完成的内容（对应 `specs/001-kpop-expense-tracker/tasks.md`）：

- [x] T001 初始化 NestJS（Node.js + TypeScript）后端 `backend/`
- [x] T002 初始化 uni-app（Vue 3 + TypeScript + Vite）小程序 `mini-program/`
- [x] T003 配置 PostgreSQL 连接与迁移框架（TypeORM）
- [x] T004 环境变量管理（`backend/.env.example`：DB URL、微信 AppID/Secret）
- [x] T005 ESLint + Prettier（前后端）

## 技术栈

- **前端**：uni-app（Vue 3 + TypeScript + Vite），微信小程序
- **后端**：NestJS（Node.js + TypeScript），REST API
- **存储**：PostgreSQL 16（TypeORM）
- **认证**：微信登录（`wx.login` → `code2session` → 签发 bearer token）

## 目录结构

```text
backend/                 # NestJS 后端（TypeScript）
├── src/
│   ├── database/        # TypeORM data-source + migrations
│   ├── main.ts
│   └── ...
├── test/
└── .env.example         # 环境变量模板（复制为 .env 填写真实值）

mini-program/            # uni-app 小程序（Vue 3 + TypeScript）
├── src/
│   ├── pages/           # 记账 / 汇总 / 好友 / 征询意见 页面
│   ├── api/             # 后端 API 客户端
│   ├── store/           # Pinia 状态
│   └── ...
└── dist/                # 构建产物（已 gitignore）

specs/                   # 规格文档（spec / plan / data-model / API 契约 / tasks）
└── 001-kpop-expense-tracker/
```

## 快速开始

> 详细验证步骤见 [`specs/001-kpop-expense-tracker/quickstart.md`](specs/001-kpop-expense-tracker/quickstart.md)。

### 后端

```bash
cd backend
cp .env.example .env        # 填写 DATABASE_URL / WECHAT_* / JWT_SECRET
npm install
npm run start:dev
```

### 小程序

```bash
cd mini-program
npm install
npm run dev:mp-weixin        # 产出 dist/build/mp-weixin，用微信开发者工具打开
```

## 版本与回滚

- 首个提交即 **Phase 1** 快照，已打 git 标签 **`phase-1-setup`**，可随时回滚：
  ```bash
  git checkout phase-1-setup
  ```

## 相关文档

- 需求规格：[`specs/001-kpop-expense-tracker/spec.md`](specs/001-kpop-expense-tracker/spec.md)
- 实施计划：[`specs/001-kpop-expense-tracker/plan.md`](specs/001-kpop-expense-tracker/plan.md)
- 数据模型：[`specs/001-kpop-expense-tracker/data-model.md`](specs/001-kpop-expense-tracker/data-model.md)
- API 契约：[`specs/001-kpop-expense-tracker/contracts/api.md`](specs/001-kpop-expense-tracker/contracts/api.md)
- 任务清单：[`specs/001-kpop-expense-tracker/tasks.md`](specs/001-kpop-expense-tracker/tasks.md)
