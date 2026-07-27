# Napoli Property Management System (PoC)

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://rob971.github.io/NapoliPropertyManagementSystem/)
[![Release](https://img.shields.io/github/v/release/Rob971/NapoliPropertyManagementSystem)](https://github.com/Rob971/NapoliPropertyManagementSystem/releases)

A single-page Proof of Concept for the Napoli public service and local real estate agents, demonstrating:

- **CIN compliance** — Codice Identificativo Nazionale tracking per property
- **Unified timeline calendar** — 14-day reservation grid across all properties
- **WhatsApp cleaner dispatch** — simulated automated supplier outreach with accept/decline flow

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Shadcn UI
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

Copy `.env.example` to `.env.local` to override tenant branding locally (optional — Napoli defaults apply).

## Multi-customer / reuse

The codebase is structured so the **product core** can be forked for other customers. Branding and DevOps are externalised:

- **Tenant config:** `deploy/tenants/*.env` + `src/config/tenant.ts`
- **DevOps:** parameterized GitHub/GitLab workflows (repo name drives base path)
- **Guide:** [docs/MULTI-TENANT.md](docs/MULTI-TENANT.md) · [deploy/README.md](deploy/README.md)

**Platform template repo:** [Rob971/PropertyManagementSystem](https://github.com/Rob971/PropertyManagementSystem) — fork for new customers. Publish with [scripts/publish-platform-repo.sh](scripts/publish-platform-repo.sh).

## Deploy on GitLab Pages

This project is configured for **GitLab CI/CD** with automatic deployment to GitLab Pages on the default branch (`main`).

### Live URLs

| Platform | URL |
|----------|-----|
| **GitHub Pages** | https://rob971.github.io/NapoliPropertyManagementSystem/ |
| **GitLab Pages** | https://rob971.gitlab.io/NapoliPropertyManagementSystem/ |

GitHub Pages deploys automatically on every push to `main`. GitLab Pages deploys via `.gitlab-ci.yml` once the repository exists on GitLab.

### One-time GitLab setup

1. Create a [GitLab personal access token](https://gitlab.com/-/user_settings/personal_access_tokens) with `api` and `write_repository` scopes.
2. In GitHub, go to **Settings → Secrets and variables → Actions** and add `GITLAB_TOKEN`.
3. Re-run the **Sync to GitLab Pages** workflow (or push to `main`).

The sync workflow mirrors this repository to GitLab (project path defaults to the GitHub repo name) and GitLab CI publishes Pages.

Optional GitHub repository variables: `GITLAB_NAMESPACE`, `GITLAB_PROJECT`, `GITLAB_HOST`, `TENANT_ID`.

### Manual GitLab import (alternative)

1. Go to [GitLab New Project → Import from GitHub](https://gitlab.com/projects/new#import_project)
2. Select `Rob971/NapoliPropertyManagementSystem`
3. After import, the pipeline on `main` deploys automatically

### Pipeline jobs (GitLab)

| Job | Stage | Purpose |
|-----|-------|---------|
| `lint` | test | ESLint checks |
| `build` | test | Static export artifact (all branches / MRs) |
| `pages` | deploy | Publishes `out/` to GitLab Pages (`main` only) |

### Local static build (GitLab path)

To preview the GitLab Pages URL locally with the correct base path:

```bash
NEXT_PUBLIC_BASE_PATH=/YourRepoName npm run build:pages
npx serve out
```

Then open `http://localhost:3000/YourRepoName/` (match your repository name).

## Features

1. **Interactive MVP Preview** — On-demand scenarios simulate Airbnb sync, checkout, Alloggiati Web, CIN validation, and WhatsApp dispatch
2. **Guided Tour** — Step-by-step walkthrough for stakeholders
3. **Booking Detail Panel** — Click any reservation to inspect guest, CIN compliance, and turnover status
4. **Live Activity Feed** — Real-time log of simulated API events
5. **Internationalisation (i18n)** — Full UI in **Italian** and **English (UK)** with language switcher
6. **Mock data** — Properties, bookings, and cleaning tasks in `src/data/mock-data.ts`
7. **Dashboard layout** — Sidebar navigation, header with Napoli Admin profile
8. **Custom timeline** — Tailwind CSS grid (no third-party calendar library)
9. **WhatsApp simulation** — 1s dispatch delay, dialog with Accept/Decline, live task state updates

### Languages

The UI supports **Italiano** and **English (UK)**. **Italiano** is the default on first visit. Use the language switcher (🇮🇹 IT / 🇬🇧 EN) in the header. Preference is saved to localStorage.

Translation files: `src/i18n/locales/it.json` and `src/i18n/locales/en-GB.json`

### Try the Interactive Demo

Open the live site and use the **Interactive MVP Preview** panel:

| Scenario | What it simulates |
|----------|-------------------|
| New Airbnb Booking | Reservation syncs into the calendar |
| Guest Checkout Today | Departure triggers a turnover task |
| Alloggiati Web Sync | Guest data sent to police registry |
| CIN Compliance Check | National registry validation |
| Auto-Dispatch Cleaner | WhatsApp message to cleaning supplier |
| Reset Demo | Restore initial presentation state |

Click **Guided Tour** in the header for a walkthrough.
