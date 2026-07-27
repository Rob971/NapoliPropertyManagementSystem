# Release History

Sequential pull → merge → release log for all project PRs.

| PR | Branch | Title | Merge Commit | Release | Status |
|----|--------|-------|--------------|---------|--------|
| [#1](https://github.com/Rob971/NapoliPropertyManagementSystem/pull/1) | `cursor/napoli-pms-poc-30d9` | Napoli PMS PoC — Unified Timeline & WhatsApp Dispatch | `7a97eb2` | [v1.0.0](https://github.com/Rob971/NapoliPropertyManagementSystem/releases/tag/v1.0.0) | ✅ Merged & Released |
| [#2](https://github.com/Rob971/NapoliPropertyManagementSystem/pull/2) | `cursor/gitlab-deploy-30d9` | Deploy to GitHub Pages and sync to GitLab | `83744cb` | [v1.0.0](https://github.com/Rob971/NapoliPropertyManagementSystem/releases/tag/v1.0.0) | ✅ Merged & Released |
| [#3](https://github.com/Rob971/NapoliPropertyManagementSystem/pull/3) | `cursor/release-v1-30d9` | Release v1.0.0 | `194af9c` | [v1.0.0](https://github.com/Rob971/NapoliPropertyManagementSystem/releases/tag/v1.0.0) | ✅ Merged & Released |
| [#4](https://github.com/Rob971/NapoliPropertyManagementSystem/pull/4) | `cursor/stakeholder-demo-30d9` | Stakeholder demo interactions | `658097f` | [v1.1.0](https://github.com/Rob971/NapoliPropertyManagementSystem/releases/tag/v1.1.0) | ✅ Merged & Released |
| [#5](https://github.com/Rob971/NapoliPropertyManagementSystem/pull/5) | `cursor/interactive-mvp-demo-30d9` | Interactive on-demand MVP preview | `abe11b6` | [v1.2.0](https://github.com/Rob971/NapoliPropertyManagementSystem/releases/tag/v1.2.0) | ✅ Merged & Released |
| [#9](https://github.com/Rob971/NapoliPropertyManagementSystem/pull/9) | `cursor/default-locale-it-30d9` | Default locale to Italian on first visit | `66c89d2` | — | ✅ Merged |
| [#10](https://github.com/Rob971/NapoliPropertyManagementSystem/pull/10) | `cursor/multi-tenant-abstraction-30d9` | Multi-customer tenant config and DevOps abstraction | `ffcaafe` | [v1.4.0](https://github.com/Rob971/NapoliPropertyManagementSystem/releases/tag/v1.4.0) | ✅ Merged & Released |

## Live Demo

https://rob971.github.io/NapoliPropertyManagementSystem/

## Release Notes Summary

### v1.0.0 — Initial PoC (PRs #1–#3)
- Unified 14-day timeline calendar with CIN compliance
- WhatsApp cleaner dispatch simulation
- GitLab CI/CD and GitHub Pages deployment

### v1.1.0 — Stakeholder Demo Fixes (PR #4)
- Fixed timeline booking clicks blocked by grid cells
- Dialog reset when closed without action
- Smooth scroll to pending turnovers on calendar dispatch

### v1.2.0 — Interactive MVP Preview (PR #5)
- On-demand scenario engine (Airbnb, checkout, Alloggiati, CIN, dispatch)
- Booking detail slide-over panel
- Live activity feed and guided tour

### v1.3.0 — Internationalisation (PR #8)
- Full UI in **Italiano** and **English (UK)**
- Language switcher in header with localStorage persistence
- Locale-aware date/time formatting
- Translation files: `src/i18n/locales/it.json`, `src/i18n/locales/en-GB.json`

### v1.4.0 — Multi-customer abstraction (PR #10)
- Tenant branding via `deploy/tenants/*.env` and `src/config/tenant.ts`
- Parameterized GitHub Pages and GitLab sync workflows (repo name → base path)
- Shared `deploy/load-tenant-env.sh` for CI and local pages builds
- Multi-tenant onboarding guide: `docs/MULTI-TENANT.md`
