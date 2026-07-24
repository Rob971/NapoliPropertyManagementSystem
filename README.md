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

The sync workflow will create `gitlab.com/Rob971/NapoliPropertyManagementSystem`, push the code, and GitLab CI will publish Pages.

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
npm run build:gitlab
npx serve out
```

Then open `http://localhost:3000/NapoliPropertyManagementSystem/` (adjust the path to match your project name).

## Features

1. **Mock data** — Properties, bookings, and cleaning tasks in `src/data/mock-data.ts`
2. **Dashboard layout** — Sidebar navigation, header with Napoli Admin profile
3. **Custom timeline** — Tailwind CSS grid (no third-party calendar library)
4. **WhatsApp simulation** — 1s dispatch delay, dialog with Accept/Decline, live task state updates
